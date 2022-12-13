import { GetServerSideProps } from "next";
import { useEffect, useState } from 'react';
import axios from "axios";
import Link from "next/link";
import { getProjectById, getProjects } from "../../../src/server/lib/project-services";
import { Layout } from "../../../src/components/layout";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Card, CardContent, Grid, Tab, Tabs, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { VictoryAxis, VictoryLegend, VictoryLine } from "victory";
import { COLOR, DATE_FORMAT } from "../../../config";
import Box from "@mui/material/Box";
import { LighthouseRunReport, Project } from "@prisma/client";
import { getReportsForProject, transformForSerialisation } from "../../../src/server/lib/lighthousereport-services";
import { getNavigation, NavigationEntry } from "../../../src/utils/get-navigation";
import { format } from "date-fns";

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

const CHART_WIDTH = 600;
const CHART_HEIGHT = 400;

export const ProjectPage = ({
    project,
    desktopReports,
    mobileReports,
    navigation,
}: ProjectPageProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [group, setGroup] = useState(project.group);
    const [name, setName] = useState(project.name);
    const [value, setValue] = useState<string>('desktop');
    const latestReport = desktopReports.length > 0 ? desktopReports[desktopReports.length - 1] : null;
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        setGroup(project.group);
        setName(project.name);
    }, [project]);

    const onRunReport = () => {
        setIsLoading(true);
        axios.post(`/api/projects/${project.id}/inspect`)
            .finally(() => {
                setIsLoading(false);
            })
    }

    const updateProject = () => {
        setIsLoading(true);
        axios.patch(`/api/projects/${project.id}`, {
            group,
            name
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
        { key: 'performance', color: COLOR.PERFORMANCE },
        { key: 'accessibility', color: COLOR.ACCESSIBILITY },
        { key: 'bestPractices', color: COLOR.BEST_PRACTICE },
        { key: 'SEO', color: COLOR.SEO },
        { key: 'PWA', color: COLOR.PWA },
    ]

    return <Layout
        title={ project.name }
        actions={ <>
            <Button variant={ 'contained' } disabled={ isLoading }
                onClick={ onRunReport }>{ isLoading ? 'Loading...' : 'Run' }</Button>
        </> }
        navigation={ navigation }>
        <Grid container spacing={ 2 }>
            { latestReport &&
                <Grid item xs={ 12 } xl={ 6 }>
                    <Stack direction={ 'row' } spacing={ 2 }>
                        <img height={ 250 } src={ `/api/reports/${ latestReport.id }/thumbnail` }/>
                        <img height={ 250 } src={ `/api/reports/${ latestReport.id }/thumbnail?type=mobile` }/>
                    </Stack>
                </Grid>
            }

            { latestReport && <Grid item xs={ 12 } xl={ 6 }>
                <Stack spacing={ 2 }>
                    <Card>
                        <CardContent>
                            <Stack direction={ 'row' } spacing={ 2 }>
                                <TextField label={ 'Name' } value={ name } onChange={ (e) => setName(e.target.value) }/>
                                <TextField label={ 'Group' } value={ group }
                                    onChange={ (e) => setGroup(e.target.value) }/>
                                <TextField fullWidth label={ 'Url' } value={ project.url } disabled/>
                                <Button variant={ 'outlined' } disabled={ isLoading }
                                    onClick={ updateProject }>{ isLoading ? 'Loading...' : 'Save' }</Button>
                            </Stack>

                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography color={ 'textPrimary' } variant={ 'h4' }>Stack</Typography>
                            { latestReport.stacks.join(', ') }
                        </CardContent>
                    </Card>
                </Stack>
            </Grid> }

            <Grid item xs={ 12 } xl={ 6 }>
                <Card>
                    <CardContent>
                        <Typography>Mobile</Typography>
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
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={ 12 } xl={ 6 }>
                <Card>
                    <CardContent>
                        <Typography>Mobile</Typography>
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
                                data={ mobileReports }
                            />)) }
                        </svg>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        <Card sx={{ mt: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Desktop" value={'desktop'} />
                    <Tab label="Mobile" value={'mobile'} />
                </Tabs>
            </Box>

            {value === 'desktop' && desktopReports.length > 0 && <Box>
                        <DataGrid
                            rows={desktopReports}
                            columns={columns}
                            getRowId={(r) => r.date}
                            autoHeight
                        />
            </Box>}


            {value === 'mobile' && mobileReports.length > 0 && <Box>
                        <DataGrid
                            rows={mobileReports}
                            columns={columns}
                            getRowId={(r) => r.date}
                            autoHeight
                        />
            </Box>}

        </Card>
    </Layout>
}

export default ProjectPage;
