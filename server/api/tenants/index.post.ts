import { tenantSchema } from "~/utils/schemas";
import type { FormTenant } from "~/utils/types";

export default defineAdminResponseHandler(async (event) => {
  const db = useDrizzle();
  const body = event.context.body as FormTenant;
  const [newTenant] = await db.insert(tables.tenant).values(body).returning();

  setResponseStatus(event, 201);
  return {
    status: "success",
    message: "Tenant created successfully",
    data: newTenant,
  };
}, tenantSchema);
