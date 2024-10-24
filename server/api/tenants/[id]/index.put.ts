import { eq } from "drizzle-orm";
import { z } from "zod";
import { tenantSchema } from "~/utils/schemas";
import type { FormTenant } from "~/utils/types";

export default defineAdminResponseHandler(async (event) => {
  const paramSchema = z.object({
    id: z.number({ coerce: true }).min(1),
  });
  const params = await getValidatedRouterParams(event, paramSchema.safeParse);

  if (!params.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid parameters",
      message: JSON.stringify(params.error.issues),
      data: params.error.issues,
    });
  }
  const db = useDrizzle();
  const body = event.context.body as FormTenant;
  const [updatedTenant] = await db
    .update(tables.tenant)
    .set(body)
    .where(eq(tables.tenant.id, params.data.id));

  return {
    status: "success",
    message: "Tenant updated successfully",
    data: updatedTenant,
  };
}, tenantSchema);
