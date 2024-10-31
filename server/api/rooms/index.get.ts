export default defineAuthenticatedResponseHandler(async (event) => {
  const db = useDrizzle();
  const rooms = await db.query.room.findMany({
    with: {
      tenant: true,
    },
  });
  return rooms;
});
