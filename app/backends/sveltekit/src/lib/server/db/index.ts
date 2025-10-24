
// local
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from "dotenv";
import * as schema from './schema';
import { env } from '$env/dynamic/private';

import { config } from 'dotenv';
dotenv.config()

// cloud
import { drizzle as cloud, VercelPgDatabase} from "drizzle-orm/vercel-postgres";
import { createPool, VercelPool } from '@vercel/postgres';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle as cloud2, NeonHttpDatabase } from 'drizzle-orm/neon-http';

config({ path: '.env.local' }); // or .env




const localdbURL = process.env.LOCAL_DATABASE_URL! || env.LOCAL_DATABASE_URL!


const clouddbURL = process.env.XDATEBASE_URL_POSTGRES_URL_NON_POOLING! || env.XDATEBASE_URL_POSTGRES_URL_NON_POOLING!


const clouddbURLPOOL = process.env.XDATEBASE_URL_POSTGRES_URL! || env.XDATEBASE_URL_POSTGRES_URL!

if (!localdbURL || !clouddbURL! || !clouddbURLPOOL) {

  console.log("Environment variables not set");
  
  

  throw new Error('IMPORTANT DATABASE_URL IS NOT SET');
}







// const pool = createPool({
//         connectionString: clouddbURLPOOL
// });


/* 
  To allow neon to work with drizzle-orm, you need to use the neon-http package.
  This package provides a drizzle-orm compatible interface for Neon databases.
  You can use the neon-http package to create a drizzle-orm instance for your Neon database.

*/
const sql = neon(clouddbURL);


// cloud db
export const verceldb = cloud2(sql, {
    schema: schema
});




// local db
const client = postgres(localdbURL);

export const db = drizzle(client, {
  schema: schema
})

export type dbInterface = PostgresJsDatabase<typeof schema> & 
{ $client: postgres.Sql<{}>;} | NeonHttpDatabase<typeof schema> & {
    $client: NeonQueryFunction<false, false>;
}