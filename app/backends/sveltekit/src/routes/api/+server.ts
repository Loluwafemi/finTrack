import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Admin } from '$lib/server/models/admin';

export const GET: RequestHandler = async (event) => {
    
    
    REQUESTAUTHENTICATOR(event)
    const user = event.locals.user

    
    let response;
    
    response = {
        ...user
    }

    // change request if user is admin
    if(user?.accounttype !== 'user'){        
        let transaction = new Admin()
        transaction = await transaction.admin(user?.userid)

        response = {
            ...transaction
        }
    }

    if(!response){
        return json({ status: false, message: "Failed to get data" });
    }

    return json({ status: true, response });
};

