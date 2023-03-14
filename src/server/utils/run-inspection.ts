import { DESKTOP_CONFIG, inspector, MOBILE_CONFIG } from "./inspector";
import { format } from "date-fns";
import fs from "fs";
import { REPORTS_FOLDER } from "../../../config";
import { Site } from "@prisma/client";
import { saveReportFile } from "../lib/minio";
import { persistReport } from "../lib/report";

export const runInspection = async (site: Site) => {
    const desktopReports = await inspector(site.url, DESKTOP_CONFIG);
    const mobileReports = await inspector(site.url, MOBILE_CONFIG);

    const timestamp = format(new Date(), "yyyy-MM-dd-HHmmss");
    if (!fs.existsSync(REPORTS_FOLDER)) {
        fs.mkdirSync(REPORTS_FOLDER, { recursive: true });
    }
    const desktopFileHtml = `report_${ site.id }_desktop_${ timestamp }.html`;
    const desktopFileJson = `report_${ site.id }_desktop_${ timestamp }.json`;
    const mobileFileHtml = `report_${ site.id }_mobile_${ timestamp }.html`;
    const mobileFileJson = `report_${ site.id }_mobile_${ timestamp }.json`;

    await Promise.all([
        saveReportFile(desktopFileHtml, desktopReports.html),
        saveReportFile(desktopFileJson, JSON.stringify(desktopReports.json)),
        saveReportFile(mobileFileHtml, mobileReports.html),
        saveReportFile(mobileFileJson, JSON.stringify(mobileReports.json))
    ]);

    await persistReport(site, desktopReports.json, desktopFileHtml);
    await persistReport(site, mobileReports.json, mobileFileHtml);
};
