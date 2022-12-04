import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { getLatestReportsForAllProjects, getProjects } from "../src/server/lib/project-services";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
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

export type ReportsPageProps = {
    projects: Project[];
    desktopReports: Record<number, LighthouseRunReport>;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async () => {
    const projects = await getProjects();
    const desktopReports = await getLatestReportsForAllProjects('desktop');

    return {
        props: {
            projects: projects,
            desktopReports: Object.entries(desktopReports).reduce((acc, [ id, report ]) => {
                // @ts-ignore
                acc[id] = report ? transformForSerialisation(report) : null;
                return acc;
            }, {} as Record<number, LighthouseRunReport>),
        }
    }
}

export const ReportsPage = ({ projects, desktopReports }: ReportsPageProps) => {
    return <Layout projects={ projects }>
        <Typography color={ 'white' } variant={ 'h1' }>Projects</Typography>
        <Grid container spacing={ 2 }>
            { projects.map((project) => {
                const report = desktopReports[project.id];
                return (
                    <Grid key={ project.id } item xs={ 12 } lg={ 6 } xl={ 3 }>
                        <Card>
                            <CardContent>
                                <Typography variant={ 'h5' }>{ project.name }</Typography>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Performance</TableCell>
                                                <TableCell>Accessibility</TableCell>
                                                <TableCell>Best Practices</TableCell>
                                                <TableCell>SEO</TableCell>
                                                <TableCell>PWA</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>{ report.performance }</TableCell>
                                            <TableCell>{ report.accessibility }</TableCell>
                                            <TableCell>{ report.bestPractices }</TableCell>
                                            <TableCell>{ report.SEO }</TableCell>
                                            <TableCell>{ report.PWA }</TableCell>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardActions>
                                <Link
                                    href={ `/projects/${ project.id }` }>
                                    <Button color={ 'secondary' } variant={ 'text' }>View Details</Button>
                                </Link>
                                <Link target={ '_blank' }
                                    href={ `/api/reports/${ report!.htmlReportFile }` }>
                                    <Button color={ 'secondary' } variant={ 'text' }>Open Report</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            }) }
        </Grid>
    </Layout>
}

export default ReportsPage;
