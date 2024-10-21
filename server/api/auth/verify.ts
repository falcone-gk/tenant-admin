import type { UserSession } from "~/utils/types";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  interface SessionSigned {
    isSigned: true;
    data: UserSession;
  }

  interface SessionNotSigned {
    isSigned: false;
  }

  if (session) {
    return {
      isSigned: true,
      data: session.data,
    } as SessionSigned;
  }
  return {
    isSigned: false,
  } as SessionNotSigned;
});
