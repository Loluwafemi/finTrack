import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User, type UserCredential, type userDataType } from '$lib/server/models/user';

export const POST: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)
    
    // if(event.locals.session) {
    //     // console.log("session active");
    //     return json({ status: false, message: "Session is active. Try log out to continue this transaction."})
    // }

    const {firstname, lastname, email, password, organization, organizationname, organizationid, bank_name, bank_account_name, bank_account_number} = await event.request.json()

    const username = `${firstname[0]}_${lastname}`
    

    const userCredential: UserCredential = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        username: username,
        
    }
    
    const userData: userDataType = {
        bank_account_name: bank_account_name,
        bank_account_number: bank_account_number,
        bank_name: bank_name,
        organization: organization,
        number: '',
        organization_name: organizationname,
        organizationid: organizationid

    }

    console.log(userData);
    
    
    const userObj = new User()
    let transaction = await userObj.create(userCredential, userData)

    if (transaction == undefined) return json({ status: false, message: "Something went wrong during transaction" })

    return json({ status: true, message: "Transaction successful" })
};