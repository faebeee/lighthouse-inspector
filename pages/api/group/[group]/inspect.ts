import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { DESKTOP_CONFIG, inspector, MOBILE_CONFIG } from "../../../../src/server/utils/inspector";
import { assertMethod } from "../../../../src/server/lib/api-helpers";
import { REPORTS_FOLDER } from "../../../../config";
import fs from 'fs';
import { format } from "date-fns";
import path from 'path';
import { getProjectById, getProjectsByGroup } from "../../../../src/server/lib/project-services";
import { persistReport } from "../../../../src/server/lib/lighthousereport-services";
import { runInspection } from "../../../../src/server/utils/run-inspection";

export const inspectHandler: NextApiHandler = assertMethod('POST', async (request: NextApiRequest, response: NextApiResponse) => {
    const projects = await getProjectsByGroup(request.query.group as string)
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        await runInspection(project);
    }

    return response.send({});
});

export default inspectHandler;
