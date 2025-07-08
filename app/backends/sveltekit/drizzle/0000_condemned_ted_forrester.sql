CREATE TYPE "public"."accounttype" AS ENUM('user', 'admin', 'superadmin', 'system');--> statement-breakpoint
CREATE TYPE "public"."bankstatus" AS ENUM('approved', 'pending', 'disabled', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."budgetstatus" AS ENUM('pending', 'approved', 'declined', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."transactiontype" AS ENUM('receipt', 'notification', 'activity', 'message', 'log');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('pending', 'approved', 'disabled', 'deleted');--> statement-breakpoint
CREATE TABLE "banks_receipt_template" (
	"id" serial NOT NULL,
	"template_id" text DEFAULT gen_random_uuid() NOT NULL,
	"bankname" text NOT NULL,
	"template" text,
	"templatename" text,
	"author" text,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "budget_expense" (
	"budgetid" text NOT NULL,
	"expense_object" json NOT NULL,
	"expense_composition" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "protection" (
	"userid" text,
	"password" text NOT NULL,
	"invitationkey" text,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "registerd_templates" (
	"id" serial NOT NULL,
	"budget_name" text NOT NULL,
	"budget_expenses" json DEFAULT '{"expenses":[]}'::json NOT NULL,
	"author" text NOT NULL,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"userid" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"email" text NOT NULL,
	"status" "user_status" DEFAULT 'approved' NOT NULL,
	"accounttype" "accounttype" DEFAULT 'user' NOT NULL,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_bank" (
	"userid" text NOT NULL,
	"bankname" text NOT NULL,
	"bankaccountname" text NOT NULL,
	"bankaccountnumber" text NOT NULL,
	"status" "bankstatus" DEFAULT 'approved' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_budget" (
	"userid" text NOT NULL,
	"id" serial NOT NULL,
	"budgetid" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"budgettitle" text NOT NULL,
	"budgettemplate_id" text NOT NULL,
	"status" "budgetstatus" DEFAULT 'pending' NOT NULL,
	"approvedby" text,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "user_data" (
	"userid" text NOT NULL,
	"organization" text DEFAULT 'personal',
	"organization_name" text,
	"data" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_transaction" (
	"user_id" text NOT NULL,
	"message" json NOT NULL,
	"type" "transactiontype" NOT NULL,
	"status" "budgetstatus" NOT NULL,
	"author" text NOT NULL,
	"id" text DEFAULT gen_random_uuid() NOT NULL,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "budget_expense" ADD CONSTRAINT "budget_expense_budgetid_user_budget_budgetid_fk" FOREIGN KEY ("budgetid") REFERENCES "public"."user_budget"("budgetid") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "protection" ADD CONSTRAINT "protection_userid_user_userid_fk" FOREIGN KEY ("userid") REFERENCES "public"."user"("userid") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_userid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("userid") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_bank" ADD CONSTRAINT "user_bank_userid_user_userid_fk" FOREIGN KEY ("userid") REFERENCES "public"."user"("userid") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_budget" ADD CONSTRAINT "user_budget_userid_user_userid_fk" FOREIGN KEY ("userid") REFERENCES "public"."user"("userid") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_data" ADD CONSTRAINT "user_data_userid_user_userid_fk" FOREIGN KEY ("userid") REFERENCES "public"."user"("userid") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_transaction" ADD CONSTRAINT "user_transaction_user_id_user_userid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("userid") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_transaction" ADD CONSTRAINT "user_transaction_author_user_userid_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("userid") ON DELETE no action ON UPDATE no action;