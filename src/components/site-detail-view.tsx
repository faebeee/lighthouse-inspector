import { Card, CardMedia, Chip, Grid, SelectChangeEvent, Stack, Tab, Tabs } from '@mui/material'
import { Widget } from './widget'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Box from '@mui/material/Box'
import { NumericValue } from './numeric-value'
import { DATE_FORMAT, SERVER_RESPONSE_TIME_THRESHOLD, THEME, TIME_TO_INTERACTIVE_THRESHOLD } from '../../config.web'
import { SingleStat } from './single-stat'
import { format } from 'date-fns'
import React, { useMemo, useState } from 'react'
import { LighthouseRunReport, Project, Site } from '@prisma/client'
import { HistoryChart } from './history-chart'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export type SiteDetailViewProps = {
  project: Project;
  site: Site;
  desktopReports: LighthouseRunReport[]
  mobileReports: LighthouseRunReport[]
}
export const SiteDetailView = ({site, desktopReports, mobileReports}: SiteDetailViewProps) => {
  const [ value, setValue ] = useState<string>('desktop')
  const [ category, setCategory ] = useState<string>('overview')

  const latestDesktopReport = useMemo(() => {
    return (desktopReports.length > 0 ? desktopReports[0] : null)
  }, [ value, desktopReports, mobileReports ])

  const latestMobileReport = useMemo(() => {
    return (mobileReports.length > 0 ? mobileReports[0] : null)
  }, [ value, desktopReports, mobileReports ])

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value)
  }
  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue)
  }

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID'},
    {
      field: 'date',
      headerName: 'date',
      flex: 1,
      renderCell: (data) => <Typography>{format(new Date(data.value), DATE_FORMAT)}</Typography>
    },
    {field: 'type', headerName: 'Type', flex: 1},
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
  ]

  return <Grid container spacing={2} sx={{mt: 4}}>
    <Grid item xs={12}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={category} onChange={handleCategoryChange}>
          <Tab label="Overview" value={'overview'} />
          <Tab label="Data" value={'history'} />
          <Tab label={`TTI (${Math.round(latestDesktopReport?.tti ?? 0)}ms)`} value={'tti'} />
          <Tab label={`ISRT (${Math.round(latestDesktopReport?.serverResponseTime ?? 0)}ms)`}
            value={'serverResponseTime'} />
          <Tab label={`Performance (${Math.round(latestDesktopReport?.performance ?? 0)})`}
            value={'performance'} />
          <Tab label={`Accessibility (${Math.round(latestDesktopReport?.accessibility ?? 0)})`}
            value={'accessibility'} />
          <Tab label={`Best Practices (${Math.round(latestDesktopReport?.bestPractices ?? 0)})`}
            value={'bestPractices'} />
          <Tab label={`SEO (${Math.round(latestDesktopReport?.seo ?? 0)})`} value={'seo'} />
          <Tab label={`PWA (${Math.round(latestDesktopReport?.pwa ?? 0)})`} value={'pwa'} />
        </Tabs>
      </Box>
    </Grid>

    <Grid item container spacing={2}>
      {category === 'overview' && <>
        <Grid item container spacing={2} xs={12} xl={8}>
          <Grid item xs={12} lg={6}>
            <Widget title={'Initial Server Response Time'}>
              {latestDesktopReport && <NumericValue goodThreshold={SERVER_RESPONSE_TIME_THRESHOLD.GOOD}
                poorThreshold={SERVER_RESPONSE_TIME_THRESHOLD.POOR}
                value={latestDesktopReport.serverResponseTime ?? 0}
                unit={'ms'} />}

              {latestMobileReport && <NumericValue goodThreshold={SERVER_RESPONSE_TIME_THRESHOLD.GOOD}
                poorThreshold={SERVER_RESPONSE_TIME_THRESHOLD.POOR}
                value={latestMobileReport.serverResponseTime ?? 0}
                variant={'body2'}
                prefix={'Mobile'}
                unit={'ms'} />}
            </Widget>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Widget title={'Time to interactive'}>
              {latestDesktopReport && <NumericValue goodThreshold={TIME_TO_INTERACTIVE_THRESHOLD.GOOD}
                poorThreshold={TIME_TO_INTERACTIVE_THRESHOLD.POOR}
                value={latestDesktopReport.tti ?? 0}
                unit={'ms'} />}

              {latestMobileReport && <NumericValue goodThreshold={TIME_TO_INTERACTIVE_THRESHOLD.GOOD}
                poorThreshold={TIME_TO_INTERACTIVE_THRESHOLD.POOR}
                value={latestMobileReport.tti ?? 0}
                variant={'body2'}
                prefix={'Mobile'}
                unit={'ms'} />}
            </Widget>
          </Grid>
          <Grid item xs={12} lg={4}>
            {latestDesktopReport && <Widget title={'Performance'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestDesktopReport.performance}
                label={'Performance'} />
            </Widget>}
          </Grid>

          <Grid item xs={12} lg={4}>
            {latestDesktopReport && <Widget title={'Accessibility'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestDesktopReport.accessibility}
                label={'accessibility'} />
            </Widget>}
          </Grid>

          <Grid item xs={12} lg={4}>
            {latestDesktopReport && <Widget title={'Best Practices'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestDesktopReport.bestPractices}
                label={'bestPractices'} />
            </Widget>}
          </Grid>

          <Grid item xs={12} lg={4}>
            {latestMobileReport && <Widget title={'Performance Mobile'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestMobileReport.performance}
                label={'Performance'} />
            </Widget>}
          </Grid>

          <Grid item xs={12} lg={4}>
            {latestMobileReport && <Widget title={'Accessibility Mobile'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestMobileReport.accessibility}
                label={'accessibility'} />
            </Widget>}
          </Grid>

          <Grid item xs={12} lg={4}>
            {latestMobileReport && <Widget title={'Best Practices Mobile'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestMobileReport.bestPractices}
                label={'bestPractices'} />
            </Widget>}
          </Grid>
        </Grid>

        <Grid item xs={12} xl={4}>
          {latestDesktopReport && <Box sx={{width: '100%'}}>
            {value === 'desktop' && latestDesktopReport && <CardMedia component={'img'}
              style={{
                objectFit: 'contain',
                objectPosition: 'top'
              }}
              image={`/api/reports/${latestDesktopReport.id}/thumbnail`} />}
            {value === 'mobile' && latestDesktopReport &&
              <CardMedia component="img"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'top'
                }}
                image={`/api/reports/${latestDesktopReport.id}/thumbnail?type=mobile`} />}
          </Box>}
          <Stack spacing={2}>
            <Widget title={'URL'} autoHeight>
              <Link href={site.url} target={'blank'}>
                <Typography variant={'h5'}
                  color={'primary'}>{site.url}</Typography>
              </Link>
            </Widget>

            <Widget title={'Report'} autoHeight>
              {latestDesktopReport && <Link href={`/api/reports/${latestDesktopReport.id}`} target={'blank'}>
                <Typography variant={'h6'}
                  color={'primary'}>Desktop {format(new Date(latestDesktopReport.date), DATE_FORMAT)}</Typography>
              </Link>}

              {latestMobileReport && <Link href={`/api/reports/${latestMobileReport.id}`} target={'blank'}>
                <Typography variant={'h6'}
                  color={'primary'}>Mobile {format(new Date(latestMobileReport.date), DATE_FORMAT)}</Typography>
              </Link>}
            </Widget>

            <Widget title={'Project Running'} autoHeight>
              <>
                {site.is_running && <Chip label={'Is running'} color={'primary'} />}
                {!site.is_running && <Chip label={'not running'} />}</>
            </Widget>

            <Widget title={'Is Crawlable'} autoHeight>
              {latestDesktopReport && <Typography color={latestDesktopReport.is_crawlable ? 'primary' : 'error'}>
                {latestDesktopReport.is_crawlable ? 'Crawable' : 'Site not crawlable'}
              </Typography>}
            </Widget>
          </Stack>
        </Grid>
      </>}

      {
        category !== 'overview' && category !== 'history' && <>
          <Grid item xs={12}>
            <Widget title={'Desktop'}>
              <HistoryChart keys={[
                {label: category, color: THEME.primary}
              ]}
                data={[ ...desktopReports ].reverse()} />
            </Widget>
          </Grid>
          <Grid item xs={12}>
            <Widget title={'Mobile'}>
              <HistoryChart keys={[
                {label: category, color: THEME.primary}
              ]}
                data={[ ...mobileReports ].reverse()} />
            </Widget>
          </Grid>
        </>
      }

      {
        category === 'history' && <Grid item xs={12}>
          <Card>
            <Box>
              <DataGrid
                rows={[ ...desktopReports, ...mobileReports ]}
                columns={columns}
                getRowId={(r) => r.date}
                autoHeight
              />
            </Box>
          </Card>
        </Grid>
      }
    </Grid>
  </Grid>
}
