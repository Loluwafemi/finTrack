import { asc, desc, eq } from "drizzle-orm";
import { verceldb, db as localdb, type dbInterface } from "../db";
import { user_transactions } from "../db/schema";



let db:dbInterface;

try {
        if(await verceldb.query.user.findFirst()){
            db = verceldb
        }else{
            // log this
            throw new Error('Can not connect to the cloud: USER'); 
        }
    // log this
    console.log("cloud connection not established Established, Connecting locally:TRANSCAT.");
} catch (error) {
    db = localdb
    // log this
    console.log("local connection established Established, Connecting locally:TRANSCAT.");
}


type TransactionTypes = {
    type: 'receipt' | 'notification' | 'activity' | 'message' | 'log',
    message: {},
    author: string,
    receiver: string,
    status: "pending" | "approved" | "declined" | "deleted",
}


export class Transactions {
    async invoke( data: TransactionTypes ) {
        let transaction;

        transaction = await db.insert(user_transactions).values({
            author: data.author,
            message: data.message,
            receiver: data.receiver,
            status: data.status,
            type: data.type,
        }).returning()

        transaction = transaction.pop()

        if (!transaction) return { status: false, message: "failed to save transaction activity" }

        return { status: false, message: "transaction activity found", data: transaction }
    }

    async find(userid:string){

        if (!userid) return { status: false, message: "Invalid userid" }

        let transaction;

        transaction = await db.query.user_transactions.findMany({
            where: eq(user_transactions.author, userid),
            orderBy: asc(user_transactions.created_at)
        })

        if (!transaction) return { status: false, message: "failed to retrive transaction activity" }

        return { status: false, message: "activity found", data: transaction }
    }





}