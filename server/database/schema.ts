import {
  serial,
  smallserial,
  smallint,
  pgTable,
  varchar,
  boolean,
  integer,
  decimal,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const registerEnum = pgEnum("register_enum", ["fixed", "variable"]);
export const unitEnum = pgEnum("unit_enum", ["m3", "kw"]);

export const user = pgTable("users", {
  id: smallserial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  isAdmin: boolean("is_admin").notNull().default(true),
});

export const tenant = pgTable("tenants", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  // This initial debt is bercause some tenants already have debts
  // initalDebt: integer("initial_debt").notNull().default(0),
  // This field is to track the current debt of the tenant
  // currentDebt: integer("current_debt").notNull().default(0),
  // This field is to track the service debt of the tenant
  // serviceDebt: integer("service_debt").notNull().default(0),
  // This field is to track the total debt of the tenant = current debt + service debt
  // totalDebt: integer("total_debt").notNull().default(0),
  paymentDay: smallint("payment_day").notNull(),
  debtPrefix: varchar("debt_prefix", { length: 2 }).unique(),
  debtCounter: integer("debt_counter").notNull().default(0),
  // Field to track if the tenant is soft deleted or not
  isDeleted: boolean("is_deleted").notNull().default(false),
});

export const tenantRelations = relations(tenant, ({ many }) => ({
  rooms: many(room),
  debts: many(debt),
}));

// const insertUserSchema = createInsertSchema(tenant);

export const room = pgTable("rooms", {
  id: smallserial("id").primaryKey(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  tenantId: integer("tenant_id").references(() => tenant.id),
  rent: integer("rent").notNull(),
  electricityTypeRegister: registerEnum(),
  electricityRegister: integer("electricity_register").notNull(),
  waterTypeRegister: registerEnum(),
  waterRegister: integer("water_register").notNull(),
  hasTV: boolean("has_tv").notNull().default(false),
  tvCost: integer("tv_cost").notNull().default(0),
  hasInternet: boolean("has_internet").notNull().default(false),
  internetCost: integer("internet_cost").notNull().default(0),
});

export const roomRelations = relations(room, ({ one }) => ({
  tenant: one(tenant, {
    fields: [room.tenantId],
    references: [tenant.id],
  }),
}));

export const service = pgTable("services", {
  id: smallserial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  unit: unitEnum(),
  unitPrice: decimal("unit_price", { scale: 2, precision: 3 }).notNull(),
});

export const debt = pgTable("debts", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 255 }).notNull().unique(),
  tenantId: integer("tenant_id").references(() => tenant.id).notNull(),
  roomId: integer("room_id").references(() => room.id),
  date: date("date", { mode: "string" }).notNull(),
  isExtraDebt: boolean("is_service").notNull().default(false),
  rentCost: integer("rent_cost").notNull().default(0),
  prevElectricityRegister: integer("prev_electricity_register").notNull().default(0),
  currentElectricityRegister: integer("current_electricity_register").notNull().default(0),
  monthElectricityConsume: integer("month_electricity_consume").notNull().default(0),
  electricityCost: decimal("electricity_cost", { scale: 2 }).notNull().default("0"),
  prevWaterRegister: integer("prev_water_register"),
  currentWaterRegister: integer("current_water_register"),
  monthWaterConsume: integer("month_water_consume").notNull().default(0),
  waterCost: decimal("water_cost", { scale: 2 }).notNull().default("0"),
  tvCost: integer("tv_cost").notNull().default(0),
  internetCost: integer("internet_cost").notNull().default(0),
  amount: decimal("amount", { scale: 2 }).notNull(),
  totalPaid: decimal("total_paid", { scale: 2 }).notNull().default("0"),
  isPaid: boolean("is_paid").notNull().default(false),
});

export const debtRelations = relations(debt, ({ one }) => ({
  tenant: one(tenant, {
    fields: [debt.tenantId],
    references: [tenant.id],
  }),
  room: one(room, {
    fields: [debt.roomId],
    references: [room.id],
  }),
}));

export const payment = pgTable("payments", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id").references(() => tenant.id),
  date: date("date", { mode: "string" }).notNull(),
  debtId: integer("debt_id").references(() => debt.id),
  amount: decimal("amount", { scale: 2 }).notNull(),
  isPaid: boolean("is_paid").notNull().default(false),
});
