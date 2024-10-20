export default defineTask({
  meta: {
    name: "db:createuser",
    description: "Run create user in db",
  },
  async run({ payload, context }) {
    const isDev = useRuntimeConfig().isDev;
    if (!isDev) {
      console.log("Skipping user creation task in prod mode");
      return { result: "Skipped" };
    }

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
