export default defineEventHandler(async (event) => {
  await deleteUserSession(event);
  return;
});
