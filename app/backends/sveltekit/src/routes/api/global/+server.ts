import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return new Response();
};


// return all safe data plus auth