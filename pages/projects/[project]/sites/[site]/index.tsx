import { GetServerSideProps } from 'next';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button, CardMedia, Chip, Grid, Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LighthouseRunReport, Project, Site, Tag } from '@prisma/client';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { ActionsList } from '../../../../../src/components/actions-list';
import { Layout } from '../../../../../src/components/layout';
import {
    COLOR,
    DATE_FORMAT,
    SERVER_RESPONSE_TIME_THRESHOLD,
    TIME_TO_INTERACTIVE_THRESHOLD
} from '../../../../../config.web';
import { Widget } from '../../../../../src/components/widget';
import { SingleStat } from '../../../../../src/components/single-stat';
import { NumericValue } from '../../../../../src/components/numeric-value';
import { StatsChart } from '../../../../../src/components/stats-chart';
import { useResource } from '../../../../../src/hooks/use-resource';
import { getNavigation, NavigationEntry } from '../../../../../src/utils/get-navigation';
import { getSiteById } from '../../../../../src/server/lib/site';
import { getProjectById } from '../../../../../src/server/lib/project';
import {SiteDetailView} from "../../../../../src/components/site-detail-view";

export type ProjectPageProps = {
    site: Site;
    project: Project;
    navigation: NavigationEntry[];
    desktopReports: LighthouseRunReport[];
    mobileReports: LighthouseRunReport[];
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const site = await getSiteById(parseInt(req.query.site as string));
    if (!site) {
        return {
            notFound: true
        };
    }

    const project = await getProjectById(parseInt(req.query.project as string));
    if (!project) {
        return {
            notFound: true
        };
    }
    const navigation = await getNavigation();
    return {
        props: {
            site,
            project,
            navigation
        }
    };
};

export const ProjectPage = ({
                                site,
                                project,
                                navigation
                            }: ProjectPageProps) => {

    return <Layout
        backLink={ `/projects/${ site.projectId }` }
        title={ `${ site.name } | Overview` }
        actions={ <>
            <Button href={ `/projects/${ site.projectId }/sites/${ site.id }/data` }>History</Button>
            <ActionsList site={ site } />
        </> }
        navigation={ navigation }>
        <SiteDetailView site={site} project={project}/>
    </Layout>;
};

export default ProjectPage;
