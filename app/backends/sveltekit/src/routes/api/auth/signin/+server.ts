import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { REQUESTAUTHENTICATOR } from '$lib';
import { User } from '$lib/server/models/user';
import { generateSessionToken } from '$lib/server/auth';
import { createSession, setSessionTokenCookie } from '$lib/server/auth';

export const POST: RequestHandler = async (event) => {
    
    REQUESTAUTHENTICATOR(event)


    // redirect if user tried to signin when session is active
    if(event.locals.session) {
        console.log("session active");
        
        return redirect(308, '/api/auth')
    }
    
    const { email, password } = await event.request.json()
    
    // validate data
    if (!email && !password) return json({  status: false, message: "Missing Parameter"})    
    // sign user in and redirect to /api

    // validat user
    const UserModel = new User()
    let transaction:any = await UserModel.validate(email, password)
    
    if (!transaction){
        console.log("user not exist");
        return json({  status: false, message: "Authentication error \nAccount does not exist"})
    }

    console.log(transaction);
    

    const token = generateSessionToken();
    const session = await createSession(token, transaction.userid);
    setSessionTokenCookie(event, token, session.expiresAt);

    console.log(session);
    
    
    // check if authentication is successful then redirect to /api
    
    return json({status: true, message: "Authentication Successful"});
    
};
