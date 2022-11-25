import { NextApiRequest, NextApiResponse } from "next";
import { inspector } from "../../src/inspector";

export const inspectHandler = (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== 'POST') {
        response.status(405).send({});
        return;
    }
    inspector(request.body.url, request.body.name)
    return response.send({});
}

export default inspectHandler;
