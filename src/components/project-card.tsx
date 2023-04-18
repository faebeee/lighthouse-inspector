'use client';

import { Badge, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React, { lazy, useMemo } from 'react';
import { LighthouseRunReport, Project, Site } from '@prisma/client';
import { useResource } from '../hooks/use-resource';
import { AUDIT_HISTORY_CHART_LINES, COLOR, DATE_FORMAT } from '../../config.web';
import { format } from 'date-fns';
import { useUserContext } from '../context/user-context';
import { isMetricType } from '../utils/is-metric-type';

const HistoryBarChart = lazy(() => import('./history-bar-chart'));

export type ProjectCardProps = {
    site: Site;
    report?: LighthouseRunReport | null;
}
export const ProjectCard = ({report, site}: ProjectCardProps) => {
    const userContext = useUserContext();
    const projectApi = useResource<Project>({url: `/api/projects/${site.projectId}`});
    const reportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${site.projectId}/sites/${site.id}/reports`,
        params: {type: 'desktop', limit: 10}
    });

    const showMetric = useMemo(() => isMetricType(userContext.dashboardDetailView), [userContext.dashboardDetailView]);

    return <Card sx={{background: site.is_running ? 'rgba(178,178,178,0.54)' : undefined}}>
        <Stack component={'div'} direction={'row'} spacing={1}>
            <CardMedia component="img"
              height={300}
              style={{objectFit: 'cover'}}
              image={`/api/reports/${report?.id}/thumbnail`}>
            </CardMedia>
        </Stack>
        <CardContent>
            <Stack component={ 'div' } direction={ 'row' } alignItems={ 'center' } spacing={ 2 }>
                <Link href={ `/projects/${ site.projectId }` }>
                    <Typography color={ 'textPrimary' }
                      variant={ "h5" }>{ projectApi.data?.name }</Typography>
                </Link>

                <Typography color={'textPrimary'}
                  variant={'h5'}>-</Typography>

                <Link href={`/projects/${site.projectId}/sites/${site.id}`}>
                    <Typography color={'textPrimary'}
                      variant={'h5'}>{site.name}</Typography>
                </Link>
            </Stack>

            {reportsApi.data && <HistoryBarChart
              width={300}
              height={80}
              maxY={showMetric ? 5000 : 100}
              data={reportsApi.data?.map((d) => ({x: new Date(d.date), y: d[userContext.dashboardDetailView] ?? 0, fill: COLOR.PERFORMANCE})) ?? []} /> }

        </CardContent>
        <CardActions sx={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Stack component={'div'} direction={'row'} alignItems={'center'} spacing={2}>
                <Badge color={report?.is_crawlable ? 'success' : 'error'} variant={'dot'}>
                    <Typography variant={'caption'}>Crawlable</Typography>
                </Badge>

                <Badge color={projectApi.data?.interval_reporting ? 'success' : 'warning'} variant={'dot'}>
                    <Typography variant={'caption'}>Auto Audit</Typography>
                </Badge>

                { site.is_running &&
                  <Badge color={ 'success' } variant={ 'dot' }>
                      <Typography variant={ 'caption' }>Running</Typography>
                  </Badge> }
            </Stack>

            { report && <Typography variant={ 'caption' }>
                { format(new Date(report.date), DATE_FORMAT) }
            </Typography> }
        </CardActions>
    </Card>;
}
