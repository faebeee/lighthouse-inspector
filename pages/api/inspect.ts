import { NextApiRequest, NextApiResponse } from "next";
import { DESKTOP_CONFIG, inspector, MOBILE_CONFIG } from "../../src/server/utils/inspector";

export const inspectHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== 'POST') {
        response.status(405).send({});
        return;
    }
    await inspector(request.body.url, request.body.name, DESKTOP_CONFIG)
    await inspector(request.body.url, request.body.name, MOBILE_CONFIG)
    return response.send({});
}

export default inspectHandler;
