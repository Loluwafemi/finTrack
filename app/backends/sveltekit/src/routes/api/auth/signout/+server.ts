import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { REQUESTAUTHENTICATOR } from '$lib';
import { User } from '$lib/server/models/user';
import { deleteSessionTokenCookie } from '$lib/server/auth';


export const POST: RequestHandler = async (event) => {
    
    REQUESTAUTHENTICATOR(event)

    try {
        console.log(event);
        
        deleteSessionTokenCookie(event)
    } catch (error) {
        console.log(error);
        
        return json({status: false, message: "Session fail to ended"})
    }    

    // sign user in and redirect to /api

    return json({status: true, message: "Session has ended"});
};
