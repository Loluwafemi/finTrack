import { User } from "$lib/server/models/user";
import type { LayoutServerLoad } from "./$types";




export const load = (async (event) => {
    const Users = new User();

    const user = await event.locals.user
    const session = await event.locals.session
    
    let transaction:any = await Users.users()    


    return {
        auth: await Users.users(user?.email),
        session: session,
        users: transaction
    };
}) satisfies LayoutServerLoad;