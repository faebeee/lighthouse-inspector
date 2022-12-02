import { Layout } from "../../../src/components/layout";
import { getReportsByDomainGroup } from "../../../src/server/utils/get-reports-by-domain-group";
import { GetServerSideProps } from "next";
import { getProjects } from "../../../src/server/utils/get-projects";
import { ReportResult } from "../../reports/[project]";
import { Stack } from "@mui/system";
import { ReportGrid } from "../../../src/components/report-grid";

export type DomainPageProps = {
    desktopReports: Record<string, ReportResult[]>;
    mobileReports: Record<string, ReportResult[]>;
    projects: string[];
    domain: string;
}
export const getServerSideProps: GetServerSideProps = async (req) => {
    const reports = (await getReportsByDomainGroup())[req.query.domain as string];
    const latestReportPerUrl = reports
        .reverse()
        .reduce((acc, report) => {
            if (acc[report.finalUrl]) {
                return acc;
            }
            acc[report.finalUrl] = [ report ];
            return acc;
        }, {} as Record<string, ReportResult[]>);

    const mobileReports = (await getReportsByDomainGroup('mobile'))[req.query.domain as string];
    const latestMobileReportPerUrl = mobileReports
        .reverse()
        .reduce((acc, report) => {
            if (acc[report.finalUrl]) {
                return acc;
            }
            acc[report.finalUrl] = [ report ];
            return acc;
        }, {} as Record<string, ReportResult[]>);

    const projects = await getProjects();
    return {
        props: {
            domain: req.query.domain,
            projects,
            desktopReports: latestReportPerUrl,
            mobileReports: latestMobileReportPerUrl,
        }
    }
}
export const DomainPage = ({ projects, desktopReports, mobileReports, domain }: DomainPageProps) => {
    return <Layout projects={ projects } title={ domain }>
        <Stack spacing={ 4 }>
            <ReportGrid title={ 'Desktop' } reports={ desktopReports }/>
            <ReportGrid title={ 'Mobile' } reports={ mobileReports }/>
        </Stack>
    </Layout>
}
export default DomainPage;
