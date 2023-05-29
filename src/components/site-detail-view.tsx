import {Card, CardContent, CardMedia, Chip, Grid, Stack, Tab, Tabs} from '@mui/material';
import {Widget} from './widget';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Box from '@mui/material/Box';
import {NumericValue} from './numeric-value';
import {
    AUDIT_HISTORY_CHART_LINES,
    DATE_FORMAT,
    SERVER_HISTORY_CHART_LINES,
    SERVER_RESPONSE_TIME_THRESHOLD,
    TIME_TO_INTERACTIVE_THRESHOLD
} from '../../config.web';
import {SingleStat} from './single-stat';
import {format} from 'date-fns';
import React, {useMemo, useState} from 'react';
import {LighthouseRunReport, Project, Site} from '@prisma/client';
import {HistoryChart} from './history-chart';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Image from 'next/image';

export type SiteDetailViewProps = {
    project: Project;
    site: Site;
    desktopReports: LighthouseRunReport[]
    mobileReports: LighthouseRunReport[]
}
export const SiteDetailView = ({site, desktopReports, mobileReports}: SiteDetailViewProps) => {
    const [value, setValue] = useState<string>('desktop');

    const latestReport = useMemo(() => {
        if (value === 'desktop') {
            return (desktopReports.length > 0 ? desktopReports[0] : null);
        }
        return (mobileReports.length > 0 ? mobileReports[0] : null);
    }, [value, desktopReports, mobileReports]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID'},
        {
            field: 'date',
            headerName: 'date',
            flex: 1,
            renderCell: (data) => <Typography>{format(new Date(data.value), DATE_FORMAT)}</Typography>
        },
        {field: 'tti', headerName: 'Time To Interactive', flex: 1},
        {field: 'serverResponseTime', headerName: 'Speed', flex: 1},
        {field: 'performance', headerName: 'performance', flex: 1},
        {field: 'accessibility', headerName: 'accessibility', flex: 1},
        {field: 'bestPractices', headerName: 'bestPractices', flex: 1},
        {field: 'seo', headerName: 'seo', flex: 1},
        {field: 'pwa', headerName: 'pwa', flex: 1},
        {
            field: 'htmlReportFile',
            headerName: 'htmlReportFile',
            flex: 1,
            renderCell: (data) => <Link target={'_blank'}
                                        href={`/api/reports/${data.row.id}`}>
                <Typography color={'secondary'}>
                    HTML Report
                </Typography>
            </Link>
        }
    ];

    return <Grid container spacing={2} sx={{mt: 4}}>
        <Grid item xs={12}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Desktop" value={'desktop'}/>
                    <Tab label="Mobile" value={'mobile'}/>
                </Tabs>
            </Box>
        </Grid>
        <Grid item xs={12} xl={8}>
            <Grid container spacing={2}>


                <Grid item xs={12}>
                    <Widget title={'Stats History'}>
                        {value === 'desktop' && desktopReports.length > 0 &&
                            <HistoryChart keys={AUDIT_HISTORY_CHART_LINES}
                                          data={[...desktopReports].reverse()}/>}

                        {value === 'mobile' && mobileReports.length > 0 &&
                            <HistoryChart keys={AUDIT_HISTORY_CHART_LINES}
                                          data={[...mobileReports].reverse()}/>}
                    </Widget>
                </Grid>

                <Grid item xs={12}>
                    <Widget title={'Response History'}>
                        {value === 'desktop' &&
                            <HistoryChart keys={SERVER_HISTORY_CHART_LINES}
                                          data={[...desktopReports].reverse()}/>}

                        {value === 'mobile' &&
                            <HistoryChart keys={SERVER_HISTORY_CHART_LINES}
                                          data={[...mobileReports].reverse()}/>}
                    </Widget>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        {value === 'desktop' && desktopReports.length > 0 && <Box>
                            <DataGrid
                                rows={desktopReports}
                                columns={columns}
                                getRowId={(r) => r.date}
                                autoHeight
                            />
                        </Box>}

                        {value === 'mobile' && mobileReports.length > 0 && <Box>
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
        <Grid item xs={12} xl={4}>
            {latestReport && <Box sx={{width: '100%'}}>
                {value === 'desktop' && latestReport && <CardMedia component={'img'}
                                                                   style={{
                                                                       objectFit: 'contain',
                                                                       objectPosition: 'top'
                                                                   }}
                                                                   image={`/api/reports/${latestReport.id}/thumbnail`}/>}
                {value === 'mobile' && latestReport &&
                    <CardMedia component="img"
                               height={650}
                               style={{objectFit: 'contain', objectPosition: 'top'}}
                               image={`/api/reports/${latestReport.id}/thumbnail?type=mobile`}/>}
            </Box>}
            <Stack spacing={2}>
                <Widget title={'URL'} autoHeight>
                    <Link href={site.url} target={'blank'}>
                        <Typography variant={'h5'}
                                    color={'primary'}>{site.url}</Typography>
                    </Link>
                </Widget>

                {latestReport && <Widget title={'Report'} autoHeight>
                    <Link href={`/api/reports/${latestReport.id}`} target={'blank'}>
                        <Typography variant={'h6'}
                                    color={'primary'}>{format(new Date(latestReport.date), DATE_FORMAT)}</Typography>
                    </Link>
                </Widget>}

                <Widget title={'Project Running'} autoHeight>
                    <>
                        {site.is_running && <Chip label={'Is running'} color={'primary'}/>}
                        {!site.is_running && <Chip label={'not running'}/>}</>
                </Widget>

                <Widget title={'Is Crawlable'} autoHeight>
                    {latestReport && <Typography color={latestReport.is_crawlable ? 'primary' : 'error'}>
                        {latestReport.is_crawlable ? 'Crawable' : 'Site not crawlable'}
                    </Typography>}
                </Widget>

                <Widget title={'Initial Server Response Time'} autoHeight>
                    {latestReport && <NumericValue goodThreshold={SERVER_RESPONSE_TIME_THRESHOLD.GOOD}
                                                   poorThreshold={SERVER_RESPONSE_TIME_THRESHOLD.POOR}
                                                   value={latestReport.serverResponseTime ?? 0}
                                                   unit={'ms'}/>}
                </Widget>

                <Widget title={'Time to interactive'} autoHeight>
                    {latestReport && <NumericValue goodThreshold={TIME_TO_INTERACTIVE_THRESHOLD.GOOD}
                                                   poorThreshold={TIME_TO_INTERACTIVE_THRESHOLD.POOR}
                                                   value={latestReport.tti ?? 0}
                                                   unit={'ms'}/>}
                </Widget>

                {latestReport && <Widget title={'Performance'} autoHeight>
                    <SingleStat
                        width={300}
                        height={240}
                        value={latestReport.performance}
                        label={'Performance'}/>
                </Widget>}

                {latestReport && <Widget title={'Accessibility'} autoHeight>
                    <SingleStat
                        width={300}
                        height={240}
                        value={latestReport.accessibility}
                        label={'accessibility'}/>
                </Widget>}

                {latestReport && <Widget title={'Best Practices'} autoHeight>
                    <SingleStat
                        width={300}
                        height={240}
                        value={latestReport.bestPractices}
                        label={'bestPractices'}/>
                </Widget>}
            </Stack>
        </Grid>
    </Grid>

    return <Grid container spacing={2} sx={{mt: 4}}>
        <Grid item xs={12} sx={{position: 'relative'}}>
            {latestReport && <Box sx={{width: '100%', height: 650}}>
                {value === 'desktop' && latestReport && <img
                    width={'100%'}
                    height={'100%'}
                    style={{objectFit: 'contain', objectPosition: 'top', overflow: 'hidden'}}
                    src={`/api/reports/${latestReport.id}/thumbnail`}/>}
                {value === 'mobile' && latestReport &&
                    <CardMedia component="img"
                               height={650}
                               style={{objectFit: 'contain', objectPosition: 'top'}}
                               image={`/api/reports/${latestReport.id}/thumbnail?type=mobile`}/>}
            </Box>}
        </Grid>

        <Grid item xs={12} container spacing={2}>

            <Grid item container spacing={2} xs={12} md={12} xl={6}>

                <Grid item xs={12} md={6}>
                    <Widget title={'URL'}>
                        <Link href={site.url} target={'blank'}>
                            <Typography variant={'h5'}
                                        color={'primary'}>{site.url}</Typography>
                        </Link>
                    </Widget>
                </Grid>

                <Grid item xs={12} md={6}>

                </Grid>


            </Grid>

            <Grid item container spacing={2} xs={12} md={12} xl={6}>

                <Grid item xs={12} md={6}>

                </Grid>

                <Grid item xs={12} md={6}>

                </Grid>


            </Grid>


        </Grid>
    </Grid>;
};
