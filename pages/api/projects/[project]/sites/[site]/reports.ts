import { NextApiRequest, NextApiResponse } from "next";
import { assertAuth } from "../../../../../../src/server/lib/api-helpers";
import { getReportsForSite } from "../../../../../../src/server/lib/report";
import { getSiteById } from "../../../../../../src/server/lib/site";
import {CACHE_VERY_SHORT} from "../../../../../../config.web";

export const projectHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "GET") {
        const project = await getSiteById(parseInt(request.query.site as string));
        if (!project) {
            response.status(404).send({});
            return;
        }
        const max = request.query.limit ? parseInt(request.query.limit as string) : 10;
        const reports = await getReportsForSite(project, request.query.type as string ?? "desktop", max);

        response.setHeader('Cache-Control', `s-maxage=${CACHE_VERY}`)
        response.send(reports);
        return;

    }

};
export default assertAuth(projectHandler);
