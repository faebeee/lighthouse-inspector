import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getProjects } from '../../src//server/utils/get-projects';
import { Layout } from "../../src/components/layout";
import { Stack } from "@mui/system";

export type NewPageProps = {
    projects: string[]
}

export const getServerSideProps = async () => {
    const projects = await getProjects();
    return {
        props: {
            projects
        }
    }
}
export const NewPage = ({ projects }: NewPageProps) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ url, setUrl ] = useState('');
    const [ name, setName ] = useState('');
    const router = useRouter();

    const onRunReport = () => {
        setIsLoading(true);
        axios.post('/api/inspect', {
            url,
            name
        })
            .then(() => {
                router.push(`/reports/${ name }`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return <Layout projects={ projects }>
        <Stack direction={ 'row' } spacing={ 2 }>
            <TextField label={ 'Name' } placeholder='Name' value={ name } onChange={ (e) => setName(e.target.value) }/>
            <TextField label={ 'Url' } placeholder='Url' value={ url } onChange={ (e) => setUrl(e.target.value) }/>
            <Button variant={ 'contained' } onClick={ onRunReport }>Run</Button>
        </Stack>
    </Layout>
}

export default NewPage;
