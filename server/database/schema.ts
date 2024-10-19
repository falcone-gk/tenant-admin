import { smallserial, pgTable, varchar, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: smallserial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  isAdmin: boolean("is_admin").notNull().default(true),
});
