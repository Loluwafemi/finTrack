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

    async update(data){
        let transaction;

        transaction = await db.query.budget_expense.findFirst({
            where: eq(budget_expense.id, data.bid)
        })

        if (!transaction) return { status: false, message: "Expense not found, contact admin." }

        // use the return data to validate if the expense is found.
        let update = validateExpense(data, transaction.expense_composition)

        if (!transaction) return { status: false, message: "Category not found, contact admin." }

        // update the expense_composite by subtracting the costs.        

        transaction = await db.update(budget_expense).set({
            expense_composition: update
        }).where(eq(budget_expense.id, data.bid)).returning()

        transaction = transaction.pop()

        if (!transaction) return { status: false, message: "upload failed", data: transaction }

        return { status: true, message: "upload successful", data: transaction }

    }

    async find(id: string){
        let transaction;
        transaction = await db.query.user_budget.findFirst({
            where: eq(user_budget.budgetid, id)
        })

        if(!transaction) return { status: false, message: 'Not found' }

        return { status: true, message: 'Not found', transaction }
    }
}


/* 

{"cost": "491888", "expenseCategory": "Publishing"}
*/

type expenseTemplate = {
    cost: string | null,
    expenseCategory: string | null

}

function validateExpense(data:expenseTemplate , expenses: expenseTemplate[]|any): expenseTemplate[]|null {
    expenses.forEach((expense, index) => {
        if (expense.expenseCategory == data.expenseCategory) {            
        // perform the operation here
        let arithmetic = Number(expense.cost) - Number(data.cost)            
        expense.cost = String(arithmetic)
        expenses[index] = expense
        }
    });
    return expenses

}