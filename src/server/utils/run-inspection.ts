import { DESKTOP_CONFIG, inspector, MOBILE_CONFIG } from "./inspector";
import { format } from "date-fns";
import fs from "fs";
import { REPORTS_FOLDER } from "../../../config";
import path from "path";
import { persistReport } from "../lib/lighthousereport-services";
import { Project } from "@prisma/client";

export const runInspection = async (project:Project) => {
    const desktopReports = await inspector(project.url, DESKTOP_CONFIG);
    const mobileReports = await inspector(project.url, MOBILE_CONFIG);

    const timestamp = format(new Date(), 'yyyy-MM-dd-HHmmss');
    if (!fs.existsSync(REPORTS_FOLDER)) {
        fs.mkdirSync(REPORTS_FOLDER, { recursive: true });
    }
    const desktopFileHtml = `report_${ project.id }_desktop_${ timestamp }.html`;
    const desktopFileJson = `report_${ project.id }_desktop_${ timestamp }.json`;
    const mobileFileHtml = `report_${ project.id }_mobile_${ timestamp }.html`;
    const mobileFileJson = `report_${ project.id }_mobile_${ timestamp }.json`;
    fs.writeFileSync(path.join(REPORTS_FOLDER, desktopFileHtml), desktopReports.html);
    fs.writeFileSync(path.join(REPORTS_FOLDER, desktopFileJson), JSON.stringify(desktopReports.json));
    fs.writeFileSync(path.join(REPORTS_FOLDER, mobileFileHtml), mobileReports.html);
    fs.writeFileSync(path.join(REPORTS_FOLDER, mobileFileJson), JSON.stringify(mobileReports.json));

    await persistReport(project, desktopReports.json, desktopFileHtml);
    await persistReport(project, mobileReports.json, mobileFileHtml);
}
