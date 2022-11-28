import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
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
        <input placeholder='Name' value={ name } onChange={ (e) => setName(e.target.value) }/>
        <input placeholder='Url' value={ url } onChange={ (e) => setUrl(e.target.value) }/>
        <button className={'bg-primary'} onClick={ onRunReport }>Run</button>
    </div>

}

export default ProjectPage;
