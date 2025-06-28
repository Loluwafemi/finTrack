import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


/* 

The whole system api architecture
root.

every api needs session.
user session must be active to use other api
else system redirect user to api/auth/signin



1. Handle all request securely

*/


export const GET: RequestHandler = async (event) => {

    if(!event.locals.session) return json({status: false, message: "Authentication required!"});

    // get user data with session data and return
    const user = event.locals.user
    const session = event.locals.session

    const response = new Response()

    
    return json(user);
};