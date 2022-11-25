import { GetServerSideProps } from "next";
import glob from 'glob';
import fs from 'fs';
import path from 'path';
import { REPORTS_FOLDER } from "../../../config";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
};

export type ProjectPageProps = {
    projectName: string;
    url: string;
    reports: ReportResult[];
}

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = (req) => {
    const project = req.query.project;
    const folder = path.join(process.cwd(), REPORTS_FOLDER);
    const files = glob.sync(`${ folder }/${ project }/*.json`);
    const projectUrl = JSON.parse(fs.readFileSync(files[0], { encoding: 'utf8' })).finalUrl;
    const reports = files.reduce((acc, file) => {
        const report = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
        const htmlReport = file.replace('.json', '.html');
        const htmlExists = fs.existsSync(htmlReport);
        acc.push({
            date: report.fetchTime,
            finalUrl: report.finalUrl,
            performance: report.categories.performance.score,
            accessibility: report.categories.accessibility.score,
            bestPractices: report.categories['best-practices'].score,
            seo: report.categories.seo.score,
            pwa: report.categories.pwa.score,
            hasReport: htmlExists,
            htmlReportFile: htmlExists ? path.basename(htmlReport, '.html') : null,
        });
        return acc;
    }, [] as ReportResult[]);


    return {
        props: {
            projectName: project,
            reports,
            url: projectUrl,
        }
    }
}

export const ProjectPage = ({ reports, projectName, url }: ProjectPageProps) => {
    const onRunReport = () => {
        axios.post('/api/inspect', {
            url,
            name: projectName
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

    return <div>
        <Typography variant={ 'h1' }>{ projectName }</Typography>
        <TextField value={ projectName } disabled/>
        <TextField value={ url } disabled/>
        <Button variant={ 'contained' } onClick={ onRunReport }>Run</Button>

        <DataGrid
            rows={ reports }
            columns={ columns }
            getRowId={ (r) => r.date }
            autoHeight
        />
    </div>

}

export default ProjectPage;
