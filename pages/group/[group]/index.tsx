import { GetServerSideProps } from "next";
import { Layout } from "../../../src/components/layout";
import { Button, Grid, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import React, { useMemo, useState } from "react";
import { LighthouseRunReport, Project } from "@prisma/client";
import axios from "axios";
import { getNavigation, NavigationEntry } from "../../../src/utils/get-navigation";
import { useResource } from "../../../src/hooks/use-resource";
import { useEndpoint } from "../../../src/hooks/use-endpoint";
import { NumericValue } from "../../../src/components/numeric-value";
import { Widget } from "../../../src/components/widget";
import {
    AUDIT_HISTORY_CHART_LINES,
    SERVER_HISTORY_CHART_LINES,
    SERVER_RESPONSE_TIME_THRESHOLD,
    TIME_TO_INTERACTIVE_THRESHOLD
} from "../../../config";
import { ProjectResultHistoryChart } from "../../../src/components/project-result-history-chart";

export type ReportsPageProps = {
    navigation: NavigationEntry[];
    group: string;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async (req) => {
    const navigation = await getNavigation();

    return {
        props: {
            navigation,
            group: req.query.group as string
        }
    };
};

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
        axios.post(`/api/group/${ group }/inspect`)
            .finally(() => {
                setIsLoading(false);
            });
    };

    const desktopReports = useMemo(() => reportsApi.data ?? {}, [ reportsApi.data ]);

    return <Layout navigation={ navigation } title={ group }
        actions={ <>
            <Button variant={ "text" } onClick={ runGroup }
                disabled={ (inspectEndpoint.data ?? []).length > 0 }>Run</Button>
        </> }>
        <Typography color={ "text.primary" } variant="h4">Latest Reports</Typography>

        <Grid container spacing={ 2 }>
            { projectsApi.data?.map((project) => {
                const report = desktopReports[project.id];
                if (!report) {
                    return null;
                }
                return (
                    <Grid container item xs={ 12 } spacing={ 2 }>
                        <Grid item xs={ 12 } lg={ 6 } xl={ 2 }>
                            <Widget title={ <Link href={ `/projects/${ project.id }` }>
                                <Typography color={ "secondary" }>{ project.name }</Typography>
                            </Link> }>

                                <img width={ "100%" }
                                    src={ `/api/reports/${ report?.id }/thumbnail` }
                                    alt={ "Report" } />
                            </Widget>
                        </Grid>

                        <Grid item xs={ 12 } lg={ 6 } xl={ 2 }>
                            <Widget title={ "Stats" }>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={ <Typography variant={ "subtitle2" } color={ "text.primary" }>
                                                Server Response Time
                                            </Typography> }
                                            secondary={ <NumericValue
                                                variant={ "subtitle1" }
                                                goodThreshold={ SERVER_RESPONSE_TIME_THRESHOLD.GOOD }
                                                poorThreshold={ SERVER_RESPONSE_TIME_THRESHOLD.POOR }
                                                value={ report.serverResponseTime ?? 0 }
                                                unit={ "ms" } /> } />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemText
                                            primary={ <Typography variant={ "subtitle2" } color={ "text.primary" }>
                                                Time To Interactive
                                            </Typography> }
                                            secondary={ <NumericValue
                                                variant={ "subtitle1" }
                                                goodThreshold={ TIME_TO_INTERACTIVE_THRESHOLD.GOOD }
                                                poorThreshold={ TIME_TO_INTERACTIVE_THRESHOLD.POOR }
                                                value={ report.tti ?? 0 }
                                                unit={ "ms" } /> } />
                                    </ListItem>
                                </List>
                            </Widget>
                        </Grid>

                        <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
                            <Widget title={ "Initial Server Response Time" }>
                                <ProjectResultHistoryChart lines={ AUDIT_HISTORY_CHART_LINES } project={ project } />
                            </Widget>
                        </Grid>
                        <Grid item xs={ 12 } lg={ 6 } xl={ 4 }>
                            <Widget title={ "Initial Server Response Time" }>
                                <ProjectResultHistoryChart lines={ SERVER_HISTORY_CHART_LINES } project={ project } />
                            </Widget>
                        </Grid>
                    </Grid>
                );
            }) }
        </Grid>
    </Layout>;
};

export default ReportsPage;
