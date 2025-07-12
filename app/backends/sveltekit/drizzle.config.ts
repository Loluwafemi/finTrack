import { defineConfig } from 'drizzle-kit';


import * as dotenv from "dotenv";

dotenv.config()


if (!process.env.LOCAL_DATABASE_URL || !process.env.XDATEBASE_URL_POSTGRES_URL_NON_POOLING) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.LOCAL_DATABASE_URL as string || process.env.XDATEBASE_URL_POSTGRES_URL_NON_POOLING as string},
	verbose: true,
	strict: true
});
