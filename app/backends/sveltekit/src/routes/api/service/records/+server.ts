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
   transaction = await userObj.budgets(userid)

   if (!transaction.status) return json({ status: false, message: "Budget could not be fetch. Try add budgets" }) 
    // console.log(transaction);
       

    return json(transaction);
};
// gateway for all request