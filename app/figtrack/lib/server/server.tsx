// define all api requests here
// dependencies for environment
// import CookieManager from '@react-native-cookies/cookies';

const backendORIGIN = "http://127.0.0.1:8080"
export const AUTH_ORIGIN = process.env.ALLOWED_ORIGIN?.split(',')

// api securities
export const apiHeaders = {
    'Authorization': 'Bearer',
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': "http://192.168.43.107:8081",
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'content-type, Authorization'
}


export async function signinREQUEST(data:any) {
    console.log(data);
    
    const request = await fetch(`${backendORIGIN}/api/auth/signin`, {
        headers: apiHeaders,
        body: JSON.stringify(data),
        method: 'POST'
    })
    

    const {status, message } = await request.json()
    

    if (status){
        // redirect to dashboard.
        // console.log("welcome");
        // console.log(message);

        // set cookies
        const setCookiesHeader = request.headers.get('set-cookie')
        console.log(setCookiesHeader);

        // if ( setCookiesHeader ) await storeData(setCookiesHeader)

        // check if cookies is true set


        
        return {
            status: true,
            message: "Valid Credential"
        }
    }else{
        return {
            status: false,
            message: "Invalid Credential"
        }
    }
    
}


const storeData = async (value:any) => {
  try {
    // await AsyncStorage.setItem('my-key', value);
  } catch (e) {
    // await CookieManager.setFromResponse(backendORIGIN, value);
    console.log("Couldnt save data");
    
  }
};

const getData = async () => {
        // const cookies = CookieManager.get(backendORIGIN).then((cookies) => {
        //   console.log('Cookies:', cookies);
        // });

        // console.log(cookies);

        // return cookies
}


export async function signouREQUEST(data:any) {
    // id is userid

    const request = await fetch(`${backendORIGIN}/api/auth/signout`, {
        headers: apiHeaders,
        body: JSON.stringify(data),
        method: 'POST'
    })

    
    const {status, message } = await request.json()

    if (status){
        // redirect to dashboard.
        return {
            status: true,
            message: "Valid Credential"
        }
    }else{
        return {
            status: false,
            message: "Invalid Credential"
        }
    }
    
}


export async function signupREQUEST(data:any) {
    const request = await fetch(`${backendORIGIN}/api/auth/signin`, {
        headers: apiHeaders,
        body: JSON.stringify(data),
        method: 'POST'
    })

    const res = await request.json()

    // if success, redirec to dashboard with user's session data

    // else remain

    // handle response to display to screen if error
    console.log(res);
    
    return new Response("DOne")
}


export async function SessionUser() {
    const request = await fetch(`${backendORIGIN}/api`, {
        headers: apiHeaders,
        method: 'GET'
    })

    
    const session = await request.json()

    console.log(session);
    

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
            message: "Invalid Credential"
        }
    }
}