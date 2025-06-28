ALTER TABLE "user_transaction" ADD COLUMN "status" "budgetstatus" NOT NULL;--> statement-breakpoint
ALTER TABLE "user_transaction" ADD COLUMN "author" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_transaction" ADD CONSTRAINT "user_transaction_author_user_userid_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("userid") ON DELETE no action ON UPDATE no action;