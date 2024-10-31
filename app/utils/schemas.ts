import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const tenantSchema = z.object({
  name: z.string().min(1).max(50),
  paymentDay: z.number().min(1).max(31),
  debtPrefix: z.string().min(1).max(2),
  debtCounter: z.number().min(0).max(10).default(0),
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

export const debtSchema = z.object({
  code: z.string().min(1).max(255),
  tenantId: z.number().min(1),
  roomId: z.number().min(1),
  date: z.string().min(1),
  isExtraDebt: z.boolean().default(false),
  rentCost: z.number().min(0).default(0),
  prevElectricityRegister: z.number().min(0).default(0),
  currentElectricityRegister: z.number().min(0).default(0),
  monthElectricityConsume: z.number().min(0).default(0),
  electricityCost: z.number().min(0).default(0),
  prevWaterRegister: z.number().min(0).default(0),
  currentWaterRegister: z.number().min(0).default(0),
  waterCost: z.number().min(0).default(0),
  tvCost: z.number().min(0).default(0),
  internetCost: z.number().min(0).default(0),
  amount: z.number().min(0).default(0),
  totalPaid: z.number().min(0),
  isPaid: z.boolean().default(false),
});

export const insertDebtSchema = z.object({
  code: z.string().min(1).max(255),
  tenantId: z.number().min(1),
  roomId: z.number().min(1),
  date: z.string().min(1),
  rentCost: z.number().min(0),
  prevElectricityRegister: z.number().min(0),
  currentElectricityRegister: z.number().min(0),
  monthElectricityConsume: z.number().min(0),
  electricityCost: z.string().min(1),
  prevWaterRegister: z.number().min(0),
  currentWaterRegister: z.number().min(0),
  monthWaterConsume: z.number().min(0),
  waterCost: z.string().min(1),
  tvCost: z.number().min(0),
  internetCost: z.number().min(0),
  amount: z.string().min(1),
  totalPaid: z.string().min(1),
});
