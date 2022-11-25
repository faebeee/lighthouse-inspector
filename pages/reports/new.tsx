import { GetServerSideProps } from "next";
import glob from 'glob';
import fs from 'fs';
import path from 'path';
import { REPORTFILE_PROJECT_DELIMITER, REPORTS_FOLDER } from "../../config";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

export const ProjectPage = () => {
    const [ url, setUrl ] = useState('');
    const [ name, setName ] = useState('');
    const router = useRouter();

    const onRunReport = () => {
        axios.post('/api/inspect', {
            url,
            name
        })
            .then(() => {
                router.push(`/reports/${ name }`);
            })
    }

    return <div>
        <TextField value={ name } onChange={ (e) => setName(e.target.value) }/>
        <TextField value={ url } onChange={ (e) => setUrl(e.target.value) }/>
        <Button variant={ 'contained' } onClick={ onRunReport }>Run</Button>
    </div>

}

export default ProjectPage;
