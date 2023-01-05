import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { getLatestReportsForAllProjects, getProjects } from "../src/server/lib/project-services";
import {
    Button,
    Card,
    CardActions,
    CardContent, CardMedia, Chip,
    Grid, ListItemText, MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import React from "react";
import { LighthouseRunReport, Project } from "@prisma/client";
import { transformForSerialisation } from "../src/server/lib/lighthousereport-services";
import { Stack } from "@mui/system";
import format from "date-fns/format";
import { DATE_FORMAT } from "../config";
import { getNavigation, NavigationEntry } from "../src/utils/get-navigation";
import { ProjectCard } from "../src/components/project-card";

export type ReportsPageProps = {
    navigation: NavigationEntry[];
    projects: Project[];
    desktopReports: Record<number, LighthouseRunReport>;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async () => {
    const navigation = await getNavigation();
    const projects = await getProjects();
    const desktopReports = await getLatestReportsForAllProjects('desktop');

    return {
        props: {
            navigation,
            projects,
            desktopReports: Object.entries(desktopReports).reduce((acc, [id, report]) => {
                // @ts-ignore
                acc[id] = report ? transformForSerialisation(report) : null;
                return acc;
            }, {} as Record<number, LighthouseRunReport>),
        }
    }
}

export const ReportsPage = ({ navigation, projects, desktopReports }: ReportsPageProps) => {
    return <Layout navigation={ navigation } showBack={ false } showSidebar={ false } title={ 'Lighthouse Inspector' }
        actions={ <Link href={ `/projects/new` }>
            <Button fullWidth variant={ 'contained' } color={ 'primary' }>New</Button>
        </Link> }>
        <Typography sx={ { mb: 2 } } color={ 'textPrimary' } variant={ 'h1' }>Projects</Typography>
        <Grid container spacing={ 2 }>
            { projects.map((project) => {
                const report = desktopReports[project.id];
                return (
                    <Grid key={ project.id } item xs={ 12 } lg={ 6 } xl={ 3 }>
                        <ProjectCard project={ project } report={ report }/>
                    </Grid>
                )
            }) }
        </Grid>
    </Layout>
}

export default ReportsPage;
