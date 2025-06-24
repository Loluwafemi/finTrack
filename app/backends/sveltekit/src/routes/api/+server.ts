import { REQUESTAUTHENTICATOR } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    // redirect if session is not active when user tries to use session
    // if(!event.locals.session) {
    //     return json({
    //         status: false,
    //         message: "Session not active. Try Authenticate first!"
    //     })
    // }
        
    /* 
    1.  Fetch user's data
    2. paginate transactions. 10/20/nx10 per request
    */
    const response = {
        user: event.locals.user
    }
    return json(response);
};
// gateway for all request