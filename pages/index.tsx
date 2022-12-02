import { GetServerSideProps } from "next";
import { Layout } from "../src/components/layout";
import { getProjects } from "../src/server/utils/get-projects";
import React from "react";
import { ReportGrid } from "../src/components/report-grid";
import { ReportResult } from "./reports/[project]";
import { getReportsByDomainGroup } from "../src/server/utils/get-reports-by-domain-group";

export type ReportsPageProps = {
    projects: string[];
    reports: Record<string, ReportResult[]>;
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = async () => {
    const projects = await getProjects();
    const reports = await getReportsByDomainGroup();
    return {
        props: {
            projects: projects,
            reports,
        }
    }
}

export const ReportsPage = ({ projects, reports }: ReportsPageProps) => {
    return <Layout projects={ projects }>
        <ReportGrid title={ 'Projects' } reports={ reports }/>
    </Layout>
}

export default ReportsPage;
