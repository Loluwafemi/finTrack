import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User, type UserCredential, type userDataType } from '$lib/server/models/user';


// Note this is not the same as the user's signup endpoint. this is design for admins to signup, some parameters are removed
export const POST: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)
    
    // if(event.locals.session) {
    //     // console.log("session active");
    //     return json({ status: false, message: "Session is active. Try log out to continue this transaction."})
    // }

    const {firstname, lastname, email, password, organization, accounttype, organization_name, number, invitation_key} = await event.request.json()
    
    const username = `${firstname[0]}_${lastname}`

    const userCredential: UserCredential = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        username: username,
        accounttype: accounttype,        // use invitation key to know account type: default is admin
        invitation_key: invitation_key
    }
    
    const userData: userDataType = {
        bank_account_name: 'none',
        bank_account_number: 'none',
        bank_name: 'none',
        organization: organization,
        organization_name: organization_name,
        number: number
    }
    

    const userObj = new User()
    let transaction = await userObj.create_admin(userCredential, userData)

    if (transaction == undefined) return json({ status: false, message: "Something went wrong during transaction" })

    return json({ status: true, message: "Transaction successful" })
};