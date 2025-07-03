import { GetRequestHandler, PostrequestHandler, apiHeaders, api_origin_address, backendORIGIN, getData, hydrate, signinREQUEST, signouREQUEST, signupREQUEST } from "../server/server";

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


export interface userFormDataTemplate {
    firstname: string | null,
    lastname: string | null,
    username: string | null,
    email: string | null,
    password: string | null,
    accounttype: 'admin' | 'super-admin' | null,
    number: string,
    organization: 'personal' | 'institution' | 'business',
    organization_name: string,
}


export interface userSignupDataTemplate {
    firstname: string | null,
    lastname: string | null,
    email: string | null,
    password: string | null,
    accounttype: 'admin' | 'super-admin' | null,
    number: string,
    organization: 'personal' | 'institution' | 'business',
    organization_name: string,
    invitation_key: string
}


export class User {
    // constructor() {
        
    // }


    static async isAuthenticated(){
        // return user sessioned data

    }

    async login(data:any){
        let transaction;
        transaction = await signinREQUEST(data)


        return transaction
        
    }


    async logout(){
        let transaction;

        transaction = await signouREQUEST()

        return transaction
    }



    async user(){
        let output = await hydrate() 
        
        if (!output.status) return { status: false,  message: "Error retreiveing user"}
        return { status: true,  data: output.response } 
    }

    static async isAlive(){
        
        const cookie = await getData(api_origin_address)
        if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }
        apiHeaders.set('auth-session', cookie)

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

    async create(formData:userSignupDataTemplate){
        /* 
        check if invitation key is not null, validate it and use it to set account type; How?
        1. use a seperate api to check if the key is present in the registered organization. if its. return true else. false.
        if true: set account type to super-admin else to admin
        */
        let transaction;
        let accounttype: 'admin'|'super-admin' = 'admin'


        // set rules
        if (formData.invitation_key !== null){
            // parse and set to superadmin or ignore
            transaction = 'api-request'
            // if (transaction.status){
            //     accounttype = 'super-admin'
            // }
        }

        /* 
        Expected data at api
            firstname, lastname, email, password, organization, accounttype, organization_name, number
        */
        let userdata: userSignupDataTemplate = {
            accounttype: accounttype,
            email: formData.email,
            firstname: formData.firstname,
            lastname: formData.lastname,
            number: formData.number,
            organization: formData.organization,
            organization_name: formData.organization_name,
            password: formData.password,
            invitation_key: formData.invitation_key
        }

        transaction = await signupREQUEST(userdata)

        return transaction

        
    }

    async organizationMembers(query?:null|{ row: string, keyword: string }){

        let transaction;
        
        transaction = await GetRequestHandler({url: '/api/secure'})
        
        if (!transaction.status) return { status: false, message: "User collected is zero" }

        return { status: true, data: transaction.data  } 
    }


    async organizationTransactions(){

        let transaction;
        
        transaction = await GetRequestHandler({url: '/api/secure/transactions'})
        
        if (!transaction.status) return { status: false, message: "User collected is zero" }

        return { status: true, data: transaction.data  } 

    }

    async seekforAccount(userid:string){
        let transaction;
        transaction = await PostrequestHandler({url: '/api/service/find', data: { userid: userid }})
        
        if (!transaction.status) return null
        return transaction.data
         
    }

    async getMembersExpensesFromBudget(budget_id:string|null){
        if (!budget_id) return []

        let transaction = await PostrequestHandler({url: '/api/service/budget', data: { budget_id: budget_id }})



        if (!transaction.status) return []

        return transaction.data

    }


    async getMemberActivity(userid:string|null){

        console.log(userid);
        
        if (!userid) return []

        let transaction = await PostrequestHandler({url: '/api/service/transactions', data: { userid: userid }})

        if (!transaction.status) return []

        return transaction.data
    }

    async ManageSelectedBudget(budget_id: string|null, status: "pending" | "approved" | "declined" | "deleted"){
        if (!budget_id) return

        let transaction = await PostrequestHandler({url: '/api/secure/actions/managebudget', data: { budget_id: budget_id, status: status }})

        if (!transaction.status) return 

        return transaction
    }


    async ManageSelectedAccount(status: 'pending'| 'approved'| 'disabled'| 'deleted'| null, userid:string){

        if (!userid) return

        let transaction = await PostrequestHandler({url: '/api/secure/actions/manageuser', data: { userid: userid, status: status }})


        console.log(transaction);

        if (!transaction.status) return 
        

        return transaction

    }


}

export type unitUserType = {

  username: string,
  userid: string,
  updated_at: string,
  status: 'approved' | 'pending' | 'disabled' | "deleted",
  organization_name: string,
  organization: string,
  lastname: string,
  id: string,
  firstname: string,
  created_at: string,
  accounttype: string,
  data: any,
  email: string

}