import { GetServerSideProps } from "next";
import React, { useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Card, Grid, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LighthouseRunReport, Project, Site } from "@prisma/client";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import Divider from "@mui/material/Divider";
import { useResource } from "../../../../../src/hooks/use-resource";
import { getSiteById } from "../../../../../src/server/lib/site";
import { getNavigation, NavigationEntry } from "../../../../../src/utils/get-navigation";
import { useEndpoint } from "../../../../../src/hooks/use-endpoint";
import { AUDIT_HISTORY_CHART_LINES, DATE_FORMAT, SERVER_HISTORY_CHART_LINES } from "../../../../../config";
import { ActionsList } from "../../../../../src/components/actions-list";
import { Layout } from "../../../../../src/components/layout";
import { Widget } from "../../../../../src/components/widget";
import { HistoryChart } from "../../../../../src/components/history-chart";

export type ProjectPageProps = {
    site: Site;
    navigation: NavigationEntry[];
    projects: Project[];
    desktopReports: LighthouseRunReport[];
    mobileReports: LighthouseRunReport[];
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const site = await getSiteById(parseInt(req.query.project as string));
    if (!site) {
        return {
            notFound: true
        };
    }
    const navigation = await getNavigation();

    return {
        props: {
            site,
            navigation
        }
    };
};

export const ProjectPage = ({
                                site: initialSite,
                                navigation
                            }: ProjectPageProps) => {
    const sitesApi = useResource<Site>({
        url: `/api/projects/${ initialSite.projectId }/sites/${ initialSite.id }`
    }, 2000);
    const site = useMemo(() => sitesApi.data ?? initialSite, [ initialSite, sitesApi.data ]);
    const [ isLoading, setIsLoading ] = useState(site.is_running);
    const [ value, setValue ] = useState<string>("desktop");
    const searchParams = useSearchParams();
    const limit = searchParams.get("limit") ? searchParams.get("limit") : 10;
    const desktopReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${ site.projectId }/sites/${ site.id }/reports`,
        params: { type: "desktop", limit }
    }, 2000);

    const mobileReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${ site.projectId }/sites/${ site.id }/reports`,
        params: { type: "mobile", limit }
    }, 2000);

    const inspectEndpoint = useEndpoint<Project[]>({ url: `/api/inspect` }, 2000);

    const desktopReports = useMemo(() => (!!desktopReportsApi.data && desktopReportsApi.data.length) > 0 ? (desktopReportsApi.data ?? []) : [], [ desktopReportsApi ]);
    const mobileReports = useMemo(() => (!!mobileReportsApi.data && mobileReportsApi.data.length) > 0 ? (mobileReportsApi.data ?? []) : [], [ mobileReportsApi ]);


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const onRunReport = () => {
        setIsLoading(true);
        axios.post(`/api/projects/${ site.projectId }/sites/${ site.id }/inspect`)
            .finally(() => {
                setIsLoading(false);
            });
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID" },
        {
            field: "date",
            headerName: "date",
            flex: 1,
            renderCell: (data) => <Typography>{ format(new Date(data.value), DATE_FORMAT) }</Typography>
        },
        { field: "tti", headerName: "Time To Interactive", flex: 1 },
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


    return <Layout
        backLink={ `/projects/${ site.projectId }` }
        title={ `${ site.name } | Data` }
        actions={ <>
            <Button href={ `/projects/${ site.projectId }/sites/${ site.id }` }>Overview</Button>
            <Button href={ `/projects/${ site.projectId }/sites/${ site.id }/data` }>Data</Button>
            <Divider orientation={ "vertical" } variant={ "fullWidth" } color={ "primary" } />
            <ActionsList site={ site } />
            <Button variant={ "contained" } disabled={ isLoading || (inspectEndpoint.data ?? []).length > 0 }
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

                    <Grid item xs={ 12 }>
                        <Widget title={ "Stats History" }>
                            { value === "desktop" && desktopReports.length > 0 &&
                              <HistoryChart keys={ AUDIT_HISTORY_CHART_LINES }
                                data={ [ ...desktopReports ].reverse() } /> }

                            { value === "mobile" && mobileReports.length > 0 &&
                              <HistoryChart keys={ AUDIT_HISTORY_CHART_LINES }
                                data={ [ ...mobileReports ].reverse() } /> }
                        </Widget>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Widget title={ "Response History" }>
                            { value === "desktop" &&
                              <HistoryChart keys={ SERVER_HISTORY_CHART_LINES }
                                data={ [ ...desktopReports ].reverse() } /> }

                            { value === "mobile" &&
                              <HistoryChart keys={ SERVER_HISTORY_CHART_LINES }
                                data={ [ ...mobileReports ].reverse() } /> }
                        </Widget>
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
    </Layout>;
};

export default ProjectPage;
