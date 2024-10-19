CREATE TABLE IF NOT EXISTS "user" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"is_admin" boolean DEFAULT true NOT NULL
);
