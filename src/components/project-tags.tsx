import { useResource } from "../hooks/use-resource";
import { Alert, Autocomplete, Chip, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState } from "react";

export type Tag = {
    name: string;
    id?: string;

}

export type ProjectTagsProps = {
    projectId: number;
}
export const ProjectTags = ({ projectId }: ProjectTagsProps) => {
    const api = useResource<Tag[]>({ url: `/api/projects/${ projectId }/tags` });
    const allTagsApi = useResource<Tag[]>({ url: `/api/tags/` });
    const [ showSuccessMessage, setShowSuccessMessage ] = useState(false);

    const handleDelete = useCallback((tag: Tag) => {
        axios.delete<Tag[]>(`/api/projects/${ projectId }/tags/${ tag.id }`)
            .then((response) => {
                api.mutate(response.data);
                setShowSuccessMessage(true)
            })
    }, [ projectId ]);

    const handleAdd = useCallback((tags: (string | Tag)[]) => {
        axios.post<Tag[]>(`/api/projects/${ projectId }/tags`, {
            tags: tags
        })
            .then((response) => {
                api.mutate(response.data);
                setShowSuccessMessage(true)
            })
    }, [ projectId ]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setShowSuccessMessage(false);
    };

    return <>
        { allTagsApi.data && <Autocomplete
          multiple
          freeSolo
          value={ api.data ?? [] }
          id="combo-box-demo"
          getOptionLabel={ (option) => typeof option === "string" ? option : option.name }
          onChange={ (event, newValue) => {
              handleAdd(newValue);
          } }
          options={ allTagsApi.data ?? [] }
          sx={ { width: 300 } }
          renderTags={ (tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                  <Chip
                      key={ option.id }
                      label={ option.name }
                      onDelete={ () => handleDelete(option) }
                  />
              ))
          }
          renderInput={ (params) => <TextField { ...params } label="Tags" fullWidth /> }
        /> }

        <Snackbar open={ showSuccessMessage } autoHideDuration={ 6000 } onClose={ handleClose }>
            <Alert onClose={ handleClose } severity="success" sx={ { width: "100%" } }>
                Project updated
            </Alert>
        </Snackbar>
    </>;
};
