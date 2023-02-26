import { GetServerSideProps } from "next";
import { Layout } from "../../src/components/layout";
import {
    Button,
    Card,
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
import React, { useMemo, useState } from "react";
import { LighthouseRunReport, Project } from "@prisma/client";
import axios from "axios";
import { getNavigation, NavigationEntry } from "../../src/utils/get-navigation";
import { DATE_FORMAT } from "../../config";
import { format } from "date-fns";
import { ProjectCard } from "../../src/components/project-card";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useResource } from "../../src/hooks/use-resource";
import { useEndpoint } from "../../src/hooks/use-endpoint";

export type ReportsPageProps = {
    navigation: NavigationEntry[];
    group: string;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async (req) => {

    const navigation = await getNavigation();

    return {
        props: {
            navigation,
            group: req.query.group as string,
        }
    }
}

export const ReportsPage = ({ navigation, group }: ReportsPageProps) => {
    const projectsApi = useResource<Project[]>({ url: `/api/group/${ group }` }, 1000);
    const reportsApi = useResource<Record<number, LighthouseRunReport>>({
        url: `/api/reports/`,
        params: { type: "desktop" }
    }, 1000);
    const [ isLoading, setIsLoading ] = useState(false);
    const inspectEndpoint = useEndpoint<Project[]>({ url: `/api/inspect` }, 2000);

    const runGroup = () => {
        setIsLoading(true);
        axios.post(`/api/group/${group}/inspect`)
            .finally(() => {
                setIsLoading(false);
            })
    }

    const desktopReports = useMemo(() => reportsApi.data ?? {}, [reportsApi.data]);

    return <Layout navigation={navigation} title={group}
        actions={<>
            <Button variant={'text'} onClick={runGroup} disabled={ (inspectEndpoint.data ?? []).length > 0}>Run</Button>
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
                                        <TableCell>TTI</TableCell>
                                        <TableCell>Response Time</TableCell>
                                        <TableCell>Performance</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projectsApi.data?.map((project) => {
                                        const report = desktopReports[project.id];
                                        return (<TableRow key={project.id}>
                                            <TableCell>
                                                <Link href={ `/projects/${ project.id }` }>
                                                    <Typography color={ "secondary" }>{ project.name }</Typography>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={ project.url } target={ "_blank" }>
                                                    <Typography color={ "secondary" }>{ project.url }</Typography>
                                                </Link>
                                            </TableCell>
                                            <TableCell>{ Math.round(report?.tti ?? 0) }ms</TableCell>
                                            <TableCell>{ Math.round(report?.serverResponseTime ?? 0) }ms</TableCell>
                                            <TableCell>{ report?.performance }</TableCell>
                                            <TableCell>{ report?.type }</TableCell>
                                            <TableCell>{ report && format(new Date(report.date), DATE_FORMAT) }</TableCell>
                                        </TableRow>)
                                    }) }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={ 12 } sx={ { mt: 4 } }>
                <Typography variant='h4' color={ 'textPrimary' }>Sites</Typography>
            </Grid>

            { projectsApi.data?.map((project) => {
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
