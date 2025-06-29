
import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { User } from '$lib/server/models/user';
import { ALLOWED_ORIGIN, API_AUTHORIZATION } from '$env/static/private'




export const OPTIONS: RequestHandler = async (event) => {
    
    REQUESTAUTHENTICATOR(event)

    const cloneResponse = event.request.clone()

	let allowed_origin = ALLOWED_ORIGIN.split(',')
	let theOrigin = allowed_origin.find((value)=> value === cloneResponse.headers.get('origin')!)

    return json({status: "Ready"})


};