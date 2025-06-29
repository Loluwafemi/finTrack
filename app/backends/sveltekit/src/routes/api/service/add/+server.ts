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

    console.log(data);
    
    
    // // insert senders data 
    // // loose data before insertion
    const budget = await user.addBudget(data, auth)

    if (!budget.status)  return json(budget)

    return json(budget);
};