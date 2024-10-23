import type { H3Event } from "h3";
import bcrypt from "bcrypt";
import type { UserSession } from "~/utils/types";

const config = useRuntimeConfig();
const saltRounds = config.basicAuth.saltRounds;
const secretKey = config.basicAuth.secretKey;

// Hash the password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

// Verify the password
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export const createUserSession = async (event: H3Event, data: UserSession) => {
  const session = await useSession<UserSession>(event, {
    name: "user",
    password: secretKey,
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // One day,
    },
  });

  await session.update(data);
  return session;
};

export const getUserSession = async (event: H3Event) => {
  const session = await useSession<UserSession>(event, {
    name: "user",
    password: secretKey,
    cookie: {
      sameSite: "strict",
    },
  });
  if (Object.keys(session.data).length === 0) {
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
};

export const deleteUserSession = async (event: H3Event) => {
  const session = await getUserSession(event);
  if (session) {
    await session.clear();
  }
};
