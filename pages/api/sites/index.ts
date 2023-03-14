import { NextApiRequest, NextApiResponse } from "next";
import { assertAuth } from "../../../src/server/lib/api-helpers";
import { getSites } from "../../../src/server/lib/site";

export const ProjectsHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'GET') {
        const sites = await getSites();
        response.send(sites);
        return;
    }
}

export default assertAuth(ProjectsHandler);
