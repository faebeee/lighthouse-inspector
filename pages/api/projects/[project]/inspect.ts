import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { assertAuth, assertMethod } from "../../../../src/server/lib/api-helpers";
import { auditRunnerForSites } from "../../../../src/server/utils/audit-runner-for-site";
import { getProjectById } from "../../../../src/server/lib/project";
import { getSitesByProject } from "../../../../src/server/lib/site";

export const inspectHandler: NextApiHandler = assertMethod("POST", async (request: NextApiRequest, response: NextApiResponse) => {
    const project = await getProjectById(parseInt(request.query.project as string));
    if (!project) {
        return response.status(404).send({});
    }
    const sites = await getSitesByProject(project);
    await auditRunnerForSites(sites);
    return response.send({});
});

export default assertAuth(inspectHandler);
