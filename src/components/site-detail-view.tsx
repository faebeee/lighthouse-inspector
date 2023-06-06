import { Card, CardMedia, Chip, Grid, Stack, Tab, Tabs } from '@mui/material'
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

  const latestReport = useMemo(() => {
    if (value === 'desktop') {
      return (desktopReports.length > 0 ? desktopReports[0] : null)
    }
    return (mobileReports.length > 0 ? mobileReports[0] : null)
  }, [ value, desktopReports, mobileReports ])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
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
          <Tab label={`TTI (${Math.round(latestReport?.tti ?? 0)}ms)`} value={'tti'} />
          <Tab label={`ISRT (${Math.round(latestReport?.serverResponseTime ?? 0)}ms)`}
            value={'serverResponseTime'} />
          <Tab label={`Performance (${Math.round(latestReport?.performance ?? 0)})`}
            value={'performance'} />
          <Tab label={`Accessibility (${Math.round(latestReport?.accessibility ?? 0)})`}
            value={'accessibility'} />
          <Tab label={`Best Practices (${Math.round(latestReport?.bestPractices ?? 0)})`}
            value={'bestPractices'} />
          <Tab label={`SEO (${Math.round(latestReport?.seo ?? 0)})`} value={'seo'} />
          <Tab label={`PWA (${Math.round(latestReport?.pwa ?? 0)})`} value={'pwa'} />
        </Tabs>
      </Box>
    </Grid>

    <Grid item container spacing={2}>
      {category === 'overview' && <>
        <Grid item container spacing={2} xs={12} xl={8}>
          <Grid item xs={12} lg={6}>
            <Widget title={'Initial Server Response Time'}>
              {latestReport && <NumericValue goodThreshold={SERVER_RESPONSE_TIME_THRESHOLD.GOOD}
                poorThreshold={SERVER_RESPONSE_TIME_THRESHOLD.POOR}
                value={latestReport.serverResponseTime ?? 0}
                unit={'ms'} />}
            </Widget>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Widget title={'Time to interactive'}>
              {latestReport && <NumericValue goodThreshold={TIME_TO_INTERACTIVE_THRESHOLD.GOOD}
                poorThreshold={TIME_TO_INTERACTIVE_THRESHOLD.POOR}
                value={latestReport.tti ?? 0}
                unit={'ms'} />}
            </Widget>
          </Grid>
          <Grid item xs={12} lg={4}>
            {latestReport && <Widget title={'Performance'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestReport.performance}
                label={'Performance'} />
            </Widget>}
          </Grid>
          <Grid item xs={12} lg={4}>

            {latestReport && <Widget title={'Accessibility'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestReport.accessibility}
                label={'accessibility'} />
            </Widget>}
          </Grid>
          <Grid item xs={12} lg={4}>
            {latestReport && <Widget title={'Best Practices'} autoHeight>
              <SingleStat
                width={300}
                height={240}
                value={latestReport.bestPractices}
                label={'bestPractices'} />
            </Widget>}
          </Grid>
        </Grid>
        <Grid item xs={12} xl={4}>
          {latestReport && <Box sx={{width: '100%'}}>
            {value === 'desktop' && latestReport && <CardMedia component={'img'}
              style={{
                objectFit: 'contain',
                objectPosition: 'top'
              }}
              image={`/api/reports/${latestReport.id}/thumbnail`} />}
            {value === 'mobile' && latestReport &&
              <CardMedia component="img"
                height={650}
                style={{objectFit: 'contain', objectPosition: 'top'}}
                image={`/api/reports/${latestReport.id}/thumbnail?type=mobile`} />}
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
                {site.is_running && <Chip label={'Is running'} color={'primary'} />}
                {!site.is_running && <Chip label={'not running'} />}</>
            </Widget>

            <Widget title={'Is Crawlable'} autoHeight>
              {latestReport && <Typography color={latestReport.is_crawlable ? 'primary' : 'error'}>
                {latestReport.is_crawlable ? 'Crawable' : 'Site not crawlable'}
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
      }
    </Grid>
  </Grid>
}
