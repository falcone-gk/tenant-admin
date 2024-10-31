import type { z } from "zod";

declare module "#app" {
  interface PageMeta {
    title?: string;
    hasAddView?: boolean;
  }
}

export interface UserSession {
  id: number;
  username: string;
  isAdmin: boolean;
}

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type FormTenant = z.infer<typeof tenantSchema>;
export interface Tenant extends FormTenant {
  id: number;
}
export interface TableTenant extends Tenant {
  rooms: {
    code: string;
  }[];
}
export interface TenantOption {
  id: number;
  name: string;
}

export type FormRoom = z.infer<typeof roomSchema>;
export interface Room extends FormRoom {
  id: number;
}

export interface RoomOption {
  id: number;
  code: string;
  tenantId: number;
}

export type InsertDebt = z.infer<typeof insertDebtSchema>;
export type FormDebt = Omit<InsertDebt, "tenantId" | "roomId"> & {
  tenantId: number | null;
  roomId: number | null;
};
// export interface Debt extends InsertDebt {
//   id: number;
// }
export interface TableDebt extends InsertDebt {
  isEdit: boolean;
}
