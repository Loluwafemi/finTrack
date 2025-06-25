import { useEffect } from "react";
import { api_origin_address, apiHeaders, backendORIGIN, getData, saveBudget, SessionUser } from "~/lib/server/server";



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

    async records(budget_name:any): Promise<{budgets: [], expenses: [], balances: {}}>{
        /* 
            run a fetch request to return all expense on the selected budget and then return the polished result in two phase: 
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

        */
        return { budgets: [], expenses: [], balances: {} }
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
        // console.log(requestHandler);
        
        return requestHandler
    }


}
