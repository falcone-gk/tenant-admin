import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../database/schema";

export const tables = schema;

export const useDrizzle = () => {
  const config = useRuntimeConfig();
  const databaseUrl = config.drizzle.database_url;
  const client = postgres(databaseUrl);
  const db = drizzle(client, { schema });
  return db;
};
