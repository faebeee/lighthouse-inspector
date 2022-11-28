import { GetServerSideProps } from "next";
import { useState } from 'react';
import fs from 'fs';
import axios from "axios";
import Link from "next/link";
import { getReportFilesForProject, getReportsForProject } from "../../../src/get-reports-for-project";
import { getProjects } from "../../../src/get-projects";
import { Layout } from "../../../src/components/layout";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, ListItemText, MenuItem, MenuList, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Divider from "@mui/material/Divider";

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
    projects: string[]
}

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const project = req.query.project as string;
    const projects = await getProjects();
    const reports = await getReportsForProject(project as string);
    const files = await getReportFilesForProject(project as string);

    const projectUrl = files.length > 0 ? JSON.parse(fs.readFileSync(files[0], { encoding: 'utf8' })).finalUrl : '';

    return {
        props: {
            projectName: project,
            reports,
            url: projectUrl,
            projects,
        }
    }
}

export const ProjectPage = ({ reports, projectName, url, projects }: ProjectPageProps) => {
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
        { field: 'finalUrl', headerName: 'URL', flex: 1 },
        { field: 'performance', headerName: 'performance', flex: 1 },
        { field: 'accessibility', headerName: 'accessibility', flex: 1 },
        { field: 'bestPractices', headerName: 'bestPractices', flex: 1 },
        { field: 'seo', headerName: 'seo', flex: 1 },
        { field: 'pwa', headerName: 'pwa', flex: 1 },
        { field: 'hasReport', headerName: 'hasReport', flex: 1 },
        { field: 'htmlReportFile', headerName: 'htmlReportFile', flex: 1 },
    ];

    return <Layout
        title={ projectName }
        sidebar={ <MenuList>
            { projects.map((name) => (
                <Link href={ `/reports/${ name }` } key={ name }>
                    <MenuItem>
                        <ListItemText>{ name }</ListItemText>
                    </MenuItem>
                </Link>
            )) }
            <Divider/>
            <Link href={ `/reports/new` }>
                <MenuItem>
                    <ListItemText>New</ListItemText>
                </MenuItem>
            </Link>
        </MenuList>
        }>

        <Stack spacing={ 2 }>
            <Stack direction={ 'row' } spacing={ 2 }>
                <TextField label={ 'Name' } value={ projectName } disabled/>
                <TextField label={ 'Url' } value={ url } disabled/>
                <Button variant={ 'contained' } disabled={ isLoading }
                    onClick={ onRunReport }>{ isLoading ? 'Loading...' : 'Run' }</Button>
            </Stack>

            <DataGrid
                rows={ reports }
                columns={ columns }
                getRowId={ (r) => r.date }
                autoHeight
            />
        </Stack>
    </Layout>
}

export default ProjectPage;
