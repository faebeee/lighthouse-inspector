import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {assertMethod} from "../../../../src/server/lib/api-helpers";
import {getProjectById, markProjectAsRunning} from "../../../../src/server/lib/project-services";
import {runInspection} from "../../../../src/server/utils/run-inspection";

export const inspectHandler: NextApiHandler = assertMethod('POST', async (request: NextApiRequest, response: NextApiResponse) => {
    const project = await getProjectById(parseInt(request.query.project as string));
    if (!project || project.is_running) {
        response.send(404);
        return;
    }
    await markProjectAsRunning(project, true);
    try {
        await runInspection(project);
        await markProjectAsRunning(project, false);
    } catch (e) {
        await markProjectAsRunning(project, false);
        throw e;
    }

    return response.send({});
});

export default inspectHandler;
