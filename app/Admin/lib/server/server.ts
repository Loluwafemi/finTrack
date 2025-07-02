// import * as SecureStore from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv'
import { userSignupDataTemplate } from '../auth'


const BACKEND_ORIGIN = process.env.EXPO_PUBLIC_BACKEND_ORIGINS
const ORIGIN_ADDRESS = process.env.EXPO_PUBLIC_ORIGIN
const API_AUTHORIZATION = process.env.EXPO_PUBLIC_API_AUTHORIZATION
const PUBLIC_HOST_ADDR = process.env.EXPO_PUBLIC_HOST_ADDR



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

// export const backendORIGIN = "http://127.0.0.1:8080"

export const backendORIGIN = BACKEND_ORIGIN
export const api_origin_address = ORIGIN_ADDRESS
export const AUTH_ORIGIN = process.env.ALLOWED_ORIGIN?.split(',')

// api securities
export const apiHeaders = new Map()

apiHeaders.set("Authorization", API_AUTHORIZATION)
apiHeaders.set("content-type", "application/json")
apiHeaders.set("Access-Control-Allow-Origin", "http://192.168.43.107:8081")
apiHeaders.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
apiHeaders.set("Access-Control-Allow-Headers", "Authorization,X-PINGOTHER,X-Requested-With,Content-Type,Accept,X-Custom-header")
apiHeaders.set("Access-Control-Expose-Headers", "Authorization, X-Custom-header")
apiHeaders.set('Access-Control-Allow-Credentials', "true");
apiHeaders.set('Accept', "*/*");
apiHeaders.set("Origin", PUBLIC_HOST_ADDR)



const storage = new MMKV({
    id: '',
    // encryptionKey: '',           // not supported by web
    // path: '',                        //same
    readOnly: true
})

export const storeData = async (key:any, value:any) => {
    /* 
    Generated: 
    auth-session=Uk6pnst0TP9FY_1zokEweyKG; Path=/; Expires=Wed, 30 Jul 2025 05:13:54 GMT; HttpOnly; Secure; SameSite=Lax
    
    Needed: Uk6pnst0TP9FY_1zokEweyKG
    */

    function getCookie(name: string): string | undefined {
        let output;
        const ca = value.split(';');
        for (let i = 0; i < 1; i++) {
          let c = ca[i];
          c = c.split('=')
          output = c[1]
          return output
        }
        return undefined;
      }
    let tailored:string|undefined = getCookie(value)
    
    try {
        storage.set(key, tailored!)
        console.log("cookies has been set");
        
    } catch (e) {
    //   console.log("Error:", e);
      
      console.log("Couldnt save data");
      
    }
};

export const getData = async (key:any) => {
    // let result = await SecureStore.getItemAsync(key);

    let result = await storage.getString(key);
    if (result) {
        // console.log("🔐 Here's your value 🔐 \n" + result);
        return result;
      } else {
        // console.log('No values stored under that key.');
      }
};

export const deleteCookie = async (key:any) => {
    await storage.delete(key);
};


// use this to manage all request
export async function PostrequestHandler(path:{ url: null|string,  data: any }) {

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


export async function GetRequestHandler(path:{ url: null|string }) {
    const cookie = await getData(api_origin_address)
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }  

    console.log(path);
    
    if (!path.url) return {
        status: false,
        message: "Path url to request not set",
        data: null
        }

    const request = await fetch(`${backendORIGIN}${path.url}`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        method: 'GET',
        redirect: 'follow',
    })


    const responseClone = request.clone()

    const session = await responseClone.json()   

    
    if (session){
        // redirect to dashboard.
        return {
            status: true,
            message: "Valid Credential",
            ...session
        }
    }else{
        return {
            status: false,
            message: "Invalid Credential",
            data: null
        }
    }
}



export async function signinREQUEST(data:any) {

    console.log(Object.fromEntries(apiHeaders.entries()));
    
    // check if cookie is set
    const cookie = await getData(api_origin_address)
    
    if (cookie !== undefined) return { status: false, message: "cookie set. Try deauthenticate first" } 

    try {
        
        const response = await fetch(`${backendORIGIN}/api/auth/signin`, {
            headers: Object.fromEntries(apiHeaders.entries()),
            body: JSON.stringify(data),
            method: 'POST',
            // credentials: 'same-origin',
            redirect: 'follow'
        })
        
        const responseClone = response.clone()


        let output = responseClone

    
        
        
        if (!output.ok) {
            return {

                status: false,
                message: "Invalid Credential. Response not ok",
                cookies: null
        }
        }

        
        const {status, message } = await output.json()    
        
        console.log(output);
            

        if (status){
            
            const cookies = output.headers.get('X-Custom-header')?.toString()
                        
            
            await storeData(api_origin_address, cookies)
            // await getData(api_origin_address)   
            
            return {
                status: true,
                message: "Valid Credential " + message,
                response: message
            }
        }else{
            return {
                status: false,
                message: "Invalid Credential, response okay. Something went wrong",
                cookies: null,
                response: message
            }
        }
    
    } catch (error) {
        // console.log("error: ", error);
        return {
            status: false,
            message: "Invalid Credential. Caught an error",
            cookies: null,
            error
        }
        
    }

    
};



export async function optionREQUEST(data:any) {
    
    try {
        apiHeaders.set("Status-Code", 200)
        
        const request = await fetch(`${backendORIGIN}/api/auth/options`, {
            headers: Object.fromEntries(apiHeaders.entries()),
            body: JSON.stringify(data),
            method: 'OPTIONS',
            credentials: 'same-origin',
            redirect: 'follow'
            
        })

        
        const responseClone = request.clone()
                

        if (!responseClone.ok) return {

            status: false,
            message: "Invalid Credential. Response not ok",
            cookies: null
        }

        return {
            status: true,
            message: "Valid Credential, response okay.Ready for operation",
            cookies: null
        }
        
    
    } catch (error) {
        // console.log("error: ", error);
        return {
            status: false,
            message: "Invalid Credential. Caught an error",
            cookies: null,
            error: error
        }
        
    }

    
};


export async function SessionUser() {
    
    // check if cookie is set
    const cookie = await getData(api_origin_address)
    
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }

    const request = await fetch(`${backendORIGIN}/api`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        method: 'GET',
        // credentials: 'same-origin'
        redirect: 'follow'
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



export async function signouREQUEST(data?:any) {
    // id is userid
    // use session data to signout
    let session = await SessionUser()

    const cookie = await getData(api_origin_address)
    
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }

    // apiHeaders.set('Cookie', cookie)

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
        console.log("session has ended");
        console.log("session: ", session);
        
        
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

export async function signupREQUEST(data:userSignupDataTemplate) {
    const cookie = await getData(api_origin_address)
    
    if (cookie !== undefined) return { status: false, message: "cookie already set. Try de-authenticate first" }

    // breaking incoming data
    const request = await fetch(`${backendORIGIN}/api/secure/signup`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        body: JSON.stringify(data),
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


// export async function saveBudget(payload: {auth: any, data: any}) {

//     const cookie = await getData(api_origin_address)
    
//     if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }

//     // breaking incoming data
//     const request = await fetch(`${backendORIGIN}/api/service/add`, {
//         headers: Object.fromEntries(apiHeaders.entries()),
//         body: JSON.stringify(payload),
//         method: 'POST',
//         credentials: 'same-origin'
//     })
    
//     const responseClone = request.clone()
    
//     const {status, message} = await responseClone.json()    

//     // console.log(status, message);
    
//     if (status){     
        
//         return {
//             status: true,
//             message: "Transaction successful",
//         }
//     }else{
//         return {
//             status: false,
//             message: message,
//             cookies: null
//         }
//     }


// }


export async function hydrate() {
    const cookie = await getData(api_origin_address)
    if (cookie === undefined) return { status: false, message: "cookie not set. Try authenticate first" }    

    const request = await fetch(`${backendORIGIN}/api`, {
        headers: Object.fromEntries(apiHeaders.entries()),
        method: 'GET',
        redirect: 'follow'
    })
    const session = await request.json()    
        
    return session
}
