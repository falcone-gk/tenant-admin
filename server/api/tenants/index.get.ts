export default defineAuthenticatedResponseHandler(async (event) => {
  const db = useDrizzle();
  return db.select().from(tables.tenant);
});
