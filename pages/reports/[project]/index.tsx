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
};

export type ProjectPageProps = {
    projectName: string;
    url: string;
    reports: ReportResult[];
    mobileReports: ReportResult[];
    desktopReports: ReportResult[];
    projects: string[]
}

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const project = req.query.project as string;
    const projects = await getProjects();
    const reports = await getReportsForProject(project as string);
    const files = await getReportFilesForProject(project as string);
    const desktopReports = reports.filter((r) => r.type === 'desktop');
    const mobileReports = reports.filter((r) => r.type === 'mobile');

    const projectUrl = files.length > 0 ? JSON.parse(fs.readFileSync(files[0], { encoding: 'utf8' })).finalUrl : '';

    return {
        props: {
            projectName: project,
            reports,
            url: projectUrl,
            projects,
            desktopReports,
            mobileReports,
        }
    }
}

export const ProjectPage = ({ desktopReports, mobileReports, projectName, url, projects }: ProjectPageProps) => {
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
