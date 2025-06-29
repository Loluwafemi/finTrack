import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
    
    
    REQUESTAUTHENTICATOR(event)

    const response = {
        ...event.locals.user
    }    

    return json(response);
};

