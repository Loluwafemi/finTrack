import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { REQUESTAUTHENTICATOR } from '$lib';

export const GET: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    if(!event.locals.session) return json({status: false, message: "Authentication required!", tips: "use '/api/auth/signin' or '/api/auth/signup' to authenticate \n or '/api/auth/signout'"});

    // get user data with session data and return
    const user = event.locals.user
    const session = event.locals.session

    const response = new Response("Auth root")

    // console.log(response);
    

    return response;
};