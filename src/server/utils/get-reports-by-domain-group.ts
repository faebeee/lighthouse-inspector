import { getAllReports } from "./get-reports-for-project";
import { ReportResult } from "../../../pages/reports/[project]";

export const getReportsByDomainGroup = async (type: 'mobile' | 'desktop' = 'desktop'): Promise<Record<string, ReportResult[]>> => {
    const reports = await getAllReports(true);
    return reports
        .filter((r) => r.type === type)
        .reduce((acc, report) => {
            const url = new URL(report.finalUrl)
            if (!acc[url.host]) {
                acc[url.host] = [];
            }
            acc[url.host].push(report);
            return acc;
        }, {} as Record<string, ReportResult[]>);
}
