import { apiHeaders, api_origin_address, backendORIGIN, getData, signinREQUEST, signouREQUEST, signupREQUEST } from "../server/server";

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

}