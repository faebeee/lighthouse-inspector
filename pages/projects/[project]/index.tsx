import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getProjectById, getProjects } from "../../../src/server/lib/project-services";
import { Layout } from "../../../src/components/layout";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Card, CardActions, CardContent, Chip, Grid, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { COLOR, DATE_FORMAT } from "../../../config";
import Box from "@mui/material/Box";
import { LighthouseRunReport, Project, Tag } from "@prisma/client";
import { getReportsForProject, transformForSerialisation } from "../../../src/server/lib/lighthousereport-services";
import { getNavigation, NavigationEntry } from "../../../src/utils/get-navigation";
import { format } from "date-fns";
import { HistoryChart } from "../../../src/components/history-chart";
import { StatsChart } from "../../../src/components/stats-chart";
import { useRouter } from "next/router";
import { ActionsList } from "../../../src/components/actions-list";
import { useEndpoint } from "../../../src/hooks/use-endpoint";
import { useResource } from "../../../src/hooks/use-resource";
import { Stack } from "@mui/system";

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
    const [ value, setValue ] = useState<string>("desktop");
    const latestReport = value === "desktop" ? (desktopReports.length > 0 ? desktopReports[0] : null) : (mobileReports.length > 0 ? mobileReports[0] : null);
    const inspectEndpoint = useEndpoint<Project[]>({ url: `/api/inspect` }, 2000);
    const tagsApi = useResource<Tag[]>({ url: `/api/projects/${ project.id }/tags` });

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
        { field: "id", headerName: "ID" },
        {
            field: "date",
            headerName: "date",
            flex: 1,
            renderCell: (data) => <Typography>{ format(new Date(data.value), DATE_FORMAT) }</Typography>
        },
        { field: "serverResponseTime", headerName: "Speed", flex: 1 },
        { field: "performance", headerName: "performance", flex: 1 },
        { field: "accessibility", headerName: "accessibility", flex: 1 },
        { field: "bestPractices", headerName: "bestPractices", flex: 1 },
        { field: "SEO", headerName: "seo", flex: 1 },
        { field: "PWA", headerName: "pwa", flex: 1 },
        {
            field: "htmlReportFile",
            headerName: "htmlReportFile",
            flex: 1,
            renderCell: (data) => <Link target={ "_blank" }
                href={ `/api/reports/${ data.row.id }` }>
                <Typography color={ "secondary" }>
                    HTML Report
                </Typography>
            </Link>
        }
    ];

    const lines = [
        { label: 'performance', color: COLOR.PERFORMANCE },
        { label: 'accessibility', color: COLOR.ACCESSIBILITY },
        { label: 'bestPractices', color: COLOR.BEST_PRACTICE },
        { label: 'SEO', color: COLOR.SEO },
        { label: 'PWA', color: COLOR.PWA },
    ]

    return <Layout
        backLink={ project.group ? `/group/${ project.group }` : "/" }
        title={ project.name }
        actions={ <>
            <ActionsList project={ project } />
            <Button href={ `/projects/${ project.id }/settings` }>Settings</Button>
            <Button variant={ "text" } disabled={ isLoading || (inspectEndpoint.data ?? []).length > 0 }
                onClick={ onRunReport }>{ isLoading ? "Loading..." : "Run" }</Button>
        </> }
        navigation={ navigation }>
        <Box sx={ { borderBottom: 1, borderColor: "divider" } }>
            <Tabs value={ value } onChange={ handleChange }>
                <Tab label="Desktop" value={ "desktop" } />
                <Tab label="Mobile" value={ "mobile" } />
            </Tabs>
        </Box>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
                <Grid container spacing={ 2 }>

                    <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
                        { latestReport && <Card sx={ { height: "320px" } }>
                          <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
                            <Typography color={ "textPrimary" } variant={ "subtitle2" }>Screenshot</Typography>
                            <Box sx={ {
                                flex: "1 0 100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            } }>
                                { value === "desktop" && latestReport &&
                                  <img width={ "100%" } alt={ "desktop" }
                                    src={ `/api/reports/${ latestReport.id }/thumbnail` } /> }
                                { value === "mobile" && latestReport &&
                                  <img width={ 300 } alt={ "mobile" }
                                    src={ `/api/reports/${ latestReport.id }/thumbnail?type=mobile` } /> }
                            </Box>
                          </CardContent>
                        </Card> }
                    </Grid>

                    <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
                        { latestReport && <Card sx={ { height: "320px" } }>
                          <CardContent>
                            <Typography color={ "textPrimary" } variant={ "subtitle2" }>Stats</Typography>
                              { latestReport && <StatsChart height={ 280 } data={ [
                                  { x: "Performance", y: latestReport.performance, fill: COLOR.PERFORMANCE },
                                  {
                                      x: "Accessibility",
                                      y: latestReport.accessibility,
                                      fill: COLOR.ACCESSIBILITY
                                  },
                                  {
                                      x: "Best Practices",
                                      y: latestReport.bestPractices,
                                      fill: COLOR.BEST_PRACTICE
                                  },
                                  { x: "SEO", y: latestReport.SEO, fill: COLOR.SEO },
                                  { x: "PWA", y: latestReport.PWA, fill: COLOR.PWA }
                              ] } /> }
                          </CardContent>
                          <CardActions>
                            <Link href={ `/api/reports/${ latestReport?.id }` } target={ "_blank" }>
                              <Button variant={ "text" }>Open Report</Button>
                            </Link>
                          </CardActions>
                        </Card> }
                    </Grid>


                    <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
                        <Card sx={ { height: "320px" } }>
                            <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
                                <Typography color={ "textPrimary" } variant={ "subtitle2" }>Initial Server Response
                                    Time</Typography>
                                <Box sx={ {
                                    flex: "1 0 100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                } }>
                                    <Typography variant={ "h2" }
                                        noWrap={ true }>{ latestReport?.serverResponseTime ?? "???" }ms</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
                        { latestReport && <Card sx={ { height: "320px" } }>
                          <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
                            <Typography color={ "textPrimary" } variant={ "subtitle2" }>Tags</Typography>
                            <Box sx={ {
                                flex: "1 0 100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            } }>
                              <Stack direction={ "row" } spacing={ 1 }>
                                  { tagsApi.data?.map((tag: Tag) => <Chip label={ tag.name } key={ tag.id } />) }
                              </Stack>
                            </Box>
                          </CardContent>
                        </Card> }
                    </Grid>

                    <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
                        { latestReport && <Card sx={ { height: "320px" } }>
                          <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
                            <Typography color={ "textPrimary" } variant={ "subtitle2" }>Group</Typography>
                            <Box sx={ {
                                flex: "1 0 100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            } }>
                              <Typography variant={ "h2" }>{ project.group }</Typography>
                            </Box>
                          </CardContent>
                        </Card> }
                    </Grid>


                    <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
                        { latestReport && <Card sx={ { height: "320px" } }>
                          <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
                            <Typography color={ "textPrimary" } variant={ "subtitle2" }>URL</Typography>
                            <Box sx={ {
                                flex: "1 0 100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            } }>
                              <Link href={ project.url } target={ "blank" }>
                                <Typography variant={ "h6" }
                                  color={ "textSecondary" }>{ project.url }</Typography>
                              </Link>
                            </Box>
                          </CardContent>
                        </Card> }
                    </Grid>

                    <Grid item xs={ 6 }>
                        { latestReport && <Card sx={ { height: "320px" } }>
                          <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
                            <Typography color={ "textPrimary" } variant={ "subtitle2" }>Response History</Typography>
                              { value === "desktop" &&
                                <HistoryChart keys={ [ { label: "serverResponseTime", color: COLOR.SPEED } ] }
                                  data={ [ ...desktopReports ].reverse() } /> }

                              { value === "mobile" &&
                                <HistoryChart keys={ [ { label: "serverResponseTime", color: COLOR.SPEED } ] }
                                  data={ [ ...mobileReports ].reverse() } /> }
                          </CardContent>
                        </Card> }
                    </Grid>

                    <Grid item xs={ 6 }>
                        { latestReport && <Card sx={ { height: "320px" } }>
                          <CardContent sx={ { display: "flex", flexDirection: "column", height: "100%" } }>
                            <Typography color={ "textPrimary" } variant={ "subtitle2" }>Stats History</Typography>
                              { value === "desktop" && desktopReports.length > 0 &&
                                <HistoryChart keys={ lines } data={ [ ...desktopReports ].reverse() } /> }

                              { value === "mobile" && mobileReports.length > 0 &&
                                <HistoryChart keys={ lines } data={ [ ...mobileReports ].reverse() } /> }
                          </CardContent>
                        </Card> }
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Card>
                            { value === "desktop" && desktopReports.length > 0 && <Box>
                              <DataGrid
                                rows={ desktopReports }
                                columns={ columns }
                                getRowId={ (r) => r.date }
                                autoHeight
                              />
                            </Box> }

                            { value === "mobile" && mobileReports.length > 0 && <Box>
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
