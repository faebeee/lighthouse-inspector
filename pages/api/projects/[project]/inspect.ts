import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { assertAuth, assertMethod } from "../../../../src/server/lib/api-helpers";
import { getProjectById } from "../../../../src/server/lib/project-services";
import { auditRunnerForProject } from "../../../../src/server/utils/audit-runner-for-project";

export const inspectHandler: NextApiHandler = assertMethod("POST", async (request: NextApiRequest, response: NextApiResponse) => {
    const project = await getProjectById(parseInt(request.query.project as string));
    if (!project || project.is_running) {
        response.send(404);
        return;
    }
    await auditRunnerForProject(project);

    return response.send({});
});

export default assertAuth(inspectHandler);
