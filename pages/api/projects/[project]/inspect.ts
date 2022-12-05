import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { assertMethod } from "../../../../src/server/lib/api-helpers";
import { getProjectById } from "../../../../src/server/lib/project-services";
import { runInspection } from "../../../../src/server/utils/run-inspection";

export const inspectHandler: NextApiHandler = assertMethod('POST', async (request: NextApiRequest, response: NextApiResponse) => {
    const project = await getProjectById(parseInt(request.query.project as string));
    if (!project) {
        response.send(404);
        return;
    }
    await runInspection(project);

    return response.send({});
});

export default inspectHandler;
