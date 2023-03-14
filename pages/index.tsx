import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { Button, Chip, Grid, Stack } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import React from "react";
import { LighthouseRunReport, Project, Site, Tag } from "@prisma/client";
import { getNavigation, NavigationEntry } from "../src/utils/get-navigation";
import { ProjectCard } from "../src/components/project-card";
import { useResource } from "../src/hooks/use-resource";
import { useSelectionList } from "@dreipol/t3-react-utils";
import Box from "@mui/material/Box";
import { useEndpoint } from "../src/hooks/use-endpoint";

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
    const tagsApi = useResource<Tag[]>({ url: `/api/tags` }, 5000);
    const inspectEndpoint = useEndpoint<Site[]>({ url: `/api/inspect` }, 2000);
    const onInspectAllClicked = () => {
        inspectEndpoint.call("POST");
    };

    const sitesApi = useResource<Site[]>({
        url: `/api/sites`,
        params: {
            tags: activeTags.list
        }
    }, 2000);
    const desktopReportsApi = useResource<Record<number, LighthouseRunReport>>({
        url: `/api/reports/`,
        params: { type: "desktop" }
    }, 1000);

    return <Layout navigation={ navigation } showBack={ false } title={ "Lighthouse Inspector" }
        actions={ <>
            <Button onClick={ onInspectAllClicked } disabled={ (inspectEndpoint.data ?? []).length > 0 }>
                Inspect All
            </Button>
        </> }>
        <Typography sx={ { mb: 2 } } color={ "textPrimary" } variant={ "h1" }>Sites</Typography>

        <Box py={ 2 }>
            <Stack spacing={ 1 } direction={ "row" }>
                { tagsApi.data?.map((tag) => <Chip label={ tag.name } key={ tag.id }
                    onClick={ () => activeTags.toggleItem(tag.id) }
                    color={ activeTags.has(tag.id) ? "primary" : "default" } />) }
            </Stack>
        </Box>

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
