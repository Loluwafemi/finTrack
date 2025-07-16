// define all api requests here
// dependencies for environment
import * as SecureStore from 'expo-secure-store';


const BACKEND_ORIGIN_ADDR = process.env.EXPO_PUBLIC_BACKEND_ORIGINS
const ORIGIN = process.env.EXPO_PUBLIC_ORIGIN
const API_AUTHORIZATION = process.env.EXPO_PUBLIC_API_AUTHORIZATION
const HOST_ADDRESS = process.env.EXPO_PUBLIC_HOST_ADDR

// process.env.

interface userDataType {
    organization: 'string',
    bank_name: string,
    bank_account_number: string,
    bank_account_name: string,
    firstname: string | null,
    lastname: string | null,
    // username: string | null,
    email: string | null,
    password: string | null
}

export const backendORIGIN = BACKEND_ORIGIN_ADDR

export const api_origin_address = ORIGIN

export const AUTH_ORIGIN = process.env.ALLOWED_ORIGIN?.split(',')

export const host_address = HOST_ADDRESS

// api securities
export const apiHeaders = new Map()

apiHeaders.set("Authorization", API_AUTHORIZATION)
apiHeaders.set("content-type", "application/json")
// apiHeaders.set("Access-Control-Allow-Origin", "http://192.168.43.107:8081")
apiHeaders.set("Access-Control-Allow-Methods", "GET, POST")
apiHeaders.set("Access-Control-Allow-Headers", "content-type, Authorization")
apiHeaders.set("Origin", host_address)

/* 
assign custom header that represent origin
this origin is a sub-address of the backend address
api_origin_address-fintrack
*/



export const storeData = async (key:any, value:any) => {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log("cookies has been set");
        
    } catch (e) {
      console.log(e);
      
      console.log("Couldnt save data");
      
    }
};

export const getData = async (key:any) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
        console.log("🔐 Here's your value 🔐 \n" + result);
      } else {
        console.log('No values stored under that key.');
      }
};

export const deleteCookie = async (key:any) => {
    await SecureStore.deleteItemAsync(key);
};

export async function signinREQUEST(data:any) {

    try {
        
        const request = await fetch(`${backendORIGIN}/api/auth/signin`, {
            headers: Object.fromEntries(apiHeaders.entries()),
            body: JSON.stringify(data),
            method: 'POST',
            credentials: 'same-origin'
        })        
        
        const responseClone = request.clone()        

        if (!responseClone.ok) {

            return {

                status: false,
                message: "Invalid Credential",
                cookies: null
        }        

        }
        
        const {status, message } = await responseClone.json()
        
        
        
        if (status){
            
            const cookies = responseClone.headers.get('set-cookie')
            // console.log(typeof cookies);
            if (cookies !== null && cookies !== undefined) {
                await storeData(api_origin_address, cookies)
                await getData(api_origin_address)   
            }            

            
            return {
                status: true,
                message: "Valid Credential " + message,
            }
        }else{
            return {
                status: false,
                message: "Invalid Credential",
                cookies: null
            }
        }
    
    } catch (error) {
        console.log("error: ", error);
        return {
            status: false,
            message: "Invalid Credential",
            cookies: null
        }
        
    }

    
};

export async function signouREQUEST(data?:any) {
    // id is userid
    // use session data to signout
    let session = await SessionUser()

    const cookie = await getData(api_origin_address)
    
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }

    apiHeaders.set('Cookie', cookie)

    if (session.data == null) return { status: false, message: "Session does not exist" }

    session = session.data
    

    const request = await fetch(`${backendORIGIN}/api/auth/signout`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        body: JSON.stringify(session),
        method: 'POST',
        credentials: 'same-origin'
    })

    await deleteCookie(api_origin_address)
    
    const responseClone = request.clone()
    const {status, message } = await responseClone.json()   
    
    if (status){
        // redirect to dashboard.
        // console.log("session has ended");
        // console.log("session: ", session);
        
        
        return {
            status: true,
            message: "Session has ended",
        }
    }else{
        return {
            status: false,
            message: "Fail to end session. Something went wrong",
        }
    }
    
}

export async function signupREQUEST(data:any) {

    
    const cookie = await getData(api_origin_address)
    
    if (cookie !== undefined) return { status: false, message: "cookie already set. Try de-authenticate first" }


    // breaking incoming data
    

    const tailoredData:userDataType|any = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        bank_account_name: data.accountname,
        bank_account_number: data.accountnumber,
        bank_name: data.bank,
        organization: data.organization,
        organizationname: data.organizationname || data.organization,
        organizationid: data.organizationid || data.organization
    }

    
    
    const request = await fetch(`${backendORIGIN}/api/auth/signup`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        body: JSON.stringify(tailoredData),
        method: 'POST',
        credentials: 'same-origin'
    })

    

    const responseClone = request.clone()
    const {status, message} = await responseClone.json()    


    if (status){     

        
        
        return {
            status: true,
            message: "Transaction successful",
        }
    }else{
        return {
            status: false,
            message: message,
            cookies: null
        }
    }
    
}

export async function SessionUser() {
    
    // check if cookie is set
    const cookie = await getData(api_origin_address)
    
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }    

    apiHeaders.set('Cookie', cookie)

    const request = await fetch(`${backendORIGIN}/api`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        method: 'GET',
        credentials: 'same-origin'
    })
    
    const responseClone = request.clone()
    const session = await responseClone.json()    

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


export async function saveBudget(payload: {auth: any, data: any}) {

    const cookie = await getData(api_origin_address)
    
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }
    
    // breaking incoming data
    const request = await fetch(`${backendORIGIN}/api/service/add`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        body: JSON.stringify(payload),
        method: 'POST',
        credentials: 'same-origin'
    })    
    


    const {status, message} = await request.json()    

    if (status){     
        
        return {
            status: true,
            message: "Transaction successful",
        }
    }else{
        return {
            status: false,
            message: message,
            cookies: null
        }
    }


}

export async function requestHandler(path:{ 
                                        url: null|string, 
                                        data: any
                                    }) {
    
    // check if cookie is set
    const cookie = await getData(api_origin_address)
    
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }    

    apiHeaders.set('Cookie', cookie)
    
    if (!path.url) return {
            status: false,
            message: "Path url to request not set",
            data: null
        }


    const request = await fetch(`${backendORIGIN}${path.url}`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        method: 'POST',
        body: JSON.stringify(path.data),
        credentials: 'same-origin'
    })
    

    const responseClone = request.clone()
    const sessionData = await responseClone.json()    

    if (sessionData){
        // redirect to dashboard.
        return {
            status: true,
            message: "Valid Credential",
            ...sessionData
        }
    }else{
        return {
            status: false,
            message: "Invalid Credential",
            data: null
        }
    }
}


export async function GetrequestHandler(path:{ 
                                        url: null|string, 
                                    }): Promise<{ 
                                        status:boolean,
                                        message?: string,
                                        data?: any }> {
    
    // check if cookie is set
    const cookie = await getData(api_origin_address)
    
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }    

    apiHeaders.set('Cookie', cookie)
    
    if (!path.url) return {
            status: false,
            message: "Path url to request not set",
        }


    const request = await fetch(`${backendORIGIN}${path.url}`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        method: 'GET',
        credentials: 'same-origin'
    })
    

    const responseClone = request.clone()
    const sessionData = await responseClone.json()    

    if (sessionData){
        // redirect to dashboard.
        return {
            status: true,
            message: "Valid Credential",
            ...sessionData
        }
    }else{
        return {
            status: false,
            message: "Invalid Credential",
            data: null
        }
    }
}