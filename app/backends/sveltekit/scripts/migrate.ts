#!/usr/bin/env ts-node

// use npx ts-node ./scripts/migrate
// CLOUD
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

import { createClient, VercelClient } from '@vercel/postgres';

import { drizzle as cloud, VercelPgDatabase} from "drizzle-orm/vercel-postgres";

import * as schema from '../src/lib/server/db/schema'

import { eq } from 'drizzle-orm';

import { user, protection, user_data } from '../src/lib/server/db/schema';

import { encodeBase32, encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';

import bcrypt from 'bcrypt';

import * as dotenv from "dotenv";

dotenv.config()

const env:any = dotenv.config().parsed

const cloud_client = createClient({
    connectionString: env.XDATEBASE_URL_POSTGRES_URL_NON_POOLING,
    ssl: true,
    keepAlive: true,
    application_name: 'CloudDB'
})

export const verceldbGenerator = cloud(cloud_client, {
    schema: schema
});


async function main() {    
    console.log("Initiating migration");
    await cloud_client.connect()


    await migrate(verceldbGenerator, { migrationsFolder: './drizzle' }).then(async (output)=>{
        // create system default account        
        console.log('Done migrating!');
        console.log('Creating system profile!');
        await createSystemUser(verceldbGenerator)
        await cloud_client.end()
        console.log("System Account is ready!");
        return output
    }).catch((err)=>{
        console.log("Something went wrong with the configuration");
        console.log(err); 
    })
}
main();




const SYSTEM_USERID = process.env.SYSTEM_USERID!
const SYSTEM_FNAME = process.env.SYSTEM_FNAME!
const SYSTEM_EMAIL = process.env.SYSTEM_EMAIL!
const SYSTEM_LNAME = process.env.SYSTEM_LNAME!
const ACCESS_ENCRYPTION_KEY = process.env.ACCESS_ENCRYPTION_KEY!


/* 
    Create system user: privilege over all account
*/

async function createSystemUser(dbConn:VercelPgDatabase<typeof schema> & {
    $client: VercelClient}){

    let transaction, credential_id;

    transaction = await dbConn.query.user.findFirst({
        where: eq(user.userid, SYSTEM_USERID)
    })

	if(transaction) {
        console.log("System Administrator already exists");
        return transaction
    }

    // create user
    transaction = (await dbConn.insert(user).values({
        email: SYSTEM_EMAIL,
        firstname: SYSTEM_FNAME,
        lastname: SYSTEM_LNAME,
        username: 'developer',
        accounttype: 'system',
        userid:   SYSTEM_USERID
    }).returning()).pop()

    if (!transaction) {
        console.log("There was a problem setting up System Administrator");
        return
    } 

    // create user password
	transaction = (await dbConn.insert(protection).values({
		userid: transaction.userid,
		password: await bcrypt.hash(ACCESS_ENCRYPTION_KEY, 10)
	}).returning()).pop()   

    if (!transaction) return

    // updating account data
    transaction = (await dbConn.insert(user_data).values({
        data: {
            "bank_name":"",
            "bank_account_name":"",
            "bank_account_number":"",
            "organizationid":"SYSTEM"
            },
        id: transaction.userid,
        organization: 'ALLACCOUNT',
        organization_name: 'ALLACCOUNT'
    }).returning()).pop()

    credential_id = transaction?.id
    if(!transaction) return

    if(!transaction) return

    return transaction;



}
