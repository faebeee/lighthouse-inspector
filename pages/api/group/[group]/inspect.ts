import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { assertAuth, assertMethod } from "../../../../src/server/lib/api-helpers";
import { getProjectsByGroup } from "../../../../src/server/lib/project-services";
import { auditRunnerForProjects } from "../../../../src/server/utils/audit-runner-for-project";

export const inspectHandler: NextApiHandler = assertMethod("POST", async (request: NextApiRequest, response: NextApiResponse) => {
    const projects = await getProjectsByGroup(request.query.group as string);
    await auditRunnerForProjects(projects);
    return response.send({});
});

export default assertAuth(inspectHandler);
