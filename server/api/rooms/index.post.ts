import { roomSchema } from "~/utils/schemas";
import type { FormRoom } from "~/utils/types";

export default defineAdminResponseHandler(async (event) => {
  const db = useDrizzle();
  const body = event.context.body as FormRoom;
  const newRoom = await db.insert(tables.room).values(body);

  setResponseStatus(event, 201);
  return {
    status: "success",
    message: "Room created successfully",
    data: newRoom,
  };
}, roomSchema);
