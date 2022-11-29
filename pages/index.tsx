import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { getProjects } from "../src/get-projects";

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
    return <Layout projects={ projects }>
    </Layout>
}

export default ReportsPage;
