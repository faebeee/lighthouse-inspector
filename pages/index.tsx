import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { Button, Chip, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { LighthouseRunReport, Project, Site, Tag } from "@prisma/client";
import { getNavigation, NavigationEntry } from "../src/utils/get-navigation";
import { ProjectCard } from "../src/components/project-card";
import { useResource } from "../src/hooks/use-resource";
import { useSelectionList } from "@dreipol/t3-react-utils";

export type ReportsPageProps = {
    navigation: NavigationEntry[];
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async () => {
    const navigation = await getNavigation();

    return {
        props: {
            navigation,
        }
    }
}

export const ReportsPage = ({ navigation }: ReportsPageProps) => {
    const activeTags = useSelectionList<number>([]);

    const sitesApi = useResource<Site[]>({
        url: `/api/sites`,
        params: {
            tags: activeTags.list
        }
    });
    const desktopReportsApi = useResource<Record<number, LighthouseRunReport>>({
        url: `/api/reports/`,
        params: { type: "desktop" }
    });

    return <Layout navigation={ navigation } showBack={ false } title={ "Web Audit" }>
        <Typography sx={ { mb: 2 } } color={ "textPrimary" } variant={ "h1" }>Sites</Typography>

        <Grid container spacing={ 2 }>
            { sitesApi.data?.map((site) => {
                const report = desktopReportsApi.data?.[site.id];
                if (!report) {
                    return;
                }
                return (
                    <Grid key={ site.id } item xs={ 12 } lg={ 6 } xl={ 3 }>
                        <ProjectCard site={ site } report={ report } />
                    </Grid>
                );
            }) }
        </Grid>
    </Layout>
}

export default ReportsPage;
