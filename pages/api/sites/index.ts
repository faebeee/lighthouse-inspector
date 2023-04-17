import { NextApiRequest, NextApiResponse } from "next";
import { assertAuth } from "../../../src/server/lib/api-helpers";
import { getSites } from "../../../src/server/lib/site";
import {CACHE_VERY_SHORT} from "../../../config.web";

export const ProjectsHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'GET') {
        const sites = await getSites();
        response.setHeader(
          'Cache-Control',
          'public, s-maxage=30, stale-while-revalidate=59'
        );
        response.send(sites);
        return;
    }
}

export default assertAuth(ProjectsHandler);
