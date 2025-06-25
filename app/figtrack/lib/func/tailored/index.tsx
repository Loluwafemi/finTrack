import { api_origin_address, apiHeaders, backendORIGIN, getData, SessionUser } from "~/lib/server/server";



/* 
    Check if session assigned and ready

*/

interface credential {
    organization: 'string',
    bank_name: string,
    bank_account_number: string,
    bank_account_name: string,
    firstname: string | null,
    lastname: string | null,
    username: string | null,
    email: string | null,
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
    constructor(){
        this.authAlive = hydrate()
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
                data: session }
        }else{
            return {
                status: false,
                message: "Invalid Credential",
                data: null
            }
        }
        
    }


}