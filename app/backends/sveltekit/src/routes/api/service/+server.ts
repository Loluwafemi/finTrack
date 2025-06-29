import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/server/models/user';

export const POST: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    const { userid, status } = await event.request.json()

    if (!status) return json({ status: false, message: "Request failed from your end. Try validate your request" })
    
    const userObj = new User()
   let transaction;
   transaction = await userObj.find(userid, true)

   // transactions, records, user, activities
   const portfolio = {

   }

    const response = {
        ...event.locals.user
    }
    return json(response);
};
// gateway for all request