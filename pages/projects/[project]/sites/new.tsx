import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Stack } from "@mui/system";
import { Project } from "@prisma/client";
import Typography from "@mui/material/Typography";
import { getNavigation, NavigationEntry } from "../../../../src/utils/get-navigation";
import { Layout } from "../../../../src/components/layout";
import { getProjectById } from "../../../../src/server/lib/project";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";
import { THEME_NAME } from "../../../../config";

export type NewPageProps = {
    project: Project;
    navigation: NavigationEntry[];
}

export const getServerSideProps: GetServerSideProps = async (req) => {
    const project = await getProjectById(parseInt(req.query.project as string));
    const navigation = await getNavigation();
    return {
        props: {
            project,
            navigation
        }
    };
};

export const NewPage = ({ project, navigation }: NewPageProps) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ url, setUrl ] = useState("");
    const [ name, setName ] = useState("");
    const router = useRouter();

    const onCreate = () => {
        setIsLoading(true);
        axios.post(`/api/projects/${ project.id }/sites`, {
            url,
            name
        })
            .then(({ data }) => {
                router.push(`/projects/${ project.id }`);
                toast.info(`Site ${ name } created`, {
                    theme: THEME_NAME
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return <Layout navigation={ navigation } title={ "New Site" } backLink={`/projects/${ project.id }`}>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } md={ 4 }></Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Card>
                    <CardContent>
                        <Stack direction={ "column" } spacing={ 2 }>
                            <Typography variant={ "h2" }>Add Site</Typography>
                            <TextField label={ "Name" } placeholder="Name" value={ name }
                                onChange={ (e) => setName(e.target.value) } />
                            <TextField label={ "Url" } placeholder="Url" value={ url }
                                onChange={ (e) => setUrl(e.target.value) } />
                            <Button disabled={ isLoading } variant={ "contained" }
                                onClick={ onCreate }>Create</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Layout>;
};

export default NewPage;
