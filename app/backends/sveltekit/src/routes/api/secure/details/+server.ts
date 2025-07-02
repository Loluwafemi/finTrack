import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { Admin } from '$lib/server/models/admin';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// get selected user and the user's budget: user profile display
export const POST: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    const { userid } = await event.request.json()


    console.log(userid);
    
    if (!userid) return json({ status: false, message: "userid not define found" })

    let transaction;

    const adminObject = new Admin()
    transaction = await adminObject.findMemberWithBudgetAndAcitivity(userid)

    if (!transaction.status) return json({ status: false, message: transaction.message })

    console.log(transaction);
    

return json({ status: true, data: transaction.data })
};