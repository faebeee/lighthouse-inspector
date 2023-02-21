import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { Button, Chip, Grid, Stack } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { LighthouseRunReport, Project, Tag } from "@prisma/client";
import { getNavigation, NavigationEntry } from "../src/utils/get-navigation";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { format } from "date-fns";
import { DATE_FORMAT } from "../config";
import { useResource } from "../src/hooks/use-resource";
import { useSelectionList } from "@dreipol/t3-react-utils";
import Box from "@mui/material/Box";
import { useEndpoint } from "../src/hooks/use-endpoint";

export type ReportsPageProps = {
    navigation: NavigationEntry[];
}

export type GridRow = {
    id: number;
    projectId: number;
    url: string;
    group: string | null;
    groupLink: string | null;
    name: string;
    type: string;
    serverResponseTime: number | null;
    performance: number;
    accessibility: number;
    bestPractices: number;
    SEO: number;
    PWA: number;
    report: number;
    reportDate: Date;
    isRunning: boolean;
    interval: boolean;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async () => {
    const navigation = await getNavigation();

    return {
        props: {
            navigation
        }
    };
};

export const ReportsPage = ({ navigation }: ReportsPageProps) => {
    const [ rows, setRows ] = useState<GridRow[]>([]);
    const activeTags = useSelectionList<number>([]);
    const tagsApi = useResource<Tag[]>({ url: `/api/tags` }, 5000);
    const projectsApi = useResource<Project[]>({
        url: `/api/projects`, params: {
            tags: activeTags.list
        }
    }, 5000);
    const desktopReportsApi = useResource<Record<number, LighthouseRunReport>>({
        url: `/api/reports/`,
        params: { type: "desktop" }
    }, 5000);

    const mobileReportsApi = useResource<Record<number, LighthouseRunReport>>({
        url: `/api/reports/`,
        params: { type: "mobile" }
    }, 5000);

    const inspectEndpoint = useEndpoint<Project[]>({ url: `/api/inspect` }, 2000);
    const onInspectAllClicked = () => {
        inspectEndpoint.call("POST");
    };


    useEffect(() => {
        if (projectsApi.isLoading || desktopReportsApi.isLoading || mobileReportsApi.isLoading) {
            return;
        }

        const data = (projectsApi.data ?? []).reduce((list, project) => {
            if (desktopReportsApi.data?.[project.id]) {
                list.push({
                    id: desktopReportsApi.data?.[project.id].id,
                    projectId: project.id,
                    url: project.url,
                    group: project.group,
                    groupLink: project.group,
                    name: project.name,
                    isRunning: project.is_running,
                    interval: project.interval_reporting,
                    type: desktopReportsApi.data?.[project.id].type,
                    serverResponseTime: desktopReportsApi.data?.[project.id].serverResponseTime,
                    performance: desktopReportsApi.data?.[project.id].performance,
                    accessibility: desktopReportsApi.data?.[project.id].accessibility,
                    bestPractices: desktopReportsApi.data?.[project.id].bestPractices,
                    SEO: desktopReportsApi.data?.[project.id].SEO,
                    PWA: desktopReportsApi.data?.[project.id].PWA,
                    report: desktopReportsApi.data?.[project.id].id,
                    reportDate: desktopReportsApi.data?.[project.id].date
                });
            }
            if (mobileReportsApi.data?.[project.id]) {
                list.push({
                    id: mobileReportsApi.data?.[project.id].id,
                    url: project.url,
                    projectId: project.id,
                    group: project.group,
                    groupLink: project.group,
                    name: project.name,
                    isRunning: project.is_running,
                    interval: project.interval_reporting,
                    type: mobileReportsApi.data?.[project.id].type,
                    serverResponseTime: mobileReportsApi.data?.[project.id].serverResponseTime,
                    performance: mobileReportsApi.data?.[project.id].performance,
                    accessibility: mobileReportsApi.data?.[project.id].accessibility,
                    bestPractices: mobileReportsApi.data?.[project.id].bestPractices,
                    SEO: mobileReportsApi.data?.[project.id].SEO,
                    PWA: mobileReportsApi.data?.[project.id].PWA,
                    report: mobileReportsApi.data?.[project.id].id,
                    reportDate: mobileReportsApi.data?.[project.id].date
                });
            }
            return list;
        }, [] as GridRow[]);

        setRows(data);
    }, [ desktopReportsApi.data, mobileReportsApi.data, projectsApi.data ]);

    const columns: GridColDef[] = [
        {
            field: "reportDate",
            headerName: "Report",
            width: 160,
            renderCell: (params) => (<>{ format(new Date(params.value), DATE_FORMAT) }</>
            )
        },
        { field: "type", headerName: "Type", width: 90 },
        {
            field: "group", headerName: "Group", width: 90,
            renderCell: ({ value }) => <Link href={ `/group/${ value }` }>
                <Button color={ "secondary" } variant={ "text" }>{ value }</Button>
            </Link>
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            renderCell: (params) => <Link href={ `/projects/${ params.row.projectId }` }>
                <Button color={ "secondary" } variant={ "text" }>{ params.value }</Button>
            </Link>
        },
        { field: "isRunning", headerName: "Is Running", flex: 1 },
        { field: "interval", headerName: "Auto Update", flex: 1 },
        { field: "serverResponseTime", headerName: "Speed", flex: 1 },
        { field: "performance", headerName: "Performance", flex: 1 },
        { field: "accessibility", headerName: "Accessibility", flex: 1 },
        { field: "bestPractices", headerName: "Best Practices", flex: 1 },
        { field: "SEO", headerName: "SEO", flex: 1 },
        { field: "PWA", headerName: "PWA", flex: 1 },
        {
            field: "report", headerName: "Report", flex: 1, renderCell: (params) => (<Link target={ "_blank" }
                href={ `/api/reports/${ params.value }` }>
                <Button color={ "secondary" } variant={ "text" }>Open Report</Button>
            </Link>)
        },
    ];
    return <Layout navigation={ navigation } backLink={ "/" } title={ "Lighthouse Inspector" }
        actions={ <>
            <Button onClick={ onInspectAllClicked } disabled={ (inspectEndpoint.data ?? []).length > 0 }>
                Inspect All
            </Button>
            <Link href={ `/projects/new` }>
                <Button fullWidth variant={ "contained" } color={ "primary" }>New</Button>
            </Link>
        </> }>
        <Typography sx={ { mb: 4 } } color={ "textPrimary" } variant={ "h1" }>Projects</Typography>
        <Box py={ 2 }>
            <Stack spacing={ 1 } direction={ "row" }>
                { tagsApi.data?.map((tag) => <Chip label={ tag.name } key={ tag.id }
                    onClick={ () => activeTags.toggleItem(tag.id) }
                    color={ activeTags.has(tag.id) ? "primary" : "default" } />) }
            </Stack>
        </Box>

        <Grid container spacing={ 2 }>
            <DataGrid
                loading={ projectsApi.isLoading || desktopReportsApi.isLoading || mobileReportsApi.isLoading }
                sortModel={ [ { field: "reportDate", sort: "desc" } ] }
                components={ { Toolbar: GridToolbar } }
                autoHeight
                rows={ rows }
                columns={ columns }
                disableSelectionOnClick
            />
        </Grid>
    </Layout>;
};

export default ReportsPage;
