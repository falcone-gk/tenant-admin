import { eq, sql } from "drizzle-orm";
import { insertDebtSchema } from "~/utils/schemas";
import type { InsertDebt } from "~/utils/types";

export default defineAdminResponseHandler(async (event) => {
  const db = useDrizzle();
  const body = event.context.body as InsertDebt;
  const newDebt = await db.transaction(async (tx) => {
    const [debt] = await tx.insert(tables.debt).values(body).returning();
    await tx.update(tables.tenant)
      .set({ debtCounter: sql`${tables.tenant.debtCounter} + 1` })
      .where(eq(tables.tenant.id, body.tenantId));

    await tx.update(tables.room)
      .set({
        electricityRegister: body.currentElectricityRegister,
        waterRegister: body.currentWaterRegister,
      })
      .where(eq(tables.room.id, body.roomId));

    return debt;
  });

  setResponseStatus(event, 201);
  return {
    status: "success",
    message: "Debt created successfully",
    data: newDebt,
  };
}, insertDebtSchema);
