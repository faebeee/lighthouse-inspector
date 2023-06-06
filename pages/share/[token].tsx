import { LighthouseRunReport, Project, Site } from '@prisma/client'
import { getSiteByToken } from '../../src/server/lib/site'
import { getProjectById } from '../../src/server/lib/project'
import { Stack } from '@mui/material'
import { SiteDetailView } from '../../src/components/site-detail-view'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'
import { CACHE_VERY_LONG, THEME } from '../../config.web'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import React, { useMemo } from 'react'
import { useResource } from '../../src/hooks/use-resource'
import { useSearchParams } from 'next/navigation'

export type SharePageProps = {
    site: Site;
    project: Project;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<SharePageProps> = async ({req, res, query}) => {
    const site = await getSiteByToken(query.token as string)
    if (!site) {
        return {
            notFound: true
        }
    }

    const project = await getProjectById(site.projectId)
    if (!project) {
        return {
            notFound: true
        };
    }

    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${CACHE_VERY_LONG}, stale-while-revalidate=59`
    );

    return {
        props: {
            site,
            project,
        }
    };
};

export const SharePage = ({
                              site,
                              project,
                          }: SharePageProps) => {
    const searchParams = useSearchParams()
    const limit = searchParams.get('limit') ? searchParams.get('limit') : 200
    const desktopReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${project.id}/sites/${site.id}/reports`,
        params: {type: 'desktop', limit}
    })

    const mobileReportsApi = useResource<LighthouseRunReport[]>({
        url: `/api/projects/${project.id}/sites/${site.id}/reports`,
        params: {
            type: 'mobile',
            limit
        }
    })

    const desktopReports = useMemo(() => (!!desktopReportsApi.data && desktopReportsApi.data.length) > 0 ? (desktopReportsApi.data ?? []) : [], [ desktopReportsApi ])
    const mobileReports = useMemo(() => (!!mobileReportsApi.data && mobileReportsApi.data.length) > 0 ? (mobileReportsApi.data ?? []) : [], [ mobileReportsApi ])

    return <div>
        <AppBar position={'sticky'}
          variant={'outlined'}
          sx={{
              background: THEME.drawerBackground,
          }}>
            <Toolbar variant={'regular'}>
                <Stack direction={'row'} flex={1} justifyContent={'space-between'} alignItems={'center'}
                  spacing={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Image alt={'Logo'} src={THEME.logo} width={50} height={40} />
                        <Typography variant="h5" noWrap color={'white'}>
                            {project.name} - {site.name}
                        </Typography>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
        <Box sx={{
            p: 5
        }}>
            <SiteDetailView site={site} project={project}
                            desktopReports={desktopReports}
                            mobileReports={mobileReports}/>
        </Box>
    </div>;
};

export default SharePage;
