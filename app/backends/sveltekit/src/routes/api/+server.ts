import { REQUESTAUTHENTICATOR } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    
    
    const response = {
        ...event.locals.user
    }

    console.log("Only user: ", response);

    // return json(response);
};
// gateway for all request