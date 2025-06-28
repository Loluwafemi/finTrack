import { eq } from "drizzle-orm";
import db from "../db";
import { protection, user, user_bank, user_budget, user_data, user_transactions } from "../db/schema";
import { Budget } from "./budget";
import { Transactions } from "./transaction";

export interface User {
    firstname: string | null,
    lastname: string | null,
    username: string | null,
    email: string | null,
    password: string | null
}


export interface userDataType {
    organization: string,
    bank_name: string,
    bank_account_number: string,
    bank_account_name: string
}

export interface UserCredential {
    firstname: string | null,
    lastname: string | null,
    username: string | null,
    email: string | null,
    password: string | null
}



export class User {
    constructor(){

    }

    /* 
    
    Remember to create a safe guard for every query with try-catch to return data or null
    */

    async create(userdata: UserCredential | any, cred_data: userDataType|null = null) {
        let transaction;

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
        }).returning()

            if (cred_data){
                transaction = transaction.pop()

                transaction = await db.insert(user_data).values({
                    data: cred_data,
                    id: transaction?.userid!
                }).returning()
            }else {
                transaction = transaction.pop()
                transaction = await db.insert(user_data).values({
                    data: {},
                    id: transaction?.userid!
                }).returning()
            }

            transaction = transaction.pop()
        
        
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


    async find(userid:string, all:boolean=false){
        
        let transaction = await db.query.user.findFirst({
            where: eq(userid, user.userid),
            with: {
                data: true
            }
        })

        if(!transaction) return {status: false, message: "user does not exist"}

        return { status: true, message: "user found", data: transaction }
    }

    async budgets(userid:string|any){
        
        let transaction = await db.query.user_budget.findMany({
            where: eq(userid, user.userid),
            with: {
                expense: true
            }
        })

        if(!transaction) return {status: false, message: "budget does not exist"}

        return { status: true, message: "budget found", data: transaction }
    }

    async transactions(userid:string|any){
        let transaction;

        transaction = new Transactions()
        transaction = await transaction.find(userid)

        
        if(!transaction) return {status: false, message: "transactions does not exist"}
        

        return { status: true, message: "transactions found", data: transaction.data }


    }

    async validate(email:string| any, password:string){
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

    // provoke transaction
    async addBudget(budget: { title: string, type: string, expenses: [] }, auth: any){
        let transaction;
        const budgetObj = new Budget()
        transaction = await budgetObj.add(budget, auth)


        try {
            let invoking = new Transactions()
            await invoking.invoke({
                author: auth.userid,
                receiver: auth.userid,
                message: {
                    text: "You added a new budget. wait while it's approved.",
                    title: "Budget Request"
                },
                status: 'pending',
                type: 'activity'
            })
        } catch (error) {
            // record bug to another table. do this for the rest of the transactions to the database
        }




        return transaction
    }


    // provoke transaction
    async uploadReceipt(data:any, auth:any){
        let transaction;
        const budgetObj = new Budget()

        transaction = await budgetObj.update(data)
        //  in the future. Get the budget name and use it in the message.
        
        try {
            let invoking = new Transactions()
            // get budget title with the id
            let budgetInfo = budgetObj.find(data.bid) 
            
            await invoking.invoke({
                author: auth.userid,
                message: {
                    title: "Receipt Upload",
                    text: {
                        title: (await budgetInfo).transaction?.budgettitle,
                        name: (await budgetInfo).transaction?.budgetname,
                        desc: data.description,
                        expense: data.expenseCategory, 
                        cost: data.cost,
                    },
                    date: Date.now()
                },
                receiver: auth.userid,
                status: 'approved',
                type: 'receipt'
            })
        } catch (error) {
            
        }
        
        

        if (!transaction?.status) return transaction

        return transaction
    }

}