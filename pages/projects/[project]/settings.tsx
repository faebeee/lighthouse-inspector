import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getProjectById, getProjects } from "../../../src/server/lib/project-services";
import { Layout } from "../../../src/components/layout";
import { Button, Card, CardActions, CardContent, Grid, Switch, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { LighthouseRunReport, Project } from "@prisma/client";
import { getNavigation, NavigationEntry } from "../../../src/utils/get-navigation";
import { useRouter } from "next/router";
import { ProjectTags } from "../../../src/components/project-tags";
import { useEndpoint } from "../../../src/hooks/use-endpoint";

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
    const [ group, setGroup ] = useState(project.group);
    const [ name, setName ] = useState(project.name);
    const [ value, setValue ] = useState<string>("desktop");
    const [ isIntervalOn, setIsInvervalOn ] = useState<boolean>(project.interval_reporting);
    const inspectEndpoint = useEndpoint<Project[]>({ url: `/api/inspect` }, 2000);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    useEffect(() => {
        setGroup(project.group);
        setName(project.name);
    }, [ project ]);

    const onRunReport = () => {
        setIsLoading(true);
        axios.post(`/api/projects/${ project.id }/inspect`)
            .finally(() => {
                setIsLoading(false);
            });
    };

    const updateProject = () => {
        setIsLoading(true);
        axios.patch(`/api/projects/${ project.id }`, {
            group,
            name
        })
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
            .finally(() => {
                setIsLoading(false);
            });
    };

    return <Layout
        backLink={ `/projects/${ project.id }` }
        title={ project.name }
        actions={
            <Button variant={ "text" } disabled={ isLoading || (inspectEndpoint.data ?? []).length > 0 }
                onClick={ onRunReport }>{ isLoading ? "Loading..." : "Run" }</Button> }
        navigation={ navigation }>
        <Grid container spacing={ 2 }>

            <Grid item xs={ 12 } xl={ 4 }>
                <Card sx={ { minHeight: "320px" } }>
                    <CardContent>
                        <Typography color={ "textPrimary" } variant={ "subtitle2" }>URL</Typography>
                        <Link href={ project.url } target={ "blank" }>
                            <Typography variant={ "h6" }
                                color={ "textSecondary" }>{ project.url }</Typography>
                        </Link>
                    </CardContent>

                    <CardActions>
                        <Button onClick={ onRemove }>Delete</Button>
                    </CardActions>
                </Card>
            </Grid>


            <Grid item xs={ 12 } xl={ 4 }>
                <Card sx={ { minHeight: "320px" } }>
                    <CardContent>
                        <Typography color={ "textPrimary" } variant={ "subtitle2" }>Settings</Typography>
                        <Stack direction={ "row" } spacing={ 2 }>
                            <TextField label={ "Name" } value={ name }
                                onChange={ (e) => setName(e.target.value) } />
                            <TextField label={ "Group" } value={ group }
                                onChange={ (e) => setGroup(e.target.value) } />
                            <TextField fullWidth label={ "Url" } value={ project.url } disabled />
                            <Button variant={ "outlined" } disabled={ isLoading }
                                onClick={ updateProject }>{ isLoading ? "Loading..." : "Save" }</Button>
                        </Stack>

                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={ 12 } xl={ 4 }>
                <Card sx={ { minHeight: "320px" } }>
                    <CardContent>
                        <Typography color={ "textPrimary" } variant={ "subtitle2" }>Tags</Typography>
                        <ProjectTags projectId={ project.id } />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={ 12 } xl={ 4 }>
                <Card sx={ { minHeight: "320px" } }>
                    <CardContent>
                        <Typography color={ "textPrimary" } variant={ "subtitle2" }>Auto Interval Reporting</Typography>
                        <Switch checked={ isIntervalOn }
                            disabled={ isLoading }
                            onChange={ (e, value) => handleIntervalReportingChange(value) } />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Layout>;
};

export default SettingsPage;
