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

export type ReportsPageProps = {
    projects: Project[];
    group: string;
    desktopReports: Record<number, LighthouseRunReport>;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async (req) => {
    const projects = await getProjectsByGroup(req.query.group as string);
    const desktopReports = await getLatestReportsForAllProjects('desktop');

    return {
        props: {
            projects: projects,
            group: req.query.group as string,
            desktopReports: Object.entries(desktopReports).reduce((acc, [ id, report ]) => {
                // @ts-ignore
                acc[id] = report ? transformForSerialisation(report) : null;
                return acc;
            }, {} as Record<number, LighthouseRunReport>),
        }
    }
}

export const ReportsPage = ({ projects, desktopReports, group }: ReportsPageProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const runGroup = () => {
        setIsLoading(true);
        axios.post(`/api/group/${ group }/inspect`)
            .finally(() => {
                setIsLoading(false);
            })
    }
    return <Layout projects={ projects } title={ group } actions={<>
        <Button variant={'contained'} onClick={ runGroup }>Run</Button>

    </>}>
        <Grid container spacing={ 2 }>
            { projects.map((project) => {
                const report = desktopReports[project.id];
                return (
                    <Grid key={ project.id } item xs={ 12 } lg={ 6 } xl={ 3 }>
                        <Card>
                            <CardContent>
                                <Stack direction={ 'row' }>
                                    <Typography variant={ 'h5' }>{ project.name }</Typography>
                                    { project.group &&
                                        <Chip color={ 'primary' } sx={ { ml: 2 } } label={ project.group }/> }
                                </Stack>

                                <Typography variant={ 'body1' }>{ project.url }</Typography>
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
