import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { User } from '$lib/server/models/user';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    // sender: sender user id
    const {auth, data} = await event.request.json()
    
    // return object with status and message
    const user = new User()
    const findUserByID = await user.find(auth.userid)

    
    if (!findUserByID.status) return json(findUserByID)

    /* 
    send in the receipt to the db. 
    let the db look for the budget using the bid
    then let it search the expense_composition if 
        the expense category is found.
        if yes. collect the whole composition, edit the category's cost and 
        update the table.

        if no, return a status-message object
    
    */
    const budget = await user.uploadReceipt(data, auth)


    if (!budget.status){
        
        return json(budget)
    }else{
        
        return json(budget);        
    }

    
};