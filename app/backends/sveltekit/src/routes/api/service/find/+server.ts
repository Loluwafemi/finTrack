import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { Admin } from '$lib/server/models/admin';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/server/models/user';

export const POST: RequestHandler = async (event) => {


    REQUESTAUTHENTICATOR(event)

    const { userid } = await event.request.json()

    
    if (!userid) return json({ status: false, message: "userid not define" })

    let transaction;

    const adminObject = new User()
    transaction = await adminObject.find(userid, true)

    if (!transaction.status) return json({ status: false, message: transaction.message })

    return json({ status: true, data: transaction.data })

};