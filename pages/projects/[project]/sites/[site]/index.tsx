import { GetServerSideProps } from "next";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button, CardMedia, Chip, Grid, Stack, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LighthouseRunReport, Project, Site, Tag } from "@prisma/client";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { ActionsList } from "../../../../../src/components/actions-list";
import { Layout } from "../../../../../src/components/layout";
import {
    COLOR,
    DATE_FORMAT,
    SERVER_RESPONSE_TIME_THRESHOLD,
    TIME_TO_INTERACTIVE_THRESHOLD
} from "../../../../../config";
import { Widget } from "../../../../../src/components/widget";
import { SingleStat } from "../../../../../src/components/single-stat";
import { NumericValue } from "../../../../../src/components/numeric-value";
import { StatsChart } from "../../../../../src/components/stats-chart";
import { useResource } from "../../../../../src/hooks/use-resource";
import { getNavigation, NavigationEntry } from "../../../../../src/utils/get-navigation";
import { getSiteById } from "../../../../../src/server/lib/site";
import { getProjectById } from "../../../../../src/server/lib/project";

export type ProjectPageProps = {
    site: Site;
    project: Project;
    navigation: NavigationEntry[];
    desktopReports: LighthouseRunReport[];
    mobileReports: LighthouseRunReport[];
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const site = await getSiteById(parseInt(req.query.site as string));
    if (!site) {
        return {
            notFound: true
        };
    }

    const project = await getProjectById(parseInt(req.query.project as string));
    if (!project) {
        return {
            notFound: true
        };
    }
    const navigation = await getNavigation();

    return {
        props: {
            site,
            project,
            navigation
        }
    };
};

export const ProjectPage = ({
                                site: initialSite,
                                project,
                                navigation
                            }: ProjectPageProps) => {
    const sitesApi = useResource<Site>({
        url: `/api/projects/${ project.id }/sites/${ initialSite.id }`
    }, 2000);
    const site = useMemo(() => sitesApi.data ?? initialSite, [ initialSite, sitesApi.data ]);
    const [ isLoading, setIsLoading ] = useState(initialSite.is_running);
    const [ value, setValue ] = useState<string>("desktop");
    const searchParams = useSearchParams();
    const limit = searchParams.get("limit") ? searchParams.get("limit") : 10;
    const desktopReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${ project.id }/sites/${ initialSite.id }/reports`,
        params: { type: "desktop", limit }
    }, 2000);

    const mobileReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${ project.id }/sites/${ initialSite.id }/reports`,
        params: {
            type: "mobile",
            limit
        }
    }, 2000);

    const tagsApi = useResource<Tag[]>({ url: `/api/projects/${ initialSite.projectId }/tags` });

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

    return <Layout
        backLink={ `/projects/${ site.projectId }` }
        title={ `${ site.name } | Overview` }
        actions={ <>
            <Button href={ `/projects/${ site.projectId }/sites/${ site.id }/data` }>History</Button>
            <ActionsList site={ site } />
        </> }
        navigation={ navigation }>

        <Grid container spacing={ 2 } sx={ { mt: 4 } }>
            <Grid item xs={ 12 } sx={ { position: "relative" } }>
                { latestReport && <>
                    { value === "desktop" && latestReport && <CardMedia component="img"
                      height={ 650 }
                      style={ { objectFit: "cover", objectPosition: "top" } }
                      image={ `/api/reports/${ latestReport.id }/full-screenshot` } /> }
                    { value === "mobile" && latestReport &&
                      <CardMedia component="img"
                        height={ 650 }
                        style={ { objectFit: "cover", objectPosition: "top" } }
                        image={ `/api/reports/${ latestReport.id }/full-screenshot?type=mobile` } /> }
                </> }

                <Widget sx={ { position: "absolute", top: 0, height: "100%", width: "100%" } }>
                    <Typography component={ "p" } variant={ "h1" } textAlign={ "center" }>
                        <Link href={ `/projects/${ project.id }` }>
                            <Typography component={ "p" }
                                variant={ "h3" }
                                color={ "text.secondary" }
                                textAlign={ "center" }>
                                { project.name }
                            </Typography>
                        </Link>
                        { site.name }
                    </Typography>
                </Widget>
            </Grid>

            <Grid item xs={ 12 } container spacing={ 2 }>
                <Grid item xs={ 12 }>
                    <Box sx={ { borderBottom: 1, borderColor: "divider" } }>
                        <Tabs value={ value } onChange={ handleChange }>
                            <Tab label="Desktop" value={ "desktop" } />
                            <Tab label="Mobile" value={ "mobile" } />
                        </Tabs>
                    </Box>
                </Grid>
                <Grid item container spacing={ 2 } xs={ 12 } md={ 12 } xl={ 6 }>
                    <Grid item xs={ 12 } md={ 6 }>
                        <Widget title={ "Initial Server Response Time" }>
                            { latestReport && <NumericValue goodThreshold={ SERVER_RESPONSE_TIME_THRESHOLD.GOOD }
                              poorThreshold={ SERVER_RESPONSE_TIME_THRESHOLD.POOR }
                              value={ latestReport.serverResponseTime ?? 0 }
                              unit={ "ms" } /> }
                        </Widget>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <Widget title={ "Time to interactive" }>
                            { latestReport && <NumericValue goodThreshold={ TIME_TO_INTERACTIVE_THRESHOLD.GOOD }
                              poorThreshold={ TIME_TO_INTERACTIVE_THRESHOLD.POOR }
                              value={ latestReport.tti ?? 0 }
                              unit={ "ms" } /> }
                        </Widget>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 } xl={ 4 }>
                        { latestReport && <Widget title={ "Performance" }>
                          <SingleStat
                            width={ 300 }
                            height={ 240 }
                            value={ latestReport.performance }
                            label={ "Performance" } />
                        </Widget> }
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 } xl={ 4 }>
                        { latestReport && <Widget title={ "Accessibility" }>
                          <SingleStat
                            width={ 300 }
                            height={ 240 }
                            value={ latestReport.accessibility }
                            label={ "accessibility" } />
                        </Widget> }
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 } xl={ 4 }>
                        { latestReport && <Widget title={ "Best Practices" }>
                          <SingleStat
                            width={ 300 }
                            height={ 240 }
                            value={ latestReport.bestPractices }
                            label={ "bestPractices" } />
                        </Widget> }
                    </Grid>
                </Grid>
                <Grid item container spacing={ 2 } xs={ 12 } md={ 12 } xl={ 6 }>
                    <Grid item xs={ 12 } md={ 6 }>
                        <Widget title={ "URL" }>
                            <Link href={ site.url } target={ "blank" }>
                                <Typography variant={ "h5" }
                                    color={ "primary" }>{ site.url }</Typography>
                            </Link>
                        </Widget>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        { latestReport && <Widget title={ "Report" }>
                          <Link href={ `/api/reports/${ latestReport.id }` } target={ "blank" }>
                            <Typography variant={ "h6" }
                              color={ "primary" }>{ format(new Date(latestReport.date), DATE_FORMAT) }</Typography>
                          </Link>
                        </Widget> }
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <Widget title={ "Project Running" }>
                            <>
                                { site.is_running && <Chip label={ "Is running" } color={ "primary" } /> }
                                { !site.is_running && <Chip label={ "not running" } /> }</>
                        </Widget>
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 }>
                        <Widget title={ "Tags" }>
                            <Stack direction={ "row" } spacing={ 1 }>
                                { tagsApi.data?.map((tag: Tag) => <Chip label={ tag.name } key={ tag.id } />) }
                            </Stack>
                        </Widget>
                    </Grid>
                </Grid>


                <Grid container item xs={ 12 } spacing={ 2 }>

                </Grid>
                <Grid container item xs={ 12 } spacing={ 2 }>


                    <Grid item xs={ 12 } md={ 6 }>
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
            </Grid>
        </Grid>
    </Layout>;
};

export default ProjectPage;