export default defineTask({
  meta: {
    name: "db:createuser",
    description: "Run create user in db",
  },
  async run({ payload, context }) {
    console.log("Running user creation task...");
    const { username, password } = payload;
    const hashedPassword = await hashPassword(password as string);
    const db = useDrizzle();
    await db.insert(tables.user).values(
      {
        username: username as string,
        password: hashedPassword,
      },
    );

    console.log("User created successfully");
    return { result: "Success" };
  },
});
