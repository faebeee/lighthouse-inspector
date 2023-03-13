import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Project } from "@prisma/client";

export type SettingsFormProps = {
    project: Project;
}
export const SettingsForm = ({ project }: SettingsFormProps) => {
    const [ group, setGroup ] = useState(project.group);
    const [ name, setName ] = useState(project.name);
    const [ url, setUrl ] = useState(project.url);
    const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(project.is_running);

    useEffect(() => {
        setGroup(project.group);
        setName(project.name);
    }, [ project ]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setShowSuccessMessage(false);
    };

    const updateProject = () => {
        setIsLoading(true);
        axios.patch(`/api/projects/${ project.id }`, {
            group,
            name,
            url
        })
            .then(() => setShowSuccessMessage(true))
            .finally(() => {
                setIsLoading(false);
            });
    };

    return <>
        <Stack width={ "100%" } direction={ "column" } spacing={ 2 }>
            <TextField label={ "Name" } value={ name }
                onChange={ (e) => setName(e.target.value) } />
            <TextField label={ "Group" } value={ group }
                onChange={ (e) => setGroup(e.target.value) } />
            <TextField fullWidth label={ "Url" } value={ url }
                onChange={ (e) => setUrl(e.target.value) } />
            <Button variant={ "contained" } disabled={ isLoading }
                onClick={ updateProject }>{ isLoading ? "Loading..." : "Save" }</Button>
        </Stack>
        <Snackbar open={ showSuccessMessage } autoHideDuration={ 6000 } onClose={ handleClose }>
            <Alert onClose={ handleClose } severity="success" sx={ { width: "100%" } }>
                Project updated
            </Alert>
        </Snackbar>
    </>;
};
