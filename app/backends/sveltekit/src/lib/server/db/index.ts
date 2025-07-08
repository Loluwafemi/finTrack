
// local
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';
import { env } from '$env/dynamic/private';

import { config } from 'dotenv';


// cloud
import { drizzle as cloud, VercelPgDatabase} from "drizzle-orm/vercel-postgres";
import { createPool, VercelPool } from '@vercel/postgres';

config({ path: '.env.local' }); // or .env




const localdbURL = process.env.DATABASE_URL! || env.DATABASE_URL!


const clouddbURL = process.env.DATABASE_URL_POSTGRES_URL_NON_POOLING! || env.DATABASE_URL_POSTGRES_URL_NON_POOLING!
const clouddbURLPOOL = process.env.DATABASE_URL_POSTGRES_URL! || env.DATABASE_URL_POSTGRES_URL!

if (!localdbURL || !clouddbURL! || !clouddbURLPOOL) {

  console.log("Environment variables not set");
  

  throw new Error('IMPORTANT DATABASE_URL IS NOT SET');
}


const pool = createPool({
        connectionString: clouddbURLPOOL
});


// cloud db
export const verceldb = cloud(pool, {
    schema: schema
});




// local db
const client = postgres(localdbURL);

export const db = drizzle(client, {
  schema: schema
})



export type dbInterface = PostgresJsDatabase<typeof schema> & 
{ $client: postgres.Sql<{}>;} | VercelPgDatabase<typeof schema> & {
$client: VercelPool}