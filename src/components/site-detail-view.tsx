import {Card, CardMedia, Chip, Grid, Tab, Tabs} from "@mui/material";
import {Widget} from "./widget";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Box from "@mui/material/Box";
import {NumericValue} from "./numeric-value";
import {
    AUDIT_HISTORY_CHART_LINES,
    COLOR,
    DATE_FORMAT, SERVER_HISTORY_CHART_LINES,
    SERVER_RESPONSE_TIME_THRESHOLD,
    TIME_TO_INTERACTIVE_THRESHOLD
} from "../../config.web";
import {SingleStat} from "./single-stat";
import {format} from "date-fns";
import {StatsChart} from "./stats-chart";
import React, {useMemo, useState} from "react";
import {useResource} from "../hooks/use-resource";
import {LighthouseRunReport, Project, Site} from "@prisma/client";
import {useSearchParams} from "next/navigation";
import {HistoryChart} from "./history-chart";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

export type SiteDetailViewProps = {
    project: Project;
    site: Site;
}
export const SiteDetailView = ({project, site}: SiteDetailViewProps) => {
    const [value, setValue] = useState<string>("desktop");
    const searchParams = useSearchParams();
    const limit = searchParams.get("limit") ? searchParams.get("limit") : 10;

    const desktopReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${project.id}/sites/${site.id}/reports`,
        params: {type: "desktop", limit}
    });

    const mobileReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${project.id}/sites/${site.id}/reports`,
        params: {
            type: "mobile",
            limit
        }
    });

    const desktopReports = useMemo(() => (!!desktopReportsApi.data && desktopReportsApi.data.length) > 0 ? (desktopReportsApi.data ?? []) : [], [desktopReportsApi]);
    const mobileReports = useMemo(() => (!!mobileReportsApi.data && mobileReportsApi.data.length) > 0 ? (mobileReportsApi.data ?? []) : [], [mobileReportsApi]);

    const latestReport = useMemo(() => {
        if (value === "desktop") {
            return (desktopReports.length > 0 ? desktopReports[0] : null);
        }
        return (mobileReports.length > 0 ? mobileReports[0] : null);
    }, [value, desktopReports, mobileReports]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    const columns: GridColDef[] = [
        {field: "id", headerName: "ID"},
        {
            field: "date",
            headerName: "date",
            flex: 1,
            renderCell: (data) => <Typography>{format(new Date(data.value), DATE_FORMAT)}</Typography>
        },
        {field: "tti", headerName: "Time To Interactive", flex: 1},
        {field: "serverResponseTime", headerName: "Speed", flex: 1},
        {field: "performance", headerName: "performance", flex: 1},
        {field: "accessibility", headerName: "accessibility", flex: 1},
        {field: "bestPractices", headerName: "bestPractices", flex: 1},
        {field: "seo", headerName: "seo", flex: 1},
        {field: "pwa", headerName: "pwa", flex: 1},
        {
            field: "htmlReportFile",
            headerName: "htmlReportFile",
            flex: 1,
            renderCell: (data) => <Link target={"_blank"}
                                        href={`/api/reports/${data.row.id}`}>
                <Typography color={"secondary"}>
                    HTML Report
                </Typography>
            </Link>
        }
    ];

    return <Grid container spacing={2} sx={{mt: 4}}>
        <Grid item xs={12} sx={{position: "relative"}}>
            {latestReport && <>
                {value === "desktop" && latestReport && <CardMedia component="img"
                                                                   height={650}
                                                                   style={{objectFit: "contain", objectPosition: "top"}}
                                                                   image={`/api/reports/${latestReport.id}/thumbnail`}/>}
                {value === "mobile" && latestReport &&
                    <CardMedia component="img"
                               height={650}
                               style={{objectFit: "contain", objectPosition: "top"}}
                               image={`/api/reports/${latestReport.id}/thumbnail?type=mobile`}/>}
            </>}

            

        </Grid>

        <Grid item xs={12} container spacing={2}>

            <Grid item xs={12}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Desktop" value={"desktop"}/>
                        <Tab label="Mobile" value={"mobile"}/>
                    </Tabs>
                </Box>
            </Grid>
            <Grid item container spacing={2} xs={12} md={12} xl={6}>

                <Grid item xs={12} md={6}>
                    <Widget title={"URL"}>
                        <Link href={site.url} target={"blank"}>
                            <Typography variant={"h5"}
                                        color={"primary"}>{site.url}</Typography>
                        </Link>
                    </Widget>
                </Grid>

                <Grid item xs={12} md={6}>
                    {latestReport && <Widget title={"Report"}>
                        <Link href={`/api/reports/${latestReport.id}`} target={"blank"}>
                            <Typography variant={"h6"}
                                        color={"primary"}>{format(new Date(latestReport.date), DATE_FORMAT)}</Typography>
                        </Link>
                    </Widget>}
                </Grid>


                <Grid item xs={12} md={6} xl={4}>
                    {latestReport && <Widget title={"Performance"}>
                        <SingleStat
                            width={300}
                            height={240}
                            value={latestReport.performance}
                            label={"Performance"}/>
                    </Widget>}
                </Grid>

                <Grid item xs={12} md={6} xl={4}>
                    {latestReport && <Widget title={"Accessibility"}>
                        <SingleStat
                            width={300}
                            height={240}
                            value={latestReport.accessibility}
                            label={"accessibility"}/>
                    </Widget>}
                </Grid>

                <Grid item xs={12} md={6} xl={4}>
                    {latestReport && <Widget title={"Best Practices"}>
                        <SingleStat
                            width={300}
                            height={240}
                            value={latestReport.bestPractices}
                            label={"bestPractices"}/>
                    </Widget>}
                </Grid>

                <Grid item xs={12}>
                    <Widget title={"Stats History"}>
                        {value === "desktop" && desktopReports.length > 0 &&
                            <HistoryChart keys={AUDIT_HISTORY_CHART_LINES}
                                          data={[...desktopReports].reverse()}/>}

                        {value === "mobile" && mobileReports.length > 0 &&
                            <HistoryChart keys={AUDIT_HISTORY_CHART_LINES}
                                          data={[...mobileReports].reverse()}/>}
                    </Widget>
                </Grid>
            </Grid>

            <Grid item container spacing={2} xs={12} md={12} xl={6}>

                <Grid item xs={12} md={6}>
                    <Widget title={"Project Running"}>
                        <>
                            {site.is_running && <Chip label={"Is running"} color={"primary"}/>}
                            {!site.is_running && <Chip label={"not running"}/>}</>
                    </Widget>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Widget title={'Is Crawlable'}>
                        {latestReport && <Typography color={latestReport.is_crawlable ? 'primary' : 'error'}>
                            {latestReport.is_crawlable ? 'Crawable' : 'Site not crawlable'}
                        </Typography>}
                    </Widget>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Widget title={"Initial Server Response Time"}>
                        {latestReport && <NumericValue goodThreshold={SERVER_RESPONSE_TIME_THRESHOLD.GOOD}
                                                       poorThreshold={SERVER_RESPONSE_TIME_THRESHOLD.POOR}
                                                       value={latestReport.serverResponseTime ?? 0}
                                                       unit={"ms"}/>}
                    </Widget>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Widget title={"Time to interactive"}>
                        {latestReport && <NumericValue goodThreshold={TIME_TO_INTERACTIVE_THRESHOLD.GOOD}
                                                       poorThreshold={TIME_TO_INTERACTIVE_THRESHOLD.POOR}
                                                       value={latestReport.tti ?? 0}
                                                       unit={"ms"}/>}
                    </Widget>
                </Grid>

                <Grid item xs={12}>
                    <Widget title={"Response History"}>
                        {value === "desktop" &&
                            <HistoryChart keys={SERVER_HISTORY_CHART_LINES}
                                          data={[...desktopReports].reverse()}/>}

                        {value === "mobile" &&
                            <HistoryChart keys={SERVER_HISTORY_CHART_LINES}
                                          data={[...mobileReports].reverse()}/>}
                    </Widget>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    {value === "desktop" && desktopReports.length > 0 && <Box>
                        <DataGrid
                            rows={desktopReports}
                            columns={columns}
                            getRowId={(r) => r.date}
                            autoHeight
                        />
                    </Box>}

                    {value === "mobile" && mobileReports.length > 0 && <Box>
                        <DataGrid
                            rows={mobileReports}
                            columns={columns}
                            getRowId={(r) => r.date}
                            autoHeight
                        />
                    </Box>}
                </Card>
            </Grid>
        </Grid>
    </Grid>
}