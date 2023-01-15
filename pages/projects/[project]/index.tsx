import { GetServerSideProps } from "next";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from "next/link";
import { getProjectById, getProjects } from "../../../src/server/lib/project-services";
import { Layout } from "../../../src/components/layout";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Card, CardActions, CardContent, Grid, Tab, Tabs, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { COLOR, DATE_FORMAT } from "../../../config";
import Box from "@mui/material/Box";
import { LighthouseRunReport, Project } from "@prisma/client";
import { getReportsForProject, transformForSerialisation } from "../../../src/server/lib/lighthousereport-services";
import { getNavigation, NavigationEntry } from "../../../src/utils/get-navigation";
import { format } from "date-fns";
import { HistoryChart } from "../../../src/components/history-chart";
import { StatsChart } from "../../../src/components/stats-chart";
import { useRouter } from "next/router";

export type ProjectPageProps = {
    project: Project;
    navigation: NavigationEntry[];
    projects: Project[];
    desktopReports: LighthouseRunReport[];
    mobileReports: LighthouseRunReport[];
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const project = await getProjectById(parseInt(req.query.project as string));
    if (!project) {
        return {
            notFound: true,
        }
    }
    const projects = await getProjects();
    const desktopReports = await getReportsForProject(project!, 'desktop') ?? [];
    const mobileReports = await getReportsForProject(project!, 'mobile') ?? [];
    const navigation = await getNavigation();

    return {
        props: {
            project,
            navigation,
            projects,
            // @ts-ignore
            desktopReports: desktopReports.map(transformForSerialisation),
            // @ts-ignore
            mobileReports: mobileReports.map(transformForSerialisation),
        }
    }
}


export const ProjectPage = ({
    project,
    desktopReports,
    mobileReports,
    navigation,
}: ProjectPageProps) => {
    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState(project.is_running);
    const [ group, setGroup ] = useState(project.group);
    const [ name, setName ] = useState(project.name);
    const [ value, setValue ] = useState<string>('desktop');
    const latestReport = value === 'desktop' ? (desktopReports.length > 0 ? desktopReports[0] : null) : (mobileReports.length > 0 ? mobileReports[0] : null);
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        setGroup(project.group);
        setName(project.name);
    }, [ project ]);

    const onRunReport = () => {
        setIsLoading(true);
        axios.post(`/api/projects/${project.id}/inspect`)
            .finally(() => {
                setIsLoading(false);
            })
    }

    const updateProject = () => {
        setIsLoading(true);
        axios.patch(`/api/projects/${ project.id }`, {
            group,
            name
        })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onRemove = () => {
        setIsLoading(true);
        axios.delete(`/api/projects/${ project.id }`)
            .then(() => {
                router.push('/');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'date',
            headerName: 'date',
            flex: 1,
            renderCell: (data) => <Typography>{ format(new Date(data.value), DATE_FORMAT) }</Typography>
        },
        { field: 'performance', headerName: 'performance', flex: 1 },
        { field: 'accessibility', headerName: 'accessibility', flex: 1 },
        { field: 'bestPractices', headerName: 'bestPractices', flex: 1 },
        { field: 'SEO', headerName: 'seo', flex: 1 },
        { field: 'PWA', headerName: 'pwa', flex: 1 },
        {
            field: 'htmlReportFile',
            headerName: 'htmlReportFile',
            flex: 1,
            renderCell: (data) => <Link target={ '_blank' }
                href={ `/api/reports/${ data.row.id }` }>
                <Typography color={ 'secondary' }>
                    HTML Report
                </Typography>
            </Link>
        },
    ];

    const lines = [
        { label: 'performance', color: COLOR.PERFORMANCE },
        { label: 'accessibility', color: COLOR.ACCESSIBILITY },
        { label: 'bestPractices', color: COLOR.BEST_PRACTICE },
        { label: 'SEO', color: COLOR.SEO },
        { label: 'PWA', color: COLOR.PWA },
    ]

    return <Layout
        backLink={ project.group ? `/group/${ project.group }` : '/' }
        showSidebar={ false }
        title={ project.name }
        actions={<Button variant={ 'text' } disabled={ isLoading }
            onClick={ onRunReport }>{ isLoading ? 'Loading...' : 'Run' }</Button>}
        navigation={ navigation }>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } xl={ 4 }>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 }>
                        <Stack spacing={ 2 }>
                            <Card>
                                <CardContent>
                                    <Typography color={ 'textPrimary' } variant={ 'subtitle2' }>URL</Typography>
                                    <Typography variant={ 'h6' }>{ project.url }</Typography>
                                </CardContent>


                                <CardActions>
                                    <Button onClick={ onRemove }>Delete</Button>
                                </CardActions>
                            </Card>

                            { project.group && <Card>
                                <CardContent>
                                    <Typography color={ 'textPrimary' } variant={ 'subtitle2' }>Group</Typography>
                                    <Link href={ `/groups/${ project.group }` }>
                                        <Typography color={ 'textPrimary' }
                                            variant={ 'h6' }>{ project.group }</Typography>
                                    </Link>
                                </CardContent>
                            </Card> }

                            <Stack direction={ 'row' } spacing={ 2 }>
                                { value === 'desktop' && latestReport &&
                                    <img width={ '100%' } alt={ 'desktop' }
                                        src={ `/api/reports/${ latestReport.id }/thumbnail` }/> }
                                { value === 'mobile' && latestReport &&
                                    <img width={ 300 } alt={ 'mobile' }
                                        src={ `/api/reports/${ latestReport.id }/thumbnail?type=mobile` }/> }
                            </Stack>

                            <Card>
                                <CardContent>
                                    <Stack direction={ 'row' } spacing={ 2 }>
                                        <TextField label={ 'Name' } value={ name }
                                            onChange={ (e) => setName(e.target.value) }/>
                                        <TextField label={ 'Group' } value={ group }
                                            onChange={ (e) => setGroup(e.target.value) }/>
                                        <TextField fullWidth label={ 'Url' } value={ project.url } disabled/>
                                        <Button variant={ 'outlined' } disabled={ isLoading }
                                            onClick={ updateProject }>{ isLoading ? 'Loading...' : 'Save' }</Button>
                                    </Stack>

                                </CardContent>
                            </Card>

                            { latestReport && latestReport.stacks?.length > 0 && <Card>
                                <CardContent>
                                    <Typography color={ 'textPrimary' } variant={ 'subtitle2' }>Stack</Typography>
                                    <Typography variant={ 'h6' }>{ latestReport?.stacks.join(', ') }</Typography>
                                </CardContent>
                            </Card> }


                            { latestReport && <Card>
                                <CardContent>
                                    <Typography color={ 'textPrimary' } variant={ 'subtitle2' }>Stats</Typography>
                                    { latestReport && <StatsChart height={ 400 } data={ [
                                        { x: 'Performance', y: latestReport.performance, fill: COLOR.PERFORMANCE },
                                        {
                                            x: 'Accessibility',
                                            y: latestReport.accessibility,
                                            fill: COLOR.ACCESSIBILITY
                                        },
                                        {
                                            x: 'Best Practices',
                                            y: latestReport.bestPractices,
                                            fill: COLOR.BEST_PRACTICE
                                        },
                                        { x: 'SEO', y: latestReport.SEO, fill: COLOR.SEO },
                                        { x: 'PWA', y: latestReport.PWA, fill: COLOR.PWA },
                                    ] }/> }
                                </CardContent>
                                <CardActions>
                                    <Link href={ `/api/reports/${ latestReport?.id }` } target={ '_blank' }>
                                        <Button variant={ 'text' }>Open Report</Button>
                                    </Link>
                                </CardActions>
                            </Card> }
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={ 12 } xl={ 8 }>
                <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 }>
                        <Card>
                            <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
                                <Tabs value={ value } onChange={ handleChange }>
                                    <Tab label="Desktop" value={ 'desktop' }/>
                                    <Tab label="Mobile" value={ 'mobile' }/>
                                </Tabs>
                            </Box>

                            { value === 'desktop' && desktopReports.length > 0 && <Box>
                                { desktopReports.length > 0 &&
                                    <HistoryChart keys={ lines } data={ [ ...desktopReports ].reverse() }/> }
                                <DataGrid
                                    rows={ desktopReports }
                                    columns={ columns }
                                    getRowId={ (r) => r.date }
                                    autoHeight
                                />
                            </Box> }


                            { value === 'mobile' && mobileReports.length > 0 && <Box>
                                { mobileReports.length > 0 &&
                                    <HistoryChart keys={ lines } data={ [ ...mobileReports ].reverse() }/> }
                                <DataGrid
                                    rows={ mobileReports }
                                    columns={ columns }
                                    getRowId={ (r) => r.date }
                                    autoHeight
                                />
                            </Box> }
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Layout>
}

export default ProjectPage;
