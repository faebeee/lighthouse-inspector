import { Layout } from "../../../src/components/layout";
import { getReportsByDomainGroup } from "../../../src/server/utils/get-reports-by-domain-group";
import { GetServerSideProps } from "next";
import { getProjects } from "../../../src/server/utils/get-projects";
import { ReportResult } from "../../reports/[project]";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, CardContent } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export type DomainPageProps = {
    desktopReports: ReportResult[];
    mobileReports: ReportResult[];
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
            acc[report.finalUrl] = report;
            return acc;
        }, {} as Record<string, ReportResult>);

    const mobileReports = (await getReportsByDomainGroup('mobile'))[req.query.domain as string];
    const latestMobileReportPerUrl = mobileReports
        .reverse()
        .reduce((acc, report) => {
            if (acc[report.finalUrl]) {
                return acc;
            }
            acc[report.finalUrl] = report;
            return acc;
        }, {} as Record<string, ReportResult>);

    const projects = await getProjects();
    return {
        props: {
            domain: req.query.domain,
            projects,
            desktopReports: Object.values(latestReportPerUrl),
            mobileReports: Object.values(latestMobileReportPerUrl),
        }
    }
}
export const DomainPage = ({ projects, desktopReports, mobileReports, domain }: DomainPageProps) => {

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'date', flex: 1 },
        { field: 'finalUrl', headerName: 'Url', flex: 2 },
        { field: 'performance', headerName: 'performance', flex: 1 },
        { field: 'accessibility', headerName: 'accessibility', flex: 1 },
        { field: 'bestPractices', headerName: 'bestPractices', flex: 1 },
        { field: 'seo', headerName: 'seo', flex: 1 },
        { field: 'pwa', headerName: 'pwa', flex: 1 },
        { field: 'projectName', headerName: 'Project', flex: 1 },
        {
            field: 'htmlReportFile',
            headerName: 'htmlReportFile',
            flex: 1,
            renderCell: (data) => <Link target={ '_blank' }
                href={ `/api/${ data.row.projectName }/${ data.value }` }>
                <Typography color={ 'secondary' }>
                    { data.value }
                </Typography>
            </Link>
        },
    ];

    return <Layout projects={ projects } title={ domain }>
        <Stack spacing={ 2 }>
            <Card>
                <CardContent>
                    <Typography variant={ 'h4' }>Desktop</Typography>
                    <DataGrid
                        rows={ desktopReports }
                        columns={ columns }
                        getRowId={ (r) => r.date }
                        autoHeight
                    />
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant={ 'h4' }>Mobile</Typography>
                    <DataGrid
                        rows={ mobileReports }
                        columns={ columns }
                        getRowId={ (r) => r.date }
                        autoHeight
                    />
                </CardContent>
            </Card>
        </Stack>
    </Layout>
}
export default DomainPage;
