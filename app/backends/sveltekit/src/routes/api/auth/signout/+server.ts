import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { REQUESTAUTHENTICATOR } from '$lib';
import { User } from '$lib/server/models/user';
import { deleteSessionTokenCookie } from '$lib/server/auth';


export const POST: RequestHandler = async (event) => {
    
    REQUESTAUTHENTICATOR(event)

    // receive token
    const token = await event.request.json()
    
    // validate data

    // if (!transaction) return json({status: true, message: "Failed to signout"});
    // validate user's session




    

    // sign user in and redirect to /api

    return json({status: false, message: "Failed to signout"});
};
