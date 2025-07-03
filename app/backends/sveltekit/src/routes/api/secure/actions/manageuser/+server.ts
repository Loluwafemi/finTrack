import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/server/models/user';

export const POST: RequestHandler = async (event) => {


    REQUESTAUTHENTICATOR(event)

    // fetches all transaction belonging to this user

    const { userid, status } = await event.request.json()
        
    if (!userid && !status) return json({ status: false, message: "Request failed from your end. Try again!" })
    
    const userObj = new User()
   let transaction;
   transaction = await userObj.manage(userid, status)

   console.log(transaction);
   
    
   if (!transaction.status) return json({ status: false, message: "Transactions could not be fetch. Try save some receipts" }) 

       
    return json(transaction);
};