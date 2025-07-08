import { defineConfig } from 'drizzle-kit';


import * as dotenv from "dotenv";

dotenv.config()


if (!process.env.DATABASE_URL || !process.env.DATABASE_URL_POSTGRES_URL) throw new Error('DATABASE_URL is not set');


console.log(process.env.DATABASE_URL!);

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.LOCAL_DATABASE_URL as string || process.env.DATABASE_URL_POSTGRES_URL as string},
	verbose: true,
	strict: true
});
