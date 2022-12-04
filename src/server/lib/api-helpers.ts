import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type Method = 'POST' | 'GET' | 'PUT' | 'UPDATE' | 'DELETE';

export const assertMethod = (method: Method, handler: NextApiHandler) => (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== method) {
        response.status(405).send({});
        return;
    }

    return handler(request, response);
}
