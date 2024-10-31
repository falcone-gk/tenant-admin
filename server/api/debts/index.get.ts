export default defineAuthenticatedResponseHandler(async (event) => {
  const db = useDrizzle();
  const debts = await db.select().from(tables.debt);
  return debts;
});
