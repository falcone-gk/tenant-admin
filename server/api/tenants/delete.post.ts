import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

const deleteSchema = z.object({
  ids: z.array(z.number({ coerce: true }).min(1)),
});

export default defineAdminResponseHandler(async (event) => {
  // IDs of tenants to be soft deleted
  const body = event.context.body;

  const db = useDrizzle();
  await db
    .update(tables.tenant)
    .set({
      isDeleted: true,
    })
    .where(inArray(tables.tenant.id, body.ids));

  return sendNoContent(event);
}, deleteSchema);
