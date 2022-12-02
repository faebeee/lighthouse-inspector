import { GetServerSideProps } from "next";
import { useState } from 'react';
import axios from "axios";
import Link from "next/link";
import { getReportFilesForProject, getReportsForProject } from "../../../src/server/utils/get-reports-for-project";
import { getProjects } from "../../../src/server/utils/get-projects";
import { Layout } from "../../../src/components/layout";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Card, CardContent, Grid, MenuItem, MenuList, Tab, Tabs, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { getLatestReport } from "../../../src/server/utils/get-latest-report";
import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine, VictoryTooltip } from "victory";
import { COLOR } from "../../../config";
import Box from "@mui/material/Box";
import { scaleBand } from "d3-scale";

export type ReportResult = {
    projectName: string;
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

    imageBase64: string;
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
    // @ts-ignore
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
            // @ts-ignore
            latestScreenshotBase64: latestDesktopReport.audits['final-screenshot'].details.data,
            // @ts-ignore
            latestMobileScreenshotBase64: latestMobileReport.audits['final-screenshot'].details.data,
        }

    }
}
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400;

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
    const [ value, setValue ] = useState<string>('desktop');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
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

    const lines = [
        { key: 'performance', color: COLOR.PERFORMANCE },
        { key: 'accessibility', color: COLOR.ACCESSIBILITY },
        { key: 'bestPractices', color: COLOR.BEST_PRACTICE },
        { key: 'seo', color: COLOR.SEO },
        { key: 'pwa', color: COLOR.PWA },
    ]

    return <Layout
        title={ projectName }
        projects={ projects }>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
                <Stack direction={ 'row' } spacing={ 2 }>
                    <TextField label={ 'Name' } value={ projectName } disabled/>
                    <TextField fullWidth label={ 'Url' } value={ url } disabled/>
                    <Button variant={ 'contained' } disabled={ isLoading }
                        onClick={ onRunReport }>{ isLoading ? 'Loading...' : 'Run' }</Button>
                </Stack>
            </Grid>

            <Grid item xs={ 12 } xl={ 6 }>
                <Stack direction={ 'row' } spacing={ 2 }>
                    <img height={ 250 } src={ latestScreenshotBase64 }/>
                    <img height={ 250 } src={ latestMobileScreenshotBase64 }/>
                </Stack>
            </Grid>

            <Grid item xs={ 12 } xl={ 6 }>
                <Card>
                    <CardContent>
                        <Typography color={ 'textPrimary' } variant={ 'h4' }>Stack</Typography>
                        { stack.join(', ') }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        <Card sx={ { mt: 4 } }>
            <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
                <Tabs value={ value } onChange={ handleChange }>
                    <Tab label="Desktop" value={ 'desktop' }/>
                    <Tab label="Mobile" value={ 'mobile' }/>
                </Tabs>
            </Box>

            { value === 'desktop' && <Box>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } xl={ 6 }>
                        <svg width={ CHART_WIDTH }
                            height={ CHART_HEIGHT }>
                            <VictoryAxis
                                crossAxis
                                dependentAxis
                                width={ CHART_WIDTH }
                                height={ CHART_HEIGHT }
                                domain={ [ 0, 100 ] }
                                standalone={ false }
                            />

                            <VictoryLegend x={ 10 } y={ 10 }
                                orientation="horizontal"
                                standalone={ false }
                                height={ 10 }
                                width={ CHART_WIDTH }
                                style={ { title: { fontSize: '14px' } } }
                                colorScale={ Object.values(COLOR) }
                                data={
                                    lines.map((line) => ({ name: line.key }))
                                }
                            />
                            { lines.map((line) => (<VictoryLine
                                standalone={ false }
                                key={ line.key }
                                height={ CHART_HEIGHT }
                                width={ CHART_WIDTH }
                                minDomain={ { y: 0 } }
                                maxDomain={ { y: 100 } }
                                style={ {
                                    data: { stroke: line.color },
                                } }
                                x={ 'date' }
                                y={ line.key }
                                data={ desktopReports }
                            />)) }
                        </svg>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <DataGrid
                            rows={ desktopReports }
                            columns={ columns }
                            getRowId={ (r) => r.date }
                            autoHeight
                        />
                    </Grid>
                </Grid>
            </Box> }


            { value === 'mobile' && <Box>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 } xl={ 6 }>
                        <svg width={ CHART_WIDTH }
                            height={ CHART_HEIGHT }>
                            <VictoryAxis
                                crossAxis
                                dependentAxis
                                width={ CHART_WIDTH }
                                height={ CHART_HEIGHT }
                                domain={ [ 0, 100 ] }
                                standalone={ false }
                            />

                            <VictoryLegend x={ 10 } y={ 10 }
                                orientation="horizontal"
                                standalone={false}
                                colorScale={ Object.values(COLOR) }
                                data={
                                    lines.map((line) => ({ name: line.key }))
                                }
                            />
                            { lines.map((line) => (<VictoryLine
                                standalone={false}
                                key={ line.key }
                                height={ CHART_HEIGHT }
                                width={ CHART_WIDTH }
                                minDomain={ { y: 0 } }
                                maxDomain={ { y: 100 } }
                                style={ {
                                    data: { stroke: line.color },
                                } }
                                x={ 'date' }
                                y={ line.key }
                                data={ mobileReports }
                            />)) }
                        </svg>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <DataGrid
                            rows={ mobileReports }
                            columns={ columns }
                            getRowId={ (r) => r.date }
                            autoHeight
                        />
                    </Grid>
                </Grid>
            </Box> }
        </Card>
    </Layout>
}

export default ProjectPage;
