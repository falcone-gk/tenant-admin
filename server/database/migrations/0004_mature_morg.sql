ALTER TABLE "tenants" ADD COLUMN "debt_prefix" varchar(2);--> statement-breakpoint
ALTER TABLE "tenants" ADD COLUMN "debt_counter" integer DEFAULT 0 NOT NULL;