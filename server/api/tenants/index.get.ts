export default defineAuthenticatedResponseHandler(async (event) => {
  const db = useDrizzle();
  const tenants = await db.query.tenant.findMany({
    with: {
      rooms: {
        columns: {
          code: true,
        },
      },
    },
  });
  return tenants;
});
