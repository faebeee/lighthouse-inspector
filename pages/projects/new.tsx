import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../../src/components/layout";
import { Stack } from "@mui/system";
import { getNavigation, NavigationEntry } from "../../src/utils/get-navigation";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { THEME_NAME } from "../../config";

export type NewPageProps = {
    navigation: NavigationEntry[];
}

export const getServerSideProps = async () => {
    const navigation = await getNavigation();
    return {
        props: {
            navigation
        }
    };
};
export const NewPage = ({ navigation }: NewPageProps) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ name, setName ] = useState("");
    const router = useRouter();

    const onRunReport = () => {
        setIsLoading(true);
        axios.post("/api/projects", {
            name
        })
            .then(({ data }) => {
                toast.info(`Project created`, {
                    theme: THEME_NAME
                });
                router.push(`/projects/${ data.id }/sites/new`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return <Layout navigation={ navigation } title={ "New Site" }>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } md={ 4 }></Grid>
            <Grid item xs={ 12 } md={ 4 }>
                <Card>
                    <CardContent>
                        <Stack direction={ "column" } spacing={ 2 }>
                            <Typography variant={ "h2" }>Add Project</Typography>
                            <TextField label={ "Name" } placeholder="Name" value={ name }
                                onChange={ (e) => setName(e.target.value) } />
                            <Button variant={ "contained" } onClick={ onRunReport }>Create</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Layout>;
}

export default NewPage;
