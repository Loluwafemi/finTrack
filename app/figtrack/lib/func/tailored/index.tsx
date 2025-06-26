import { useEffect } from "react";
import { api_origin_address, apiHeaders, backendORIGIN, getData, requestHandler, saveBudget, SessionUser } from "~/lib/server/server";



/* 
    Check if session assigned and ready

*/

interface credential {
    organization: 'string' | null,
    bank_name: string | null,
    bank_account_number: string | null,
    bank_account_name: string | null,
    firstname: string | null,
    lastname: string | null,
    username: string | null,
    email: string | null,
    userid: string | null
}

export type budgetList = {
    key: string,
    value: string,
    disabled: false,
    bid: string
}


async function hydrate() {
        const cookie = await getData(api_origin_address)
        if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }
        apiHeaders.set('Cookie', cookie)

        const request = await fetch(`${backendORIGIN}/api`, {
            headers: Object.fromEntries(apiHeaders.entries()),
            method: 'GET',
            credentials: 'same-origin'
        })
        const session = await request.json()    
            
        return session
}

export class Auth {
    authAlive: any
    isActive: boolean = false
    // user: credential
    constructor(){
        console.log("Initializing authententication for data");
    }


    async transactions(): Promise<{ tranactions: [], balance: string, spentInterval: string }>{

        /* 
        return user polished data such as:
        transactions,
        cummulated price for accepted budget
        amount spent this [period]

        Note: always convert number back to strings after completion
        */
       return {balance: '0', spentInterval: '0', tranactions: []}
    }

    async records(budget_id?:any): Promise<{budgets:budgetList[], expenses: expensesTemplate[], balances: balacesTemplate}>{
        /* 
            Run a fetch request to return all expense on the selected budget and then return the polished result in two phase: 
            [array object and chart data]

            How data is presented
            1. Budget: this acts as a pointer; a list of object {name, id} all registered budget under this account is returned and used present the first record. 
            Using the budget id to fetch the expenses.

            2. Expenses: this are generated list from the composite list.
                Using the two [expense_object, expense_composition] to generate a list of presentable expense;
                Presentable expense contains the:
                    Expense name
                    Expense cost amount
                    Expense spent amount
                    Expense spent amount in percentage against the cost amount
                Note: this data presentation is for list only
            
            3. Balances: these are calculated amount which are generated from the Expenses and is classified into two:
                x. Total Available
                y. Total Spent
                z. Total, started amount

            Attempt:
                1. Use Manual approach to manage these data
                2. Use library: --

            Fetch budget with user
        */


       let portfolio: {budgets:budgetList[], expenses: expensesTemplate[], balances: balacesTemplate} = {
            budgets: [],
            expenses: [],   // aasignable to others
            balances: {
                total_a: '',
                total_s: ''
            }
       }
       
       const requester = await requestHandler({url: 'api/service/records', data: await this.user()})
    // set budgetlists
       if (!requester.status) {
            portfolio.budgets = []
            portfolio.budgets = portfolio.budgets
       }else{
            portfolio.budgets = makeBudgetList(requester.data)
       }






    // use the parameter to pick from the generated object
        let expenses = makeExpenseList(requester.data)







    // create a query manager that select just the expense from the function parameter.
       portfolio.expenses = expenseQuery(expenses, budget_id).expense_c
       const expense_object = expenseQuery(expenses, budget_id).expense_o


    /* 
    Restructure the expense to show percentage
    percentage: to find the percentage for each expense iterated.
    since the expense object and composite share the same template/structure.
        - we enumerate the data by: [x,y]
            x - object
            y - composite

            percentage =  1 - (x - y)
    both the inital expense and the object of expense returns the same thing with value difference.
    both is array. so we do the following.

    */
    portfolio.expenses = expensePercentageGenerator(expenseQuery(expenses, budget_id).expense_o, expenseQuery(expenses, budget_id).expense_c)
    

    // create a generator to find the total available and total spent
       portfolio.balances = balancesGenerator(expenseQuery(expenses, budget_id).expense_c, expenseQuery(expenses, budget_id).expense_o)
       
        return portfolio
    }

    async activities(pagination:number=10): Promise<{activities: []}>{

        /* 
            make a paginated request and return n(pagination)
            return list objects
        */
       return {activities: []}
    }

    async user():Promise<credential>{
        let output: credential = await hydrate()        
        return output
    }

    static async isAlive(){
        
        const cookie = await getData(api_origin_address)
        if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }
        apiHeaders.set('Cookie', cookie)

        const request = await fetch(`${backendORIGIN}/api`, {
            headers: Object.fromEntries(apiHeaders.entries()),
            method: 'GET',
            credentials: 'same-origin'
        })

        const session = await request.json()
        
        if (session){
            // redirect to dashboard.
            return { 
                status: true,
                message: "Valid Credential",
                data: session 
            }
        }else{
            return {
                status: false,
                message: "Invalid Credential",
                data: null
            }
        }
        
    }


    async addBudget(expensedata: {title: string, type: string, expenses: []|any}){
        // send all user's session as a payload
        const sender = (await this.user())
        
        // save budget using user session and return status
        const requestHandler = await saveBudget({auth: sender, data: expensedata})
        
        return requestHandler
    }


}








function makeBudgetList(budget: any) {
    
    let output: budgetList[] = [];
    let incoming = budget

    incoming.forEach(unitBudget => {
        output.push({
            bid: unitBudget?.budgetid,
            disabled: false,
            key: unitBudget.budgetname,
            value: unitBudget.budgetname
        })
    });

    return output
}



export type expensesTemplate = {
    expense_c: [],
    expense_o: [],
    budgetid: string | null
}


function makeExpenseList(budgets:any) {
     let expenses: expensesTemplate[] = []
     
    /* 
        expense structure type is
        it has the following:
            1. expense_c
            2. expense_o
            3. id

        key:value
        {
        budget_id: { expense },
        budget_id: { expense },
        }
    */
    budgets.forEach(budget => {
        expenses.push({
            expense_c: budget.expense.expense_composition,
            expense_o: budget.expense.expense_object,
            budgetid: budget.budgetid
        })
    });

    return expenses;
}


function expenseQuery(expenses: expensesTemplate[], id?:string|null) {
    // takes in the array and a wanted name and return a single object from the list
    // select the first one


    let output: expensesTemplate = expenses[0];

    if (id) {
        expenses.forEach(expense => {
            if (expense.budgetid === id) {
                output = expense
            }
        });
    }

    return output
}


type unitExpenseTemplate = {
    cost: string | number,
    category: string,
    percentage: string

}
export type balacesTemplate = { total_a: string, total_s:  string}

function balancesGenerator(expense_c: unitExpenseTemplate[], expense_o: unitExpenseTemplate[]):balacesTemplate  {

    let total_s: string = '0';
    let total_a: string = '0';
    let output:balacesTemplate = { total_a: '0', total_s: '0' };


    /* 
    
    The math behind the total available and total spent
    from expence_c, all spent amount is summed
    and it is represented as a negative integer, when summed

    from expense_o: which hold the template for the budget's expense and untouched. all cost is summed
    and it is represented as a positive integer, when summed
            
    */


    // for total spent: expense_c
    expense_c.forEach(expense => {
        console.log("Spent for: ", expense.category, "is ", expense.cost);
        let cost:string|number = Number(expense.cost)
        let arith = Number(total_s) + cost
        total_s = arith.toFixed(2)
    });

    // for total cost: expense_o
    expense_o.forEach(expense => {        
        let cost:string|number = Number(expense.cost)
        let arith = Number(total_a) + cost
        total_a = arith.toFixed(2)
    });
    

    output.total_s = total_s

    output.total_a = total_a
    

    return output
}


function expensePercentageGenerator(arr: unitExpenseTemplate[], arr2: unitExpenseTemplate[]) {
    
    const output = arr.map((value, index)=>{
        let cost = Number(value.cost)
        let spent = Number(arr2[index].cost)
        let absAmB = cost - spent
        absAmB = Math.abs(absAmB)
        let addABavg = (cost + spent) / 2
        let percentage = (absAmB / addABavg) * 100        
        value.percentage = percentage.toString()
        
        return value
    })    

    return output
    
}


