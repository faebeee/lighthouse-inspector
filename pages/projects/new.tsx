import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getProjects } from '../../src/server/lib/project-services';
import { Layout } from "../../src/components/layout";
import { Stack } from "@mui/system";
import { Project } from "@prisma/client";
import { getNavigation, NavigationEntry } from "../../src/utils/get-navigation";

export type NewPageProps = {
    projects: Project[];
    navigation: NavigationEntry[];
}

export const getServerSideProps = async () => {
    const projects = await getProjects();
    const navigation = await getNavigation();
    return {
        props: {
            projects,
            navigation,
        }
    }
}
export const NewPage = ({ projects, navigation }: NewPageProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [group, setGroup] = useState('');
    const router = useRouter();

    const onRunReport = () => {
        setIsLoading(true);
        axios.post('/api/projects', {
            url,
            name,
            group,
        })
            .then(({ data }) => {
                router.push(`/projects/${data.id}`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return <Layout navigation={navigation}>
        <Stack direction={'row'} spacing={2}>
            <TextField label={'Name'} placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label={'Group'} placeholder='Group' value={group} onChange={(e) => setGroup(e.target.value)} />
            <TextField label={'Url'} placeholder='Url' value={url} onChange={(e) => setUrl(e.target.value)} />
            <Button variant={'contained'} onClick={onRunReport}>Create</Button>
        </Stack>
    </Layout>
}

export default NewPage;
