import { eq } from "drizzle-orm";
import db from "../db";
import { protection, user, user_bank, user_budget, user_data, user_transactions } from "../db/schema";
import { Budget } from "./budget";

export interface User {
    firstname: string | null,
    lastname: string | null,
    username: string | null,
    email: string | null,
    password: string | null
}

export class User {
    constructor(){

    }


    async create(userdata: User | any) {
        let transaction: any;

        // check if already exist
        transaction = await db.query.user.findFirst({
            where: eq(userdata.email, user.email)
        })


        
        if (transaction) return {status: false, message: "User already existed"}

        transaction = (await db.insert(user).values({
            email: userdata.email,
            firstname: userdata.firstname,
            lastname: userdata.lastname,
            username: userdata.username,
            // accounttype: 'admin'
        }).returning()).pop()

        if (!transaction) return { status: false, message: "Unable to save user data"}

        transaction = await db.insert(protection).values({
            password: userdata.password,
            userid: transaction.userid
        })

        return transaction

    }

    async remove(userid: string|any){

        let transaction: any;
        // check if already exist
        transaction = await db.query.user.findFirst({
            where: eq(userid, user.userid)
        })
        
        if (!transaction) return {status: false, message: "User not exist"}

        transaction = await db.delete(user).where(eq(userid, user.userid))

        return transaction
   
    }

    async users(email?:string| any){
        let transaction;

        if (email) {
            // fetch user by email and return
            transaction = await db.query.user.findFirst({
                where: eq(email, user.email),
                with: {
                    data: true,
                    banks: true,
                    budgets: true,
                    transactions: true
                }
            })
            if(!transaction) return false
            return transaction
        }

        transaction = await db.query.user.findMany({
            with: {}
        })
        return transaction
    }

    async validate(email?:string| any, password:string){
        let transaction;

        if (email && password) {
            // fetch user by email and return
            transaction = await db.query.user.findFirst({
                where: eq(email, user.email),
                with: {
                    data: true,
                    banks: true,
                    budgets: true,
                    transactions: true
                }
            }).then(async (response:any)=>{
                // let found = response;
                let transaction = await db.query.protection.findFirst({
                where: eq(response.userid, protection.userid)
                })

                if (transaction?.password == password) {{
                    return response
                }}else{
                    return null
                }
                
            })

            return transaction
        }

        return null
    }
    
    async addBudget(budget: { title: string, type: string, expenses: [] }, auth: any){
        let transaction;
        const budgetObj = new Budget()
        transaction = await budgetObj.add(budget, auth)

        return transaction
    }

}