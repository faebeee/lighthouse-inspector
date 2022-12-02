import { getAllReports, getReport } from "./get-reports-for-project";
import { ReportResult } from "../../../pages/reports/[project]";

export const getReportsByProjectName = async (type: 'mobile' | 'desktop' = 'desktop'): Promise<Record<string, ReportResult[]>> => {
    const reports = await getAllReports();
    return reports
        .filter((r) => r.type === type)
        .reduce((acc, report) => {
            if (!acc[report.projectName]) {
                acc[report.projectName] = [];
            }
            acc[report.projectName].push(report);
            return acc;
        }, {} as Record<string, ReportResult[]>);
}
