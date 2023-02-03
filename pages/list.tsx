import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { getLatestReportsForAllProjects, getProjects } from "../src/server/lib/project-services";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import React from "react";
import { LighthouseRunReport, Project } from "@prisma/client";
import { transformForSerialisation } from "../src/server/lib/lighthousereport-services";
import { getNavigation, NavigationEntry } from "../src/utils/get-navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { DATE_FORMAT } from "../config";

export type ReportsPageProps = {
    navigation: NavigationEntry[];
    projects: Project[];
    desktopReports: Record<number, LighthouseRunReport>;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async () => {
    const navigation = await getNavigation();
    const projects = await getProjects();
    const desktopReports = await getLatestReportsForAllProjects("desktop");
    const mobileReports = await getLatestReportsForAllProjects("mobile");

    return {
        props: {
            navigation,
            projects,
            desktopReports: Object.entries(desktopReports).reduce((acc, [ id, report ]) => {
                // @ts-ignore
                acc[id] = report ? transformForSerialisation(report) : null;
                return acc;
            }, {} as Record<number, LighthouseRunReport>),
            mobileReports: Object.entries(mobileReports).reduce((acc, [ id, report ]) => {
                // @ts-ignore
                acc[id] = report ? transformForSerialisation(report) : null;
                return acc;
            }, {} as Record<number, LighthouseRunReport>)
        }
    };
};

export const ReportsPage = ({ navigation, projects, desktopReports }: ReportsPageProps) => {
    const rows = projects.map((project) => ({
        id: project.id,
        url: project.url,
        group: project.group,
        groupLink: project.group,
        name: project.name,
        performance: desktopReports[project.id].performance,
        accessibility: desktopReports[project.id].accessibility,
        bestPractices: desktopReports[project.id].bestPractices,
        SEO: desktopReports[project.id].SEO,
        PWA: desktopReports[project.id].PWA,
        report: desktopReports[project.id].id,
        reportDate: desktopReports[project.id].date
    }));
    const columns: GridColDef[] = [
        {
            field: "reportDate",
            headerName: "Report",
            width: 120,
            renderCell: (params) => (<>{ format(new Date(params.value), DATE_FORMAT) }</>
            )
        },
        { field: "group", headerName: "Group", width: 90 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            renderCell: (params) => <Link href={ `/projects/${ params.row.id }` }>
                <Button color={ "secondary" } variant={ "text" }>{ params.value }</Button>
            </Link>
        },
        { field: "url", headerName: "Url", flex: 1 },
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
        {
            field: "groupLink",
            headerName: "Group",
            flex: 1,
            renderCell: ({ value }) => (value ? <Link href={ `/group/${ value }` }>
                <Button color={ "secondary" } variant={ "text" }>View Group</Button>
            </Link> : null)
        }

    ];
    return <Layout navigation={ navigation } backLink={ "/" } title={ "Lighthouse Inspector" }
        actions={ <Link href={ `/projects/new` }>
            <Button fullWidth variant={ "contained" } color={ "primary" }>New</Button>
        </Link> }>
        <Typography sx={ { mb: 4 } } color={ "textPrimary" } variant={ "h1" }>Projects</Typography>
        <Grid container spacing={ 2 }>
            <DataGrid
                autoHeight
                rows={ rows }
                columns={ columns }
                disableSelectionOnClick
            />
        </Grid>
    </Layout>;
};

export default ReportsPage;
