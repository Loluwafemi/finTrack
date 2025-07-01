/*

This is an admin api
It fetches all account matching organization name
and if account type is system, it fetches all organization and individual


This request fetches accounts as follows:
    if user account type is admin.
        the fetch every account that is the same organization name
    else if user account type is super-admin do the same

    meaning for every organization there is admin and super admin

    Organization can be registered by either registering admin or any heirarichal admin such as super admin and system user



The structure of the whole secure api is:
// get
1. the account path request for: api/secure/account
    for account management
    super-admin/admin: every user whose organization is the same as the admin
    system: every account including the admins

// get
2. the api/secure:
    for dashboard
    request for every information of users whose organization name is the same.
    information such as:
        budgets
        users
        transactions
        etc
    all sorted by date-time descending

// post
3. the api/budget:
    for managing budget status:
    this request send 3 keys to the end point which is pivot by switch-case
    keys: status, sender, budget
    and the transactions goes as follows.
    1. the system checks if the sender-organization matches the userid in the budget
    2. if true proceed to transaction which is:
        transaction = await db.operation.on.budget
                            find transaction whose budget.id matches this id
                            if found.
                            update budget status to api-parsed-status


// get
4. the api/details


// get the admin data here:






*/

// get qll user's whose organization match the requester organization

import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Admin } from '$lib/server/models/admin';

export const GET: RequestHandler = async (event) => {
    
    
    REQUESTAUTHENTICATOR(event)

    let response

    response = {
        ...event.locals.user
    }
    const admin = new Admin()
    let transaction;
    transaction = await admin.admin(response.userid)    

    transaction = await admin.OrganizationAccounts(transaction?.data.organization_name)
        
    const responseOutput =  json({...transaction})    
    
    if (!transaction?.status) return responseOutput
    
    return responseOutput;
};

