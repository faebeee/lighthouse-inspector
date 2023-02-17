import { useResource } from "../hooks/use-resource";
import { Autocomplete, Chip, TextField } from "@mui/material";
import axios from "axios";
import { useCallback } from "react";

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

    const handleDelete = useCallback((tag: Tag) => {
        axios.delete<Tag[]>(`/api/projects/${ projectId }/tags/${ tag.id }`)
            .then((response) => {
                api.mutate(response.data);
            })
    }, [ projectId ]);

    const handleAdd = useCallback((tags: (string | Tag)[]) => {
        axios.post<Tag[]>(`/api/projects/${ projectId }/tags`, {
            tags: tags
        })
            .then((response) => {
                api.mutate(response.data);
            })
    }, [ projectId ]);

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
    </>;
};
