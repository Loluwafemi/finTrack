// cloud
import { drizzle as CloudDrizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// local
import { drizzle, drizzle as localdb } from 'drizzle-orm/postgres-js';
import { Pool } from "pg";
import postgres from 'postgres';

import * as schema from './schema';
import { env } from '$env/dynamic/private';


const localdbURL = process.env.DATABASE_URL! || env.DATABASE_URL
const clouddbURL = process.env.CLOUD_DATABASE_URL! || env.CLOUD_DATABASE_URL

if (!localdbURL) throw new Error('DATABASE_URL is not set');
// if (!clouddbURL) throw new Error('CLOUD DATABASE_URL is not set');


// const pool = new Pool({
//     connectionString: localdbURL,
// });

const client = postgres(localdbURL);

const db = drizzle(client, {
  schema: schema
})

export default db;






// Only for Cloud DB
/* Enable for production only then disable cloud */

// const client = neon(clouddbURL);

// export const db = CloudDrizzle(client, { schema })
