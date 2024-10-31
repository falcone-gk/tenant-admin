import { insertDebtSchema } from "~/utils/schemas";
import type { InsertDebt } from "~/utils/types";

export default defineAdminResponseHandler(async (event) => {
  const db = useDrizzle();
  const body = event.context.body as InsertDebt;
  const newDebt = await db.insert(tables.debt).values(body);

  return {
    status: "success",
    message: "Debt created successfully",
    data: newDebt,
  };
}, insertDebtSchema);
