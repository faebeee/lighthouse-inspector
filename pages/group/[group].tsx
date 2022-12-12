import { GetServerSideProps } from "next";
import { Layout } from "../../src/components/layout";
import { getLatestReportsForAllProjects, getProjectsByGroup } from "../../src/server/lib/project-services";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
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
import React, { useState } from "react";
import { LighthouseRunReport, Project } from "@prisma/client";
import { transformForSerialisation } from "../../src/server/lib/lighthousereport-services";
import { Stack } from "@mui/system";
import axios from "axios";
import { getNavigation, NavigationEntry } from "../../src/utils/get-navigation";
import { DATE_FORMAT } from "../../config";
import { format } from "date-fns";

export type ReportsPageProps = {
    projects: Project[];
    navigation: NavigationEntry[];
    group: string;
    desktopReports: Record<number, LighthouseRunReport>;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async (req) => {
    const projects = await getProjectsByGroup(req.query.group as string);
    const desktopReports = await getLatestReportsForAllProjects('desktop');
    const navigation = await getNavigation();

    return {
        props: {
            projects: projects,
            navigation,
            group: req.query.group as string,
            desktopReports: Object.entries(desktopReports).reduce((acc, [id, report]) => {
                // @ts-ignore
                acc[id] = report ? transformForSerialisation(report) : null;
                return acc;
            }, {} as Record<number, LighthouseRunReport>),
        }
    }
}

export const ReportsPage = ({ projects, navigation, desktopReports, group }: ReportsPageProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const runGroup = () => {
        setIsLoading(true);
        axios.post(`/api/group/${group}/inspect`)
            .finally(() => {
                setIsLoading(false);
            })
    }
    return <Layout navigation={navigation} title={group}
        actions={<>
            <Button variant={'contained'} onClick={runGroup}>Run</Button>
        </>}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant='h4'>Latest Reports</Typography>


                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Project</TableCell>
                                        <TableCell>URL</TableCell>
                                        <TableCell>Performance</TableCell>
                                        <TableCell>Accessibility</TableCell>
                                        <TableCell>Best Practices</TableCell>
                                        <TableCell>SEO</TableCell>
                                        <TableCell>PWA</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projects.map((project) => {
                                        const report = desktopReports[project.id];
                                        if(!report){
                                            return null;
                                        }
                                        return (<TableRow key={project.id}>
                                            <TableCell>
                                                <Link href={`/projects/${project.id}`}>
                                                    <Typography color={'secondary'}>{project.name}</Typography>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={project.url} target={'_blank'}>
                                                    <Typography color={'secondary'}>{project.url}</Typography>
                                                </Link>
                                            </TableCell>
                                            <TableCell>{report.performance}</TableCell>
                                            <TableCell>{report.accessibility}</TableCell>
                                            <TableCell>{report.bestPractices}</TableCell>
                                            <TableCell>{report.SEO}</TableCell>
                                            <TableCell>{report.PWA}</TableCell>
                                            <TableCell>{report.type}</TableCell>
                                            <TableCell>{format(new Date(report.date), DATE_FORMAT)}</TableCell>
                                        </TableRow>)
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Layout>
}

export default ReportsPage;
