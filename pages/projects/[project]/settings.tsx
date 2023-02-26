import { GetServerSideProps } from "next";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getProjectById, getProjects } from "../../../src/server/lib/project-services";
import { Layout } from "../../../src/components/layout";
import { Alert, Button, Grid, Snackbar, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import { LighthouseRunReport, Project } from "@prisma/client";
import { getNavigation, NavigationEntry } from "../../../src/utils/get-navigation";
import { useRouter } from "next/router";
import { ProjectTags } from "../../../src/components/project-tags";
import { useEndpoint } from "../../../src/hooks/use-endpoint";
import { ActionsList } from "../../../src/components/actions-list";
import Divider from "@mui/material/Divider";
import { Widget } from "../../../src/components/widget";
import { SettingsForm } from "../../../src/components/settings-form";

export type ProjectPageProps = {
    project: Project;
    navigation: NavigationEntry[];
    projects: Project[];
    desktopReports: LighthouseRunReport[];
    mobileReports: LighthouseRunReport[];
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (req) => {
    const project = await getProjectById(parseInt(req.query.project as string));
    if (!project) {
        return {
            notFound: true
        };
    }
    const projects = await getProjects();
    const navigation = await getNavigation();

    return {
        props: {
            project,
            navigation,
            projects

        }
    };
};

export const SettingsPage = ({
                                 project,
                                 navigation
                             }: ProjectPageProps) => {
    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState(project.is_running);

    const [ isIntervalOn, setIsInvervalOn ] = useState<boolean>(project.interval_reporting);
    const inspectEndpoint = useEndpoint<Project[]>({ url: `/api/inspect` }, 2000);
    const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);


    const onRunReport = () => {
        setIsLoading(true);
        axios.post(`/api/projects/${ project.id }/inspect`)
            .finally(() => {
                setIsLoading(false);
            });
    };


    const onRemove = () => {
        setIsLoading(true);
        axios.delete(`/api/projects/${ project.id }`)
            .then(() => {
                router.push("/");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleIntervalReportingChange = (value: boolean) => {
        setIsLoading(true);
        axios.patch(`/api/projects/${ project.id }`, {
            interval_reporting: value
        })
            .then(() => {
                setIsInvervalOn(value);
            })
            .then(() => setShowSuccessMessage(true))
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setShowSuccessMessage(false);
    };

    return <Layout
        backLink={ `/projects/${ project.id }` }
        title={ `${ project.name } | Settings` }
        actions={ <>
            <Button href={ `/projects/${ project.id }` }>Overview</Button>
            <Button href={ `/projects/${ project.id }/settings` }>Settings</Button>
            <Button href={ `/projects/${ project.id }/data` }>Data</Button>
            <Divider orientation={ "vertical" } variant={ "fullWidth" } color={ "primary" } />
            <ActionsList project={ project } />
            <Button variant={ "contained" } disabled={ isLoading || (inspectEndpoint.data ?? []).length > 0 }
                onClick={ onRunReport }>{ isLoading ? "Loading..." : "Run" }</Button>
        </> }
        navigation={ navigation }>

        <Snackbar open={ showSuccessMessage } autoHideDuration={ 6000 } onClose={ handleClose }>
            <Alert onClose={ handleClose } severity="success" sx={ { width: "100%" } }>
                Project updated
            </Alert>
        </Snackbar>

        <Grid container spacing={ 2 }>

            <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 }>
                <Widget title={ "URL" }>
                    <Link href={ project.url } target={ "blank" }>
                        <Typography variant={ "h6" }
                            color={ "textSecondary" }>{ project.url }</Typography>
                    </Link>
                </Widget>

            </Grid>

            <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 }>
                <Widget title={ "Danger" }>
                    <Button variant={ "contained" } color={ "error" } onClick={ onRemove }>Delete</Button>
                </Widget>
            </Grid>

            <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 }>
                <Widget title={ "Settings" }>
                    <SettingsForm project={ project } />
                </Widget>
            </Grid>

            <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 }>
                <Widget title={ "Tags" }>
                    <ProjectTags projectId={ project.id } />
                </Widget>
            </Grid>

            <Grid item xs={ 12 } md={ 6 } lg={ 4 } xl={ 3 }>
                <Widget title={ "Auto Interval Reporting" }>
                    <Switch checked={ isIntervalOn }
                        disabled={ isLoading }
                        onChange={ (e, value) => handleIntervalReportingChange(value) } />
                </Widget>
            </Grid>
        </Grid>
    </Layout>;
};

export default SettingsPage;
