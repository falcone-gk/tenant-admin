export default defineAuthenticatedResponseHandler(async (event) => {
  const db = useDrizzle();
  return db.select({
    id: tables.tenant.id,
    name: tables.tenant.name,
  }).from(tables.tenant);
});
