import { NextApiRequest, NextApiResponse } from "next";
import { assertAuth } from "../../../../../../src/server/lib/api-helpers";
import { getReportsForSite } from "../../../../../../src/server/lib/report";
import { getSiteById } from "../../../../../../src/server/lib/site";

export const projectHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "GET") {
        const project = await getSiteById(parseInt(request.query.site as string));
        if (!project) {
            response.status(404).send({});
            return;
        }
        const max = request.query.limit ? parseInt(request.query.limit as string) : 10;
        const reports = await getReportsForSite(project, request.query.type as string ?? "desktop", max);
        response.send(reports);
        return;

    }

};
export default assertAuth(projectHandler);
