import { GetServerSideProps } from 'next'
import React, { useMemo } from 'react'
import { Button } from '@mui/material'
import { LighthouseRunReport, Project, Site } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { ActionsList } from '../../../../../src/components/actions-list'
import { Layout } from '../../../../../src/components/layout'
import { useResource } from '../../../../../src/hooks/use-resource'
import { getNavigation, NavigationEntry } from '../../../../../src/utils/get-navigation'
import { getSiteById } from '../../../../../src/server/lib/site'
import { getProjectById } from '../../../../../src/server/lib/project'
import { SiteDetailView } from '../../../../../src/components/site-detail-view'
import { SiteShare } from '../../../../../src/components/site-share'
import { getAxios } from '../../../../../src/utils/get-axios'
import { getUserByUsername } from '../../../../../src/server/lib/user-service'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../api/auth/[...nextauth]'

export type ProjectPageProps = {
  site: Site;
  project: Project;
  navigation: NavigationEntry[];
  desktopReports: LighthouseRunReport[];
  mobileReports: LighthouseRunReport[];
  showAuditButton: boolean;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const site = await getSiteById(parseInt(req.query.site as string));
    if (!site) {
        return {
          notFound: true
        };
    }

  const project = await getProjectById(parseInt(req.query.project as string))
  if (!project) {
    return {
      notFound: true
    }
  }

  const session = await getServerSession(req.req, req.res, authOptions)
  if (!session) {
    return {
      notFound: true
    }
  }


  const user = await getUserByUsername(session.user!.name!)
  if (!user) {
    return {
      notFound: true
    }
  }
  const navigation = await getNavigation()
  return {
    props: {
      site,
      project,
      navigation,
      showAuditButton: user.can_start_audit
    }
  }
};

export const ProjectPage = ({
                              site,
                              project,
                              navigation,
                              showAuditButton
                            }: ProjectPageProps) => {
  const searchParams = useSearchParams()
  const limit = searchParams.get('limit') ? searchParams.get('limit') : 200
  const api = useResource<Site[]>({url: '/api/inspect'}, 1000)
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

  return <Layout
    backLink={`/projects/${site.projectId}`}
    title={`${project.name}/${site.name}`}
    actions={<>
      <ActionsList site={site} />
      <SiteShare site={site} />
    </>}
    navigation={navigation}>
    <SiteDetailView site={site} project={project}
      desktopReports={desktopReports}
      mobileReports={mobileReports} />
  </Layout>
};

export default ProjectPage;
