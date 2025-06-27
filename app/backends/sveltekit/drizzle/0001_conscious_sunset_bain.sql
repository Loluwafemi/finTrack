CREATE TYPE "public"."transactiontype" AS ENUM('receipt', 'notification', 'activity', 'message');--> statement-breakpoint
ALTER TABLE "user_transaction" ADD COLUMN "type" "transactiontype" NOT NULL;