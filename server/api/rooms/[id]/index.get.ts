import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAuthenticatedResponseHandler(async (event) => {
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
  const room = await db.query.room.findFirst({
    where: eq(tables.room.id, params.data.id),
  });

  if (!room) {
    throw createError({
      statusCode: 404,
      statusMessage: "Room not found",
    });
  }

  return room;
});
