import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { allowed, assertAuth } from "../../../src/server/lib/api-helpers";
import { getSites, getRunningSites, markSiteAsRunning } from "../../../src/server/lib/project-services";
import { runInspection } from "../../../src/server/utils/run-inspection";


const onPost = allowed("POST", async (request: NextApiRequest, response: NextApiResponse) => {
    const projects = await getSites();
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        await markSiteAsRunning(project, true);
        try {
            await runInspection(project);
        } catch {

        }
        await markSiteAsRunning(project, false);
    }

    return response.send({});
});

const onGet = allowed("GET", async (request: NextApiRequest, response: NextApiResponse) => {
    const projects = await getRunningSites();
    return response.send(projects);
});

export const inspectHandler: NextApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    await onPost(request, response);
    await onGet(request, response);
};

export default assertAuth(inspectHandler);
