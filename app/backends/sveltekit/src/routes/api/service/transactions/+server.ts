import { REQUESTAUTHENTICATOR } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/server/models/user';

export const POST: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    // fetches all budgets with its expenses

    const { userid } = await event.request.json()
        

    if (!userid) return json({ status: false, message: "Request failed from your end. Try authenticate!" })
    
    const userObj = new User()
   let transaction;
   transaction = await userObj.transactions(userid)
   

   if (!transaction.status) return json({ status: false, message: "Transactions could not be fetch. Try save some receipts" }) 

       
    return json(transaction);
};