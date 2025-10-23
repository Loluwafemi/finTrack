import { RECEIPT_SCANNER_DOMAIN } from '$env/static/private'
import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';


/* 
Broadcast the env.RECEIPT_SCANNER_DOMAIN
*/

export const GET: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    /* 
    check if the origin is active by running a surface get request
    Do not override or change the response structure as the app is dependent to it
    */

    const response = await fetch(RECEIPT_SCANNER_DOMAIN, {
        method: "GET",
        redirect: 'follow'
    }).then(async (response)=> {
        if (response.ok) {
            return json({domain: RECEIPT_SCANNER_DOMAIN, status: true});
        }else{
            return json({domain: RECEIPT_SCANNER_DOMAIN, status: false});
        }
    }).catch((e)=> {
            return json({domain: RECEIPT_SCANNER_DOMAIN, status: false, message: e});
    })
    
    return response
};