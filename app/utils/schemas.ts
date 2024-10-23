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

const registerType = ["fixed", "variable"] as const;
export const roomSchema = z.object({
  code: z.string().min(1).max(20),
  tenantId: z.number().min(1).nullable(),
  rent: z.number().min(1),
  electricityTypeRegister: z.enum(registerType),
  electricityRegister: z.number().min(0),
  waterTypeRegister: z.enum(registerType),
  waterRegister: z.number().min(0),
  hasTV: z.boolean().default(false),
  tvCost: z.number().min(0),
  hasInternet: z.boolean().default(false),
  internetCost: z.number().min(0),
});
