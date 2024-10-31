export default defineAuthenticatedResponseHandler(async (event) => {
  const db = useDrizzle();
  const debts = await db.query.debt.findMany({
    with: {
      tenant: {
        columns: {
          name: true,
        },
      },
      room: {
        columns: {
          code: true,
        },
      },
    },
  });
  return debts;
});
