import { Budget } from "./budget"


export class Admin{
    constructor(){

    }

    async registerBuget(budget: {budgetName: string, expenses: [] }, auth: any){
        const budgetObj = new Budget()        
        return budgetObj.register({budgetName: budget.budgetName, expenses: budget.expenses}, auth)
    }
}