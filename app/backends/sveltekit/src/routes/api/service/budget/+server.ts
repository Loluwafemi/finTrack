import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { Admin } from '$lib/server/models/admin';
import { json } from '@sveltejs/kit';
// import type { RequestHandler } from './expense/$types';
import { Budget } from '$lib/server/models/budget';
import type { RequestHandler } from '../$types';

export const POST: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    const { budget_id } = await event.request.json()
    
    if (!budget_id) return json({ status: false, message: "userid not define" })

    let transaction;

    const budgetObject = new Budget()
    transaction = await budgetObject.find(budget_id, true)

    if (!transaction.status) return json({ status: false, message: transaction.message })

    return json({ status: true, data: transaction.data })

};