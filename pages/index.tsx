import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { getLatestReportsForAllProjects, getProjects } from "../src/server/lib/project-services";
import {
    Button,
    Card,
    CardActions,
    CardContent, CardMedia, Chip,
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
import { Stack } from "@mui/system";
import format from "date-fns/format";
import { DATE_FORMAT } from "../config";
import { getNavigation, NavigationEntry } from "../src/utils/get-navigation";

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
    return <Layout navigation={navigation}>
        <Typography color={'white'} variant={'h1'}>Projects</Typography>
        <Grid container spacing={2}>
            {projects.map((project) => {
                const report = desktopReports[project.id];
                return (
                    <Grid key={project.id} item xs={12} lg={6} xl={3}>
                        <Card>
                            <CardMedia component="img"
                                height={200} 
                                image={`/api/reports/${report.id}/thumbnail`}>

                            </CardMedia>
                            <CardContent>
                                <Stack direction={'row'}>
                                    <Typography variant={'h5'}>{project.name}</Typography>
                                    {project.group && <Link href={`/group/${project.group}`}>
                                        <Chip color={'primary'} sx={{ ml: 2 }} label={project.group} />
                                    </Link>}
                                </Stack>

                                <Typography variant={'body2'}>{project.url}</Typography>
                                {report?.date && <Typography
                                    variant={'body2'}>{format(new Date(report.date), DATE_FORMAT)}</Typography>}
                                {report && <TableContainer>
                                    <Table>
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
                                            <TableRow>
                                                <TableCell>{report.performance}</TableCell>
                                                <TableCell>{report.accessibility}</TableCell>
                                                <TableCell>{report.bestPractices}</TableCell>
                                                <TableCell>{report.SEO}</TableCell>
                                                <TableCell>{report.PWA}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>}
                            </CardContent>
                            <CardActions>
                                <Link
                                    href={`/projects/${project.id}`}>
                                    <Button color={'secondary'} variant={'text'}>View Details</Button>
                                </Link>
                                {report && <Link target={'_blank'}
                                    href={`/api/reports/${report!.htmlReportFile}`}>
                                    <Button color={'secondary'} variant={'text'}>Open Report</Button>
                                </Link>}
                            </CardActions>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    </Layout>
}

export default ReportsPage;
