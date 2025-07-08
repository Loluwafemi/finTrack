import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/server/models/user';

export const GET: RequestHandler = async (event) => {
    
    
    REQUESTAUTHENTICATOR(event)
    const user = event.locals.user

    
    let response;


    const userObj = new User()
    
    let transaction = await userObj.get(user?.userid!, 'data')

            
    console.log(transaction);
    

    response = {
        ...transaction
    }

    if(!response){
        return json({ status: false, message: "Failed to get data" });
    }

    return json({ status: true, ...response });
};