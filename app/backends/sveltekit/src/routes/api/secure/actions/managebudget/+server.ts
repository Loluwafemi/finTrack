import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Admin } from '$lib/server/models/admin';

export const POST: RequestHandler = async (event) => {


    REQUESTAUTHENTICATOR(event)

    // fetches all transaction belonging to this user

    const { budget_id, status } = await event.request.json()
        
    console.log(budget_id, status);
    

    if (!budget_id && !status) return json({ status: false, message: "Request failed from your end. Try again!" })
    
    
    const userObj = new Admin()
   let transaction;
   transaction = await userObj.manageSelectedBudget(budget_id, status)

    console.log(transaction);
    
   if (!transaction.status) return json({ status: false, message: "Transactions could not be fetch. Try save some receipts" }) 

       
    return json(transaction);
};