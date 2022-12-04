import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { DESKTOP_CONFIG, inspector, MOBILE_CONFIG } from "../../../../src/server/utils/inspector";
import { assertMethod } from "../../../../src/server/lib/api-helpers";
import { REPORTS_FOLDER } from "../../../../config";
import fs from 'fs';
import { format } from "date-fns";
import path from 'path';
import { getProjectById } from "../../../../src/server/lib/project-services";
import { persistReport } from "../../../../src/server/lib/lighthousereport-services";

export const inspectHandler: NextApiHandler = assertMethod('POST', async (request: NextApiRequest, response: NextApiResponse) => {
    const project = await getProjectById(parseInt(request.query.project as string));
    if (!project) {
        response.send(404);
        return;
    }

    const desktopReports = await inspector(project.url, DESKTOP_CONFIG);
    const mobileReports = await inspector(project.url, MOBILE_CONFIG);

    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmmss');
    if (!fs.existsSync(REPORTS_FOLDER)) {
        fs.mkdirSync(REPORTS_FOLDER, { recursive: true });
    }
    const desktopFile = `report_${ project.id }_desktop_${ timestamp }.html`;
    const mobileFile = `report_${ project.id }_mobile_${ timestamp }.html`;
    fs.writeFileSync(path.join(REPORTS_FOLDER, desktopFile), desktopReports.html);
    fs.writeFileSync(path.join(REPORTS_FOLDER, mobileFile), mobileReports.html);

    await persistReport(project, desktopReports.json, desktopFile);
    await persistReport(project, mobileReports.json, mobileFile);

    return response.send({});
});

export default inspectHandler;
