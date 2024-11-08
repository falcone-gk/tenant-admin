import type { H3Event } from "h3";
import bcrypt from "bcrypt";
import type { UserSession } from "~/utils/types";

const config = useRuntimeConfig();
const saltRounds = config.basicAuth.saltRounds;
const secretKey = config.basicAuth.secretKey;

// Hash the password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, Number(saltRounds));
}

// Verify the password
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export const createUserSession = async (event: H3Event, data: UserSession) => {
  const maxAge = data.isAdmin ? 60 * 60 * 24 : 60 * 15;
  const session = await useSession<UserSession>(event, {
    name: "user",
    password: secretKey,
    cookie: {
      httpOnly: true,
      sameSite: "none",
    },
    maxAge: maxAge,
  });

  await session.update(data);
  return session;
};

export const getUserSession = async (event: H3Event) => {
  const session = await useSession<UserSession>(event, {
    name: "user",
    password: secretKey,
    cookie: {
      sameSite: "none",
    },
  });
  if (Object.keys(session.data).length === 0) {
    // We clear because a session is always created
    await session.clear();
    return null;
  }
  return session;
};

export const requireUserSession = async (event: H3Event) => {
  const session = await getUserSession(event);
  if (!session) {
    throw createError({
      status: 401,
      statusMessage: "Invalid credentials",
    });
  }
  return session;
};

export const requireAdminSession = async (event: H3Event) => {
  const session = await getUserSession(event);
  if (!session) {
    throw createError({
      status: 401,
      statusMessage: "Invalid credentials",
    });
  }
  else if (!session.data.isAdmin) {
    throw createError({
      status: 403,
      statusMessage: "Unauthorized",
    });
  }
  return session;
};

export const deleteUserSession = async (event: H3Event) => {
  const session = await getUserSession(event);
  if (session) {
    await session.clear();
  }
};
