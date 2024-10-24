import { eq } from "drizzle-orm";
import { z } from "zod";
import { roomSchema } from "~/utils/schemas";
import type { FormRoom } from "~/utils/types";

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
  const body = event.context.body as FormRoom;
  const [updatedRoom] = await db
    .update(tables.room)
    .set(body)
    .where(eq(tables.room.id, params.data.id))
    .returning();

  return {
    status: "success",
    message: "Room updated successfully",
    data: updatedRoom,
  };
}, roomSchema);
