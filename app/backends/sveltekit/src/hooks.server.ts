import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

import { ALLOWED_ORIGIN, API_AUTHORIZATION } from '$env/static/private'

const handleAuth: Handle = async ({ event, resolve }) => {

	let allowed_origin = ALLOWED_ORIGIN.split(',')
	let cloneResponse = event.request.clone()
	let theOrigin = allowed_origin.find((value, index)=> value === cloneResponse.headers.get('origin')!)
	
	// handle all api request here
	if (event.url.pathname.startsWith('/api')) {	
		// Required for CORS to work
		if(cloneResponse.method === 'OPTIONS') {
			const response = await resolve(event);
			return new Response(response.body, {
				headers: {
				  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				  'Access-Control-Allow-Origin': theOrigin!,
				  'Access-Control-Allow-Headers': '*',
				  "Access-Control-Expose-Headers": "Authorization",

				},
				status: 200
			  });
		}


		if(event.request.method === 'POST') {
			const result = await resolve(event);

			let cloneResponse = result.clone()
			

			let resp = new Response(result.body, {
				headers: result.headers });
			resp.headers.set("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header, Set-Cookie, set-cookie")
			resp.headers.set("Access-Control-Expose-Headers", "X-Custom-header")
			resp.headers.set("content-type", "application/json")
			resp.headers.set('Access-Control-Allow-Credentials', "true")
			resp.headers.set('X-Custom-header', resp.headers.getSetCookie().toString())
			// console.log("res: ", resp);
			return resp
			
		}

		if(event.request.method === 'GET') {
			// add information from the event to the request
			// event.request.headers.set("Access-Control-Allow-Credentials", "true")			
			
			event.request.headers.set("Access-Control-Allow-Origin", theOrigin!)
			
			event.request.headers.set("Access-Control-Allow-Headers", `X-Custom-header, ${auth.sessionCookieName}`)

			event.request.headers.set("Access-Control-Expose-Headers", `X-Custom-header, ${auth.sessionCookieName}`)

			
			// cookie control
			if (!event.cookies.get(auth.sessionCookieName)) {
				event.cookies.set(auth.sessionCookieName!, event.request.headers.get(auth.sessionCookieName)!, 
				{ 
					path: '/api', 
					// httpOnly: true, 
					// partitioned: true 
				}
				)	
			}

			const sessionToken = event.cookies.get(auth.sessionCookieName);
			

			if (!sessionToken) {
				event.locals.user = null;
				event.locals.session = null;
				return  await resolve(event);
			}
			

			const { session, user } = await auth.validateSessionToken(sessionToken);

			if (session) {
				auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			} else {
				auth.deleteSessionTokenCookie(event);
			}

			event.locals.user = user;
			event.locals.session = session;
			

			const result = await resolve(event);
			
			let resp = new Response(result.body, {
				headers: result.headers });

			resp.headers.set("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header, Set-Cookie, set-cookie")
			resp.headers.set("Access-Control-Expose-Headers", "X-Custom-header")
			resp.headers.set("content-type", "application/json")
			resp.headers.set('Access-Control-Allow-Credentials', "true")
			resp.headers.set('X-Custom-header', resp.headers.getSetCookie().toString())

			return resp
		}	
	}
	
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return  await resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);


	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}


	event.locals.user = user;
	event.locals.session = session;
	return  await resolve(event);
};

export const handle: Handle = handleAuth;
