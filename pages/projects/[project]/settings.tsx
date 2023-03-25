import { GetServerSideProps } from "next";
import { Layout } from "../../../src/components/layout";
import { Button, Card, CardContent, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Project } from "@prisma/client";
import axios from "axios";
import { getNavigation, NavigationEntry } from "../../../src/utils/get-navigation";
import { getProjectById } from "../../../src/server/lib/project";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { THEME_NAME } from "../../../config.web";

export type ReportsPageProps = {
    navigation: NavigationEntry[];
    project: Project;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async (req) => {
    const project = await getProjectById(parseInt(req.query.project as string));
    const navigation = await getNavigation();
    if (!project) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            navigation,
            project
        }
    };
};

export const ReportsPage = ({ navigation, project }: ReportsPageProps) => {
    const router = useRouter();
    const [ name, setName ] = useState(project.name);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ intervalEnabled, setIntervalEnabled ] = useState(project.interval_reporting);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntervalEnabled(event.target.checked);
    };

    const onSave = () => {
        setIsLoading(true);
        axios.put(`/api/projects/${ project.id }/`, {
            name,
            interval_reporting: intervalEnabled
        })
            .then(() => {
                toast.info(`Project ${project.name} updated`, {
                    theme: THEME_NAME
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return <Layout navigation={ navigation } title={ `${ project.name } | Settings` }
        backLink={ `/projects/${ project.id }` }>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } md={ 4 }></Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Card>
                    <CardContent>
                        <Stack direction={ "column" } spacing={ 2 }>
                            <Typography variant={ "h2" }>Project Settings</Typography>
                            <TextField label={ "Name" } placeholder="Name" value={ name }
                                onChange={ (e) => setName(e.target.value) } />

                            <FormControlLabel
                                label={ "Automatic interval auditing" }
                                control={ <Switch
                                    color={ "primary" }
                                    checked={ intervalEnabled }
                                    onChange={ handleChange }
                                /> }
                            />
                            <Button disabled={ isLoading } variant={ "contained" } onClick={ onSave }>Save</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Layout>;
};

export default ReportsPage;
