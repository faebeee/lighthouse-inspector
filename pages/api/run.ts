import {NextApiRequest, NextApiResponse} from "next";
import {runner} from "../../src/server/utils/runner";

export const runHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== 'POST') {
        response.status(405).send({});
        return;
    }
    await runner()
    return response.send({});
}

export default runHandler;
