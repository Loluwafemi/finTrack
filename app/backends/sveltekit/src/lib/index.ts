import { error } from "@sveltejs/kit"
import type { RequestEvent } from "../routes/$types"



// keep only to the apis

const ALLOWED_ORIGIN = "http://192.168.43.107:8081, "
const AUTH_ORIGIN = ALLOWED_ORIGIN.split(',')
const API_AUTHORIZATION = 'Bearer'


// dependencies
// const apiHeaders = {
//     'Authorization':process.env.API_AUTHENTICATION!,
//     'content-type': 'application/json',
//     'Access-Control-Allow-Origin': process.env.SYSTEM_ORIGIN!,
//     'Access-Control-Allow-Methods': 'GET, POST',
//     'Access-Control-Allow-Headers': 'content-type, Authorization'
// }

// used by every endpoint
export const REQUESTAUTHENTICATOR = (event:any)=> {
    
    const Authorization = event.request.headers.get('Authorization')
    
    if(!Authorization) throw error(401, 'Authorization Fail. Token Not Found.')
    if(Authorization != API_AUTHORIZATION!) throw error(401, 'Authorization Fail. Token Not Match.')
    

    // origin validation
    const origin = event.request.headers.get('access-control-allow-origin')
    if(!AUTH_ORIGIN?.includes(origin!)) throw error(401, 'Origin Not Recognize. Keep Off.')
}