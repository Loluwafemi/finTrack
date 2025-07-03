import { asc, desc, eq } from "drizzle-orm";
import db from "../db";
import { budget_expense, registered_budget_templates, user_budget } from "../db/schema";
import { Transactions } from "./transaction";
import { generateTimeStamp } from "./user";



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

    // invoke transaction
    async update(data){
        let transaction;

        transaction = await db.query.budget_expense.findFirst({
            where: eq(budget_expense.id, data.bid)
        })

        let selected_budget = await db.query.user_budget.findFirst({
            where: eq(user_budget.budgetid, data.bid)
        })
        let current_budget = selected_budget

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

        try {
            
            await db.update(user_budget).set({
                updated_at: generateTimeStamp(),
            }).where(eq(budget_expense.id, data.bid)).returning()

            let invoking = new Transactions()
            // get budget title with the id
            
            await invoking.invoke({
                author: current_budget?.userid!,
                message: {
                    title: "Budget Updating",
                    text: `The budget: ${current_budget?.budgettitle} was updated by user`,
                    date: generateTimeStamp()
                },
                receiver: current_budget?.userid!,
                status: 'approved',
                type: 'log'
            })
        } catch (error) {
            
        }

        return { status: true, message: "upload successful", data: transaction }

    }

    async find(id: string, withExpenses: boolean = false){
        let transaction;
        

        if (withExpenses){
            transaction = await db.query.user_budget.findFirst({
                where: eq(user_budget.budgetid, id),
                with: {
                    expense: true
                },
                orderBy: desc(user_budget.updated_at)
            })
        } else {
            transaction = await db.query.user_budget.findFirst({
                where: eq(user_budget.budgetid, id),
                orderBy: desc(user_budget.updated_at)

            })
        }

        if(!transaction) return { status: false, message: 'Not found' }

        return { status: true, data: transaction }
    }

    // invoke transaction
    async manage(budgetId: string, status: 'pending'| 'approved'| 'declined'| 'deleted'){
        let transaction;

        try {
            transaction = await db.update(user_budget).set({
                status: status,
            }).where(eq(user_budget.budgetid, budgetId)).returning()
            
            let selected_budget = await db.query.user_budget.findFirst({
                where: eq(user_budget.budgetid, budgetId)
            })

            let current_budget = transaction.pop()

            if (!transaction) return { status: false, message: "No member found yet" }


        try {
            let invoking = new Transactions()
            // get budget title with the id
            // update the budget status and notify the user
            await db.update(user_budget).set({
                updated_at: generateTimeStamp()
            }).where(eq(user_budget.budgetid, budgetId)).returning()


            await invoking.invoke({
                author: current_budget?.userid!,
                message: {
                    title: "Budget Update",
                    text: `The budget: ${current_budget?.budgettitle} was managed by admin to ${current_budget?.status}`,
                    date: Date.now()
                },
                receiver: current_budget?.userid!,
                status: status,
                type: 'activity'
            })
        } catch (error) {
            
        }

            
            return { status: true, data: current_budget }
        } catch (error) {
            return { status: false, message: "No member found yet", error }
        }


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