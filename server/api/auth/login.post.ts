import { eq } from "drizzle-orm";
import { loginSchema } from "~/utils/schemas";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.safeParse);

  if (!body.success) {
    throw createError({
      status: 400,
      statusMessage: "Invalid request body",
      message: JSON.stringify(body.error.issues),
      data: body.error.issues,
    });
  }

  const { username, password } = body.data;
  const db = useDrizzle();
  const [user] = await db.select().from(tables.user).where(eq(tables.user.username, username));

  if (!user) {
    throw createError({
      status: 401,
      statusMessage: "Invalid username or password",
    });
  }

  const isPasswordCorrect = await verifyPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw createError({ statusCode: 401, message: "Invalid username or password" });
  }

  const { password: userPassword, ...publicUserData } = user;
  await createUserSession(event, publicUserData);

  return {
    status: "success",
    data: publicUserData,
  };
});
