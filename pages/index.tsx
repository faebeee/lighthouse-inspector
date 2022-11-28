import { GetServerSideProps } from "next";
import Link from "next/link";
import { Layout } from "../src/components/layout";
import { getProjects } from "../src/get-projects";
import { ListItemText, MenuItem, MenuList } from "@mui/material";
import Divider from "@mui/material/Divider";

export type ReportsPageProps = {
    projects: string[];
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async () => {
    const projects = await getProjects();
    return {
        props: {
            projects: projects
        }
    }
}

export const ReportsPage = ({ projects }: ReportsPageProps) => {
    return <Layout sidebar={<MenuList>
        { projects.map((name) => (
            <Link href={ `/reports/${ name }` } key={ name }>
                <MenuItem>
                    <ListItemText>{ name }</ListItemText>
                </MenuItem>
            </Link>
        )) }
        <Divider/>
        <Link href={ `/reports/new` }>
            <MenuItem>
                <ListItemText>New</ListItemText>
            </MenuItem>
        </Link>
    </MenuList>}>
    </Layout>
}

export default ReportsPage;
