import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { Admin } from '$lib/server/models/admin';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {


    REQUESTAUTHENTICATOR(event)

    let response

    // make sure to differentiate between admin and system users

    response = {
        ...event.locals.user
    }



    const admin = new Admin()
    let transaction;
    transaction = await admin.admin(response.userid)    

    if (transaction?.accounttype == 'system') {

        transaction = await admin.organizationTransactions(null, true)
        
    }else{
        transaction = await admin.organizationTransactions(transaction?.data.organization_name, false)
        console.log("misxalled");
        
    }

 
    const responseOutput =  json({...transaction})  
    if (!transaction?.status) return responseOutput
    
    return responseOutput;
};