import fs from "fs";
import { getReportFilesForProject } from "./get-reports-for-project";
import { LighthouseReport } from "../../../types/lighthouse";

export const getLatestReport = async (project: string, type: string): Promise<LighthouseReport | null> => {
    const reports = await getReportFilesForProject(project);
    const sortedReports = reports.reverse();
    const rep: Record<string, LighthouseReport> = {};
    for (let i = 0; i < sortedReports.length; i++) {
        const file = sortedReports[i];
        rep[file] = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' })) as LighthouseReport;
    }
    return Object.values(rep)
        .reverse()
        .reduce((acc, report) => {
            if (report.configSettings.formFactor === type) {
                return report;
            }
            return acc;
        }, null as (LighthouseReport | null));
}
