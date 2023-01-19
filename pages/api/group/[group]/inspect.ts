import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { assertMethod } from "../../../../src/server/lib/api-helpers";
import { getProjectsByGroup, markProjectAsRunning } from "../../../../src/server/lib/project-services";
import { runInspection } from "../../../../src/server/utils/run-inspection";

export const inspectHandler: NextApiHandler = assertMethod("POST", async (request: NextApiRequest, response: NextApiResponse) => {
    const projects = await getProjectsByGroup(request.query.group as string);
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        await markProjectAsRunning(project, true);
        try {
            await runInspection(project);
        } catch {

        }
        await markProjectAsRunning(project, false);
    }

    return response.send({});
});

export default inspectHandler;
