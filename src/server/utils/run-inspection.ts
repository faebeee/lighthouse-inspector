import { DESKTOP_CONFIG, inspector, MOBILE_CONFIG } from "./inspector";
import { format } from "date-fns";
import fs from "fs";
import { REPORTS_FOLDER } from "../../../config";
import { persistReport } from "../lib/lighthousereport-services";
import { Project } from "@prisma/client";
import { saveReportFile } from "../lib/minio";

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

    await Promise.all([
        saveReportFile(desktopFileHtml, desktopReports.html),
        saveReportFile(desktopFileJson, JSON.stringify(desktopReports.json)),
        saveReportFile(mobileFileHtml, mobileReports.html),
        saveReportFile(mobileFileJson, JSON.stringify(mobileReports.json)),
    ]);

    await persistReport(project, desktopReports.json, desktopFileHtml);
    await persistReport(project, mobileReports.json, mobileFileHtml);
}
