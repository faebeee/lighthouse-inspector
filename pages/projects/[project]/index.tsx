import { GetServerSideProps } from 'next'
import { Layout } from '../../../src/components/layout'
import { Badge, Button, CircularProgress, Fab, Grid, List, ListItem, ListItemText, Stack } from '@mui/material'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import React, { lazy, useMemo } from 'react'
import { LighthouseRunReport, Project, Site } from '@prisma/client'
import { getNavigation, NavigationEntry } from '../../../src/utils/get-navigation'
import { useResource } from '../../../src/hooks/use-resource'
import { NumericValue } from '../../../src/components/numeric-value'
import { Widget } from '../../../src/components/widget'
import {
  CACHE_VERY_LONG,
  DATE_FORMAT,
  SCORE_THRESHOLD,
  SERVER_RESPONSE_TIME_THRESHOLD,
  TIME_TO_INTERACTIVE_THRESHOLD
} from '../../../config.web'
import { format } from 'date-fns'
import { getProjectById } from '../../../src/server/lib/project'
import { Add } from '@mui/icons-material'
import Box from '@mui/material/Box'

const ProjectResultHistoryChart = lazy(() => import('../../../src/components/project-result-history-chart'))

export type ReportsPageProps = {
  navigation: NavigationEntry[];
  project: Project;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async ({req, query, res}) => {
  const project = await getProjectById(parseInt(query.project as string))
  const navigation = await getNavigation()
  if (!project) {
    return {
      notFound: true
    }
  }

  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${CACHE_VERY_LONG}, stale-while-revalidate=59`
  )

  return {
    props: {
      navigation,
      project
    }
  }
}

export const ReportsPage = ({navigation, project}: ReportsPageProps) => {
  const sitesApi = useResource<Site[]>({url: `/api/projects/${project.id}/sites`})
  const reportsApi = useResource<Record<number, LighthouseRunReport>>({
    url: `/api/reports/`,
    params: {type: 'desktop'}
  })
  const desktopReports = useMemo(() => reportsApi.data ?? {}, [ reportsApi.data ])

  return <Layout navigation={navigation} title={project.name}
    actions={<>
      <Link href={`/projects/${project.id}/settings`}>
        <Button variant={'text'}>
          <Typography color={'secondary'}>
            Settings
          </Typography>
        </Button>
      </Link>
    </>}>
    <Typography color={'text.primary'} variant="h4">Sites</Typography>

    {sitesApi.isLoading && <CircularProgress />}

    <Stack spacing={2}>
      {sitesApi.data?.map((site) => {
        const report = desktopReports[site.id]
        return (
          <Widget autoHeight key={site.id}>
            <Grid container spacing={2} key={site.id}>
              <Grid item xs={12} lg={6} xl={3}>
                <Link href={`/projects/${project.id}/sites/${site.id}`}>
                  <Typography variant={'h6'} color={'secondary'}>{site.name}</Typography>
                </Link>
                {report && <Box sx={{maxHeight: 650, overflow: 'hidden'}}><img
                  width={'100%'}
                  loading={'lazy'}
                  src={`/api/reports/${report?.id}/full-screenshot`}
                  alt={'Report'} /></Box>}
              </Grid>

              <Grid item xs={12} lg={6} xl={9}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={<Typography variant={'subtitle2'}
                        color={'text.primary'}>
                        Latest Report
                      </Typography>}
                      secondary={<>
                        {report && <Link href={`/api/reports/${report.id}`}
                          target={'blank'}>
                          <Typography
                            variant={'subtitle1'} color={'primary'}>
                            {format(new Date(report.date), DATE_FORMAT)}
                          </Typography>
                        </Link>}</>} />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={<Typography variant={'subtitle2'}
                        color={'text.primary'}>
                        URL
                      </Typography>}
                      secondary={
                        <Link href={site.url} target={'blank'}>
                          <Typography
                            variant={'subtitle1'} color={'primary'}>
                            {site.url}
                          </Typography>
                        </Link>
                      } />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={<Typography variant={'subtitle2'}
                        color={'text.primary'}>
                        Site Crawlable
                      </Typography>}
                      secondary={
                        <Badge color={report?.is_crawlable ? 'success' : 'error'}
                          variant={'dot'}>
                          <Typography variant={'caption'}>Crawlable</Typography>
                        </Badge>
                      } />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={<Typography variant={'subtitle2'}
                        color={'text.primary'}>
                        Site shared
                      </Typography>}
                      secondary={
                        <Badge color={site.share_token ? 'success' : 'error'}
                          variant={'dot'}>
                          <Typography
                            variant={'caption'}>{site.share_token ? 'Shared' : 'Private'}</Typography>
                        </Badge>
                      } />
                  </ListItem>

                </List>

                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={12} lg={2}>
                    <Widget title={'ISRT'}>
                      {report &&
                        <NumericValue goodThreshold={SERVER_RESPONSE_TIME_THRESHOLD.GOOD}
                          poorThreshold={SERVER_RESPONSE_TIME_THRESHOLD.POOR}
                          value={report.serverResponseTime ?? 0}
                          unit={'ms'} />}
                    </Widget>
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    <Widget title={'TTI'}>
                      {report &&
                        <NumericValue goodThreshold={TIME_TO_INTERACTIVE_THRESHOLD.GOOD}
                          poorThreshold={TIME_TO_INTERACTIVE_THRESHOLD.POOR}
                          value={report.tti ?? 0}
                          unit={'ms'} />}
                    </Widget>
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    {report && <Widget title={'Performance'}>
                      <NumericValue goodThreshold={SCORE_THRESHOLD.GOOD}
                        poorThreshold={SCORE_THRESHOLD.POOR}
                        reverse
                        value={report.performance ?? 0}
                      />
                    </Widget>}
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    {report && <Widget title={'Accessibility'}>
                      <NumericValue goodThreshold={SCORE_THRESHOLD.GOOD}
                        poorThreshold={SCORE_THRESHOLD.POOR}
                        reverse
                        value={report.accessibility ?? 0} />
                    </Widget>}
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    {report && <Widget title={'Best Practices'}>
                      <NumericValue goodThreshold={SCORE_THRESHOLD.GOOD}
                        poorThreshold={SCORE_THRESHOLD.POOR}
                        reverse
                        value={report.bestPractices ?? 0} />
                    </Widget>}
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    {report && <Widget title={'SEO'}>
                      <NumericValue goodThreshold={SCORE_THRESHOLD.GOOD}
                        poorThreshold={SCORE_THRESHOLD.POOR}
                        reverse
                        value={report.seo ?? 0} />
                    </Widget>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Widget>
        )
      })}

      <Grid spacing={2} container>
        <Grid item xs={12} md={6} lg={2}>
          <Widget title={'Add Site'}>
            <Link href={`/projects/${project.id}/sites/new`}>
              <Fab size={'large'} color={'primary'}>
                <Add />
              </Fab>
            </Link>
          </Widget>
        </Grid>
      </Grid>
    </Stack>
  </Layout>
}

export default ReportsPage
