CREATE TYPE "public"."register_enum" AS ENUM('fixed', 'variable');--> statement-breakpoint
CREATE TYPE "public"."unit_enum" AS ENUM('m3', 'kw');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "debts" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"tenant_id" integer,
	"room_id" integer,
	"date" integer NOT NULL,
	"is_service" boolean DEFAULT false NOT NULL,
	"rent_cost" integer DEFAULT 0 NOT NULL,
	"prev_electricity_register" integer DEFAULT 0 NOT NULL,
	"current_electricity_register" integer DEFAULT 0 NOT NULL,
	"electricity_cost" numeric DEFAULT '0' NOT NULL,
	"prev_water_register" integer,
	"current_water_register" integer,
	"water_cost" numeric DEFAULT '0' NOT NULL,
	"tv_cost" integer DEFAULT 0 NOT NULL,
	"internet_cost" integer DEFAULT 0 NOT NULL,
	"amount" numeric NOT NULL,
	"total_paid" numeric DEFAULT '0' NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	CONSTRAINT "debts_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" integer,
	"date" date NOT NULL,
	"debt_id" integer,
	"amount" numeric NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"code" varchar(20) NOT NULL,
	"tenant_id" integer,
	"rent" integer NOT NULL,
	"elictricityTypeRegister" "register_enum",
	"electricity_register" integer NOT NULL,
	"waterTypeRegister" "register_enum",
	"water_register" integer NOT NULL,
	"has_tv" boolean DEFAULT false NOT NULL,
	"tv_cost" integer DEFAULT 0 NOT NULL,
	"has_internet" boolean DEFAULT false NOT NULL,
	"internet_cost" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "rooms_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit" "unit_enum",
	"unit_price" numeric(3, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenants" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"payment_day" smallint NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "debts" ADD CONSTRAINT "debts_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "debts" ADD CONSTRAINT "debts_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_debt_id_debts_id_fk" FOREIGN KEY ("debt_id") REFERENCES "public"."debts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooms" ADD CONSTRAINT "rooms_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
