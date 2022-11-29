import { GetServerSideProps } from "next";
import { useState } from 'react';
import fs from 'fs';
import axios from "axios";
import Link from "next/link";
import { getReportFilesForProject, getReportsForProject } from "../../../src/get-reports-for-project";
import { getProjects } from "../../../src/get-projects";
import { Layout } from "../../../src/components/layout";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Card, CardContent, ListItemText, MenuItem, MenuList, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { getLatestReport } from "../../../src/server/utils/get-latest-report";

export type ReportResult = {
    date: string;
    finalUrl: string;
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
    hasReport: boolean;
    htmlReportFile: string | null;
    type: string;
    stacks: string[];
};

export type ProjectPageProps = {
    projectName: string;
    url: string;
    reports: ReportResult[];
    mobileReports: ReportResult[];
    desktopReports: ReportResult[];
    projects: string[],
    stack: string[],
    latestScreenshotBase64: string,
    latestMobileScreenshotBase64: string,
}

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const project = req.query.project as string;
    const projects = await getProjects();
    const reports = await getReportsForProject(project);
    const files = await getReportFilesForProject(project);
    const desktopReports = reports.filter((r) => r.type === 'desktop');
    const mobileReports = reports.filter((r) => r.type === 'mobile');

    const latestDesktopReport = await getLatestReport(project, 'desktop');
    const latestMobileReport = await getLatestReport(project, 'mobile');
    const projectUrl = files.length > 0 ? latestDesktopReport.finalUrl : '';

    return {
        props: {
            projectName: project,
            reports,
            url: projectUrl,
            projects,
            desktopReports,
            mobileReports,
            stack: desktopReports[desktopReports.length - 1]?.stacks ?? [],
            latestScreenshotBase64: latestDesktopReport.audits['final-screenshot'].details.data,
            latestMobileScreenshotBase64: latestMobileReport.audits['final-screenshot'].details.data,
        }
    }
}

export const ProjectPage = ({
                                desktopReports,
                                mobileReports,
                                projectName,
                                url,
                                projects,
                                latestScreenshotBase64,
                                latestMobileScreenshotBase64,
                                stack,
                            }: ProjectPageProps) => {
    const [ isLoading, setIsLoading ] = useState(false);

    const onRunReport = () => {
        setIsLoading(true);
        axios.post('/api/inspect', {
            url,
            name: projectName
        })
            .finally(() => {
                setIsLoading(false);
            })
    }
    const columns: GridColDef[] = [
        { field: 'date', headerName: 'date', flex: 1 },
        { field: 'performance', headerName: 'performance', flex: 1 },
        { field: 'accessibility', headerName: 'accessibility', flex: 1 },
        { field: 'bestPractices', headerName: 'bestPractices', flex: 1 },
        { field: 'seo', headerName: 'seo', flex: 1 },
        { field: 'pwa', headerName: 'pwa', flex: 1 },
        {
            field: 'htmlReportFile',
            headerName: 'htmlReportFile',
            flex: 1,
            renderCell: (data) => <Link target={ '_blank' }
                href={ `/api/${ projectName }/${ data.value }` }>
                <Typography color={ 'secondary' }>
                    { data.value }
                </Typography>
            </Link>
        },
    ];

    return <Layout
        title={ projectName }
        projects={ projects }>
        <Stack spacing={ 2 }>

            <Stack direction={ 'row' } spacing={ 2 }>
                <TextField label={ 'Name' } value={ projectName } disabled/>
                <TextField fullWidth label={ 'Url' } value={ url } disabled/>
                <Button variant={ 'contained' } disabled={ isLoading }
                    onClick={ onRunReport }>{ isLoading ? 'Loading...' : 'Run' }</Button>
            </Stack>

            <Stack direction={ 'row' } spacing={ 2 }>
                <img height={ 250 } src={ latestScreenshotBase64 }/>
                <img height={ 250 } src={ latestMobileScreenshotBase64 }/>
            </Stack>

            <Card>
                <CardContent>
                    <Typography color={ 'textPrimary' } variant={ 'h4' }>Stack</Typography>
                    { stack.join(', ') }
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography color={ 'textPrimary' } variant={ 'h4' }>Desktop</Typography>
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
                    <Typography color={ 'textPrimary' } variant={ 'h4' }>Mobile</Typography>
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

export default ProjectPage;
