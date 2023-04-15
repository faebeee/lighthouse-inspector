import { GetServerSideProps } from 'next';
import { Layout } from '../../../src/components/layout';
import { Badge, Button, Fab, Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { LighthouseRunReport, Project, Site } from '@prisma/client';
import { getNavigation, NavigationEntry } from '../../../src/utils/get-navigation';
import { useResource } from '../../../src/hooks/use-resource';
import { NumericValue } from '../../../src/components/numeric-value';
import { Widget } from '../../../src/components/widget';
import {
  COLOR,
  DATE_FORMAT,
  SERVER_HISTORY_CHART_LINES,
  SERVER_RESPONSE_TIME_THRESHOLD,
  TIME_TO_INTERACTIVE_THRESHOLD
} from '../../../config.web';
import { ProjectResultHistoryChart } from '../../../src/components/project-result-history-chart';
import { format } from 'date-fns';
import { getProjectById } from '../../../src/server/lib/project';
import { Add } from '@mui/icons-material';
import { StatsChart } from '../../../src/components/stats-chart';
import Divider from '@mui/material/Divider';

export type ReportsPageProps = {
  navigation: NavigationEntry[];
  project: Project;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async (req) => {
  const project = await getProjectById(parseInt(req.query.project as string));
  const navigation = await getNavigation();
  if (!project) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      navigation,
      project
    }
  };
};

export const ReportsPage = ({ navigation, project }: ReportsPageProps) => {
  const sitesApi = useResource<Site[]>({ url: `/api/projects/${ project.id }/sites` });
  const reportsApi = useResource<Record<number, LighthouseRunReport>>({
    url: `/api/reports/`,
    params: { type: 'desktop' }
  });
  const desktopReports = useMemo(() => reportsApi.data ?? {}, [ reportsApi.data ]);

  return <Layout navigation={ navigation } title={ project.name }
    actions={ <>
      <Link href={ `/projects/${ project.id }/settings` }>
        <Button variant={ 'text' }>Settings</Button>
      </Link>
    </> }>
    <Typography color={ 'text.primary' } variant="h4">Sites</Typography>

    <Grid container spacing={ 2 }>
      { sitesApi.data?.map((site) => {
        const report = desktopReports[site.id];
        return (<Grid item container spacing={ 2 } key={ site.id } xs={ 12 }>
            <Grid item xs={ 12 } lg={ 6 } xl={ 3 }>
              <Widget autoHeight
                title={ <Link href={ `/projects/${ project.id }/sites/${ site.id }` }>
                  <Typography variant={ 'h6' } color={ 'secondary' }>{ site.name }</Typography>
                </Link> }>
                { report && <img height={ '450px' }
                  src={ `/api/reports/${ report?.id }/full-screenshot` }
                  alt={ 'Report' } /> }
              </Widget>
            </Grid>

            <Grid item xs={ 12 } lg={ 6 } xl={ 3 }>
              <Widget title={ 'Stats' } yCentered={ false } xCentered={ false } autoHeight>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={ <Typography variant={ 'subtitle2' }
                        color={ 'text.primary' }>
                        Latest Report
                      </Typography> }
                      secondary={ <>
                        { report && <Link href={ `/api/reports/${ report.id }` }
                          target={ 'blank' }>
                          <Typography
                            variant={ 'subtitle1' } color={ 'primary' }>
                            { format(new Date(report.date), DATE_FORMAT) }
                          </Typography>
                        </Link> }</> } />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={ <Typography variant={ 'subtitle2' }
                        color={ 'text.primary' }>
                        URL
                      </Typography> }
                      secondary={
                        <Link href={ site.url } target={ 'blank' }>
                          <Typography
                            variant={ 'subtitle1' } color={ 'primary' }>
                            { new URL(site.url).pathname }
                          </Typography>
                        </Link>
                      } />
                  </ListItem>

                  { report && <ListItem>
                    <ListItemText
                      primary={ <Typography variant={ 'subtitle2' } color={ 'text.primary' }>
                        Server Response Time
                      </Typography> }
                      secondary={ <NumericValue
                        variant={ 'subtitle1' }
                        goodThreshold={ SERVER_RESPONSE_TIME_THRESHOLD.GOOD }
                        poorThreshold={ SERVER_RESPONSE_TIME_THRESHOLD.POOR }
                        value={ report.serverResponseTime ?? 0 }
                        unit={ 'ms' } /> } />
                  </ListItem> }

                  { report && <ListItem>
                    <ListItemText
                      primary={ <Typography variant={ 'subtitle2' } color={ 'text.primary' }>
                        Time To Interactive
                      </Typography> }
                      secondary={ <NumericValue
                        variant={ 'subtitle1' }
                        goodThreshold={ TIME_TO_INTERACTIVE_THRESHOLD.GOOD }
                        poorThreshold={ TIME_TO_INTERACTIVE_THRESHOLD.POOR }
                        value={ report.tti ?? 0 }
                        unit={ 'ms' } /> } />
                  </ListItem> }

                  <ListItem>
                    <ListItemText
                      primary={ <Typography variant={ 'subtitle2' }
                        color={ 'text.primary' }>
                        Site Crawlable
                      </Typography> }
                      secondary={
                        <Badge color={ report?.is_crawlable ? 'success' : 'error' }
                          variant={ 'dot' }>
                          <Typography variant={ 'caption' }>Crawlable</Typography>
                        </Badge>
                      } />
                  </ListItem>

                </List>
              </Widget>
            </Grid>

            <Grid item xs={ 12 } lg={ 6 }>
              <Widget title={ 'Audit' } autoHeight>
                { report && <StatsChart height={ 320 } data={ [
                  { x: 'Performance', y: report.performance, fill: COLOR.PERFORMANCE },
                  {
                    x: 'Accessibility',
                    y: report.accessibility,
                    fill: COLOR.ACCESSIBILITY
                  },
                  {
                    x: 'Best Practices',
                    y: report.bestPractices,
                    fill: COLOR.BEST_PRACTICE
                  },
                  { x: 'seo', y: report.seo, fill: COLOR.seo },
                  { x: 'pwa', y: report.pwa, fill: COLOR.pwa }
                ] } /> }
                <ProjectResultHistoryChart lines={ SERVER_HISTORY_CHART_LINES } site={ site } />
              </Widget>
            </Grid>


            <Grid item xs={ 12 }>
              <Divider />
            </Grid>
          </Grid>
        );
      }) }

      <Grid item xs={ 12 } lg={ 6 } xl={ 3 }>
        <Widget title={ 'Add Site' }>
          <Link href={ `/projects/${ project.id }/sites/new` }>
            <Fab size={ 'large' } color={ 'primary' }>
              <Add />
            </Fab>
          </Link>
        </Widget>
      </Grid>
    </Grid>
  </Layout>;
};

export default ReportsPage;
