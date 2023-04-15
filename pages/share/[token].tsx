import {LighthouseRunReport, Project, Site} from "@prisma/client";
import {getNavigation, NavigationEntry} from "../../src/utils/get-navigation";
import {getSiteById, getSiteByToken} from "../../src/server/lib/site";
import {getProjectById} from "../../src/server/lib/project";
import {Layout} from "../../src/components/layout";
import {Button, Fab, IconButton, Stack} from "@mui/material";
import {ActionsList} from "../../src/components/actions-list";
import {SiteDetailView} from "../../src/components/site-detail-view";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import {THEME} from "../../config.web";
import Link from "next/link";
import {Add, ArrowBack} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {signIn, signOut} from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import React, {useMemo} from "react";
import {getReportsForSite} from "../../src/server/lib/report";

export type SharePageProps = {
    site: Site;
    project: Project;
    navigation: NavigationEntry[];
    desktopReports: LighthouseRunReport[];
    mobileReports: LighthouseRunReport[];
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<SharePageProps> = async (req) => {
    const site = await getSiteByToken(req.query.token as string);
    if (!site) {
        return {
            notFound: true
        };
    }

    const project = await getProjectById(site.projectId);
    if (!project) {
        return {
            notFound: true
        };
    }

    const max = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const desktopReports = await getReportsForSite(site, "desktop", max);
    const mobileReports = await getReportsForSite(site, "mobile", max);

    return {
        props: {
            site,
            project,
            desktopReports,
            mobileReports,
        }
    };
};

export const SharePage = ({
                              site,
                              project,
                              desktopReports,
                              mobileReports
                          }: SharePageProps) => {
    return <div>
        <AppBar position={'sticky'}
                variant={'outlined'}
                sx={{
                    background: 'transparent',
                }}>
            <Toolbar variant={'regular'}>
                <Stack direction={'row'} flex={1} justifyContent={'space-between'} alignItems={'center'}
                       spacing={1}>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Image alt={'Logo'} src={THEME.logo} width={50} height={40}/>
                        <Typography variant="h5" noWrap color={'textPrimary'}>
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
