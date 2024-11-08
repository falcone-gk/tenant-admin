import { sql } from "drizzle-orm";

export default defineAuthenticatedResponseHandler(async (event) => {
  const user = event.context.user;
  const fieldName = user.isAdmin ? tables.tenant.name : tables.tenant.alias;
  const db = useDrizzle();
  const tenants = await db.query.tenant.findMany({
    extras: {
      name: sql`${fieldName}`.as("name"),
    },
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
