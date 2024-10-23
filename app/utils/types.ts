import type { z } from "zod";

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

export type FormRoom = z.infer<typeof roomSchema>;
export interface Room extends FormRoom {
  id: number;
}
