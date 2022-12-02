import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { getProjects } from "../src/server/utils/get-projects";
import { getReportsByDomainGroup } from "../src/server/utils/get-reports-by-domain-group";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
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
import { getReportsByProjectName } from "../src/server/utils/get-reports-by-project";
import { ReportResult } from "./reports/[project]";
import Box from "@mui/material/Box";

export type ReportsPageProps = {
    projects: string[];
    reportsByDomain: Awaited<ReturnType<typeof getReportsByDomainGroup>>
    reportsByProject: Awaited<ReturnType<typeof getReportsByProjectName>>
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async () => {
    const projects = await getProjects();
    const reportsByDomain = await getReportsByDomainGroup();
    const reportsByProject = await getReportsByProjectName();
    return {
        props: {
            projects: projects,
            reportsByDomain,
            reportsByProject,
        }
    }
}

export const ReportsPage = ({ projects, reportsByProject, reportsByDomain }: ReportsPageProps) => {
    return <Layout projects={ projects }>
        <Box sx={ { mb: 10 } }>
            <Typography color={ 'white' } variant={ 'h1' }>Domains</Typography>
            <Grid container spacing={ 2 }>
                { Object.entries(reportsByDomain).map(([ domain, result ]) => {
                    const report = result[result.length - 1] as ReportResult;
                    return (
                        <Grid key={ domain } item xs={ 12 } lg={ 6 } xl={ 3 }>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={ report.imageBase64 }
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography variant={ 'h5' }>{ domain }</Typography>
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
                                                <TableCell>{ report.seo }</TableCell>
                                                <TableCell>{ report.pwa }</TableCell>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                                <CardActions>
                                    <Link
                                        href={ `/domain/${ domain }` }>
                                        <Button color={ 'secondary' } variant={ 'text' }>View Domain</Button>
                                    </Link>
                                    <Link target={ '_blank' }
                                        href={ `/api/${ report.projectName }/${ report.htmlReportFile }` }>
                                        <Button color={ 'secondary' } variant={ 'text' }>Open Report</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }) }
            </Grid>
        </Box>
        <Typography color={ 'white' } variant={ 'h1' }>Projects</Typography>
        <Grid container spacing={ 2 }>
            { Object.entries(reportsByProject).map(([ domain, result ]) => {
                const report = result[result.length - 1] as ReportResult;
                return (
                    <Grid key={ domain } item xs={ 12 } lg={ 6 } xl={ 3 }>
                        <Card>
                            <CardMedia
                                component="img"
                                height="240"
                                image={ report.imageBase64 }
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography variant={ 'h5' }>{ domain }</Typography>
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
                                            <TableCell>{ report.seo }</TableCell>
                                            <TableCell>{ report.pwa }</TableCell>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardActions>
                                <Link
                                    href={ `/reports/${ report.projectName }` }>
                                    <Button color={ 'secondary' } variant={ 'text' }>View Details</Button>
                                </Link>
                                <Link target={ '_blank' }
                                    href={ `/api/${ report.projectName }/${ report.htmlReportFile }` }>
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
