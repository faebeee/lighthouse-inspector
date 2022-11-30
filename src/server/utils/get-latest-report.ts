import fs from "fs";
import { getReportFilesForProject, getReportsForProject } from "./get-reports-for-project";

export const getLatestReport = async (project: string, type: string): Promise<LH.RunnerResult> => {
    const reports = await getReportFilesForProject(project);
    const sortedReports = reports.reverse();
    const rep: Record<string, LH.RunnerResult> = {};
    for (let i = 0; i < sortedReports.length; i++) {
        const file = sortedReports[i];
        rep[file] = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
    }
    return Object.values(rep)
        .reduce((acc, report) => {
            if (report.configSettings.formFactor === type) {
                return report;
            }
            return acc;
        }, null as LH.RunnerResult);
}
