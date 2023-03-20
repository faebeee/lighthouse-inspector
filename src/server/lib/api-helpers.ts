import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export type Method = "POST" | "GET" | "PUT" | "UPDATE" | "DELETE";

export const assertMethod = (method: Method, handler: NextApiHandler) => (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== method) {
        response.status(405).send({});
        return;
    }

    return handler(request, response);
};

export const allowed = (method: Method, handler: NextApiHandler): NextApiHandler => (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === method) {
        return handler(request, response);
    }
};

export const assertAuth = (handler: NextApiHandler) => async (request: NextApiRequest, response: NextApiResponse) => {
    const session = await getServerSession(request, response, authOptions);
    if (!session) {
        response.status(401).send({});
        return;
    }

    return handler(request, response);
};


export const createHandler = (methods: NextApiHandler[]) =>async (request: NextApiRequest, response: NextApiResponse) => {
    for (let i = 0; i < methods.length; i++) {
        const methodHandler = methods[i];
        await methodHandler(request, response);
    }
};
