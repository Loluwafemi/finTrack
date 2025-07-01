import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { Admin } from '$lib/server/models/admin';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {


    REQUESTAUTHENTICATOR(event)

    let response

    response = {
        ...event.locals.user
    }
    const admin = new Admin()
    let transaction;
    transaction = await admin.admin(response.userid)    

    transaction = await admin.organizationTransactions(transaction?.data.organization_name)
        
    const responseOutput =  json({...transaction})    
    
    if (!transaction?.status) return responseOutput
    
    return responseOutput;
};