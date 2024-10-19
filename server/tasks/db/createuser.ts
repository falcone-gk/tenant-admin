export default defineTask({
  meta: {
    name: "db:createuser",
    description: "Run create user in db",
  },
  run({ payload, context }) {
    console.log("Running user creation task...");
    return { result: "Success" };
  },
});
