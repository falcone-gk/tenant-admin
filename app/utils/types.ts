import type { z } from "zod";

export interface UserSession {
  id: number;
  username: string;
  isAdmin: boolean;
}

export type LoginSchemaType = z.infer<typeof loginSchema>;
