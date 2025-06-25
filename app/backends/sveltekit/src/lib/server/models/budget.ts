import { eq } from "drizzle-orm";
import db from "../db";
import { budget_expense, registered_budget_templates, user_budget } from "../db/schema";



export class Budget{
    constructor(){
        
    }

    async templates(budget?: string){
        let transaction;

        if (budget){
            transaction = await db.query.registered_budget_templates.findMany({
                where: eq(registered_budget_templates.name, budget)
            })
            return transaction
        }

        transaction = await db.query.registered_budget_templates.findMany()
        return transaction
    }

    async register(data: {budgetName: string, expenses: [] }, auth: any){
        let transaction;

        
        if(auth.accounttype != 'admin') return { status: false, message: 'Unauthorize call. You need privilege for this action'}

        transaction = await db.insert(registered_budget_templates).values({
            author: auth.userid,
            name: data.budgetName,
            budget_expenses: data.expenses,
        }).returning()

        if(!transaction) return { status: false, message: 'Unable to register budget' }

        return transaction
    }

    async add(data:{ title: string, type: string, expenses: [] }, auth:any){
        let transaction;

        transaction = (await db.insert(user_budget).values({
            userid: auth.userid,
            budgetname: data.title,
            budgettitle: data.type,
            approvedby: 'none'
        }).returning()).pop()

        if (!transaction) return { status: false, message: "Unable to save user's budget." }        

        transaction = await db.insert(budget_expense).values({
            id: transaction.budgetid,
            expense_object: data.expenses,
            expense_composition: data.expenses
        }).returning()

        if (!transaction) return { status: false, message: "Unable to save user's budget." }

        return { status: true, message: "Successful", data: transaction }
    }
}