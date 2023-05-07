import { GetServerSideProps } from 'next'
import { Layout } from '../src/components/layout'
import {
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch
} from '@mui/material'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { LighthouseRunReport, Site } from '@prisma/client'
import { getNavigation, NavigationEntry } from '../src/utils/get-navigation'
import { ProjectCard } from '../src/components/project-card'
import { useResource } from '../src/hooks/use-resource'
import { useSelectionList } from '@dreipol/t3-react-utils'
import { useUserContext } from '../src/context/user-context'
import { MetricType, ScoreType } from '../types/app'
import { Stack } from '@mui/system'

export type ReportsPageProps = {
    navigation: NavigationEntry[];
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async ({req, res}) => {
    const navigation = await getNavigation()
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=30, stale-while-revalidate=59'
    );

    return {
        props: {
            navigation
        }
    };
};

export const ReportsPage = ({ navigation }: ReportsPageProps) => {
    const activeTags = useSelectionList<number>([]);
    const userContext = useUserContext()
    const [ showActiveOnly, setShowActiveOnly ] = useState(true)
    const sitesApi = useResource<Site[]>({
        url: `/api/sites`,
        params: {
            tags: activeTags.list,
            active_only: showActiveOnly
        }
    })
    const desktopReportsApi = useResource<Record<number, LighthouseRunReport>>({
        url: `/api/reports/`,
        params: {type: 'desktop'}
    });

    const handleChange = (event: SelectChangeEvent) => {
        userContext.setDashboardDetailView(event.target.value as ScoreType | MetricType);
    };

    return <Layout navigation={navigation} showBack={false} title={'Web Audit'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography sx={{mb: 2}} color={'textPrimary'} variant={'h1'}>Sites</Typography>
            <Stack direction={'row'} spacing={2}>
                <FormControlLabel control={<Switch checked={showActiveOnly}
                  onChange={(event) => setShowActiveOnly(event.target.checked)} />} label="Active Only" />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Score</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userContext.dashboardDetailView}
                      label="Age"
                      onChange={handleChange}
                    >
                        <MenuItem value={'tti'}>TimeToInteractive</MenuItem>
                        <MenuItem value={'serverResponseTime'}>Server Response Time</MenuItem>
                        <MenuItem value={'performance'}>Performance</MenuItem>
                        <MenuItem value={'accessibility'}>Accessibility</MenuItem>
                        <MenuItem value={'bestPractices'}>Best Practices</MenuItem>
                        <MenuItem value={'pwa'}>PWA</MenuItem>
                        <MenuItem value={'seo'}>SEO</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Stack>


        <Grid container spacing={2}>
            {!sitesApi.isLoading && sitesApi.data?.map((site) => {
                const report = desktopReportsApi.data?.[site.id]
                if (!report) {
                    return
                }
                return (
                  <Grid key={site.id} item xs={12} lg={6} xl={3}>
                      <ProjectCard site={site} report={report} />
                  </Grid>
                )
            })}
        </Grid>
    </Layout>
}

export default ReportsPage;
