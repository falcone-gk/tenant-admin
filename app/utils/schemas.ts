import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const tenantSchema = z.object({
  name: z.string().min(1).max(50),
  paymentDay: z.number().min(1).max(31),
  isDeleted: z.boolean().optional().default(false),
});
