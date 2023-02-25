import { GetServerSideProps } from "next";
import React, { useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getProjectById, getProjects } from "../../../src/server/lib/project-services";
import { Layout } from "../../../src/components/layout";
import { Button, Chip, Grid, Stack, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { COLOR, DATE_FORMAT } from "../../../config";
import Box from "@mui/material/Box";
import { LighthouseRunReport, Project, Tag } from "@prisma/client";
import { getNavigation, NavigationEntry } from "../../../src/utils/get-navigation";
import { format } from "date-fns";
import { ActionsList } from "../../../src/components/actions-list";
import { useEndpoint } from "../../../src/hooks/use-endpoint";
import { useResource } from "../../../src/hooks/use-resource";
import { SingleStat } from "../../../src/components/single-stat";
import { Widget } from "../../../src/components/widget";
import { StatsChart } from "../../../src/components/stats-chart";
import { HistoryChart } from "../../../src/components/history-chart";
import { NumericValue } from "../../../src/components/numeric-value";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

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
    const navigation = await getNavigation();

    return {
        props: {
            project,
            navigation,
            projects,
        }
    }
}

export const ProjectPage = ({
                                project: initialProject,
                                navigation
                            }: ProjectPageProps) => {
    const projectApi = useResource<Project>({
        url: `/api/projects/${ initialProject.id }`
    }, 2000);
    const project = useMemo(() => projectApi.data ?? initialProject, [ initialProject, projectApi.data ]);
    const [ isLoading, setIsLoading ] = useState(project.is_running);
    const [ value, setValue ] = useState<string>("desktop");
    const searchParams = useSearchParams();
    const limit = searchParams.get('limit') ? searchParams.get('limit'): 10
    const desktopReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${ project.id }/reports`,
        params: { type: "desktop", limit }
    }, 2000);

    const mobileReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${ project.id }/reports`,
        params: {
            type: "mobile",
            limit
        }
    }, 2000);

    const inspectEndpoint = useEndpoint<Project[]>({ url: `/api/inspect` }, 2000);

    const tagsApi = useResource<Tag[]>({ url: `/api/projects/${ project.id }/tags` });

    const desktopReports = useMemo(() => (!!desktopReportsApi.data && desktopReportsApi.data.length) > 0 ? (desktopReportsApi.data ?? []) : [], [ desktopReportsApi ]);
    const mobileReports = useMemo(() => (!!mobileReportsApi.data && mobileReportsApi.data.length) > 0 ? (mobileReportsApi.data ?? []) : [], [ mobileReportsApi ]);

    const latestReport = useMemo(() => {
        if (value === "desktop") {
            return (desktopReports.length > 0 ? desktopReports[0] : null);
        }
        return (mobileReports.length > 0 ? mobileReports[0] : null);
    }, [ value, desktopReports, mobileReports ]);


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const onRunReport = () => {
        setIsLoading(true);
        axios.post(`/api/projects/${ project.id }/inspect`)
            .finally(() => {
                setIsLoading(false);
            })
    }

    const lines = [
        { label: 'performance', color: COLOR.PERFORMANCE },
        { label: 'accessibility', color: COLOR.ACCESSIBILITY },
        { label: 'bestPractices', color: COLOR.BEST_PRACTICE },
        { label: 'SEO', color: COLOR.SEO },
        { label: 'PWA', color: COLOR.PWA },
    ]

    return <Layout
        backLink={ project.group ? `/group/${ project.group }` : "/" }
        title={ `${ project.name } | Overview` }
        actions={ <>
            <Button href={ `/projects/${ project.id }/settings` }>Settings</Button>
            <Button href={ `/projects/${ project.id }/data` }>Data</Button>
            <ActionsList project={ project } />
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
                    <Grid container item xs={ 12 } xl={ 6 } spacing={ 2 }>
                        <Grid item xs={ 12 } md={6} xl={ 4 }>
                            { latestReport && <Widget title={ "Performance" }>
                              <SingleStat
                                width={ 300 }
                                height={ 240 }
                                value={ latestReport.performance }
                                label={ "Performance" } />
                            </Widget> }
                        </Grid>

                        <Grid item xs={ 12 } md={6} xl={ 4 }>
                            { latestReport && <Widget title={ "Accessibility" }>
                              <SingleStat
                                width={ 300 }
                                height={ 240 }
                                value={ latestReport.accessibility }
                                label={ "accessibility" } />
                            </Widget> }
                        </Grid>

                        <Grid item xs={ 12 } md={6} xl={ 4 }>
                            { latestReport && <Widget title={ "Best Practices" }>
                              <SingleStat
                                width={ 300 }
                                height={ 240 }
                                value={ latestReport.bestPractices }
                                label={ "bestPractices" } />
                            </Widget> }
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Widget title={ "Stats History" }>
                                { value === "desktop" && desktopReports.length > 0 &&
                                  <HistoryChart keys={ lines } data={ [ ...desktopReports ].reverse() } /> }

                                { value === "mobile" && mobileReports.length > 0 &&
                                  <HistoryChart keys={ lines } data={ [ ...mobileReports ].reverse() } /> }
                            </Widget>
                        </Grid>

                        <Grid item xs={ 12 }>
                            { latestReport && <Widget title={ "Stats" }>
                              <StatsChart height={ 280 } data={ [
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
                              ] } />
                            </Widget> }
                        </Grid>
                    </Grid>

                    <Grid container item xs={ 12 } xl={ 6 } spacing={ 2 }>
                        <Grid item xs={ 12 } md={6} xl={ 4 }>
                            <Widget title={ "Initial Server Response Time" }>
                                {latestReport && <NumericValue goodThreshold={ 800 } poorThreshold={ 1200 }
                                    value={ latestReport.serverResponseTime ?? 0 }
                                    unit={ "ms" } /> }
                            </Widget>
                        </Grid>

                        <Grid item xs={ 12 } md={6} xl={ 4 }>
                            <Widget title={ "Time to interactive" }>
                                {latestReport && <NumericValue goodThreshold={ 800 } poorThreshold={ 1200 }
                                    value={ latestReport.tti ?? 0 }
                                    unit={ "ms" } />}
                            </Widget>
                        </Grid>

                        <Grid item xs={ 12 } md={ 6 } xl={ 4 }>
                            { latestReport && <Widget title={ "Report" }>
                              <Link href={ `/api/reports/${ latestReport.id }` } target={ "blank" }>
                                <Typography variant={ "h6" }
                                  color={ "primary" }>{ format(new Date(latestReport.date), DATE_FORMAT) }</Typography>
                              </Link>
                            </Widget> }
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Widget title={ "Response History" }>
                                { value === "desktop" &&
                                  <HistoryChart keys={ [ { label: "serverResponseTime", color: COLOR.SPEED } ] }
                                    data={ [ ...desktopReports ].reverse() } /> }

                                { value === "mobile" &&
                                  <HistoryChart keys={ [ { label: "serverResponseTime", color: COLOR.SPEED } ] }
                                    data={ [ ...mobileReports ].reverse() } /> }
                            </Widget>
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Widget title={ "Time to interactive History" }>
                                { value === "desktop" &&
                                  <HistoryChart keys={ [ { label: "tti", color: COLOR.SPEED } ] }
                                    data={ [ ...desktopReports ].reverse() } /> }

                                { value === "mobile" &&
                                  <HistoryChart keys={ [ { label: "tti", color: COLOR.SPEED } ] }
                                    data={ [ ...mobileReports ].reverse() } /> }
                            </Widget>
                        </Grid>
                    </Grid>


                    <Grid container item xs={ 12 } spacing={ 2 }>
                        <Grid item xs={ 12 } md={ 4 }>
                            { latestReport && <Widget title={ "Screenshot" }><>
                                { value === "desktop" && latestReport &&
                                  <img width={ "100%" } alt={ "desktop" }
                                    src={ `/api/reports/${ latestReport.id }/thumbnail` } /> }
                                { value === "mobile" && latestReport &&
                                  <img width={ 300 } alt={ "mobile" }
                                    src={ `/api/reports/${ latestReport.id }/thumbnail?type=mobile` } /> }
                            </>
                            </Widget> }
                        </Grid>


                        <Grid item xs={ 12 } md={ 6 } xl={ 2 }>
                            <Widget title={ "Project Running" }>
                                <>
                                    { project.is_running && <Chip label={ "Is running" } color={ "primary" } /> }
                                    { !project.is_running && <Chip label={ "not running" } /> }</>
                            </Widget>
                        </Grid>

                        <Grid item xs={ 12 } md={ 6 } xl={ 2 }>
                            { latestReport && <Widget title={ "Group" }>
                                { project.group && <Link href={ project.group ? `/group/${ project.group }` : "" }>
                                  <Typography color={ "primary" } variant={ "h2" }>{ project.group }</Typography>
                                </Link> }
                            </Widget> }
                        </Grid>

                        <Grid item xs={ 12 } md={ 6 } xl={ 2 }>
                            <Widget title={ "Tags" }>
                                <Stack direction={ "row" } spacing={ 1 }>
                                    { tagsApi.data?.map((tag: Tag) => <Chip label={ tag.name } key={ tag.id } />) }
                                </Stack>
                            </Widget>
                        </Grid>

                        <Grid item xs={ 12 } md={ 6 } xl={ 2 }>
                            <Widget title={ "URL" }>
                                <Link href={ project.url } target={ "blank" }>
                                    <Typography variant={ "h5" }
                                        color={ "primary" }>{ project.url }</Typography>
                                </Link>
                            </Widget>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Layout>
}

export default ProjectPage;
