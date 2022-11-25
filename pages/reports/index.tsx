import { GetServerSideProps } from "next";
import glob from 'glob';
import { REPORTS_FOLDER } from "../../config";
import Link from "next/link";

export type ReportsPageProps = {
    projects: string[];
}

export const getServerSideProps: GetServerSideProps<ReportsPageProps> = () => {
    const files = glob.sync(`${ REPORTS_FOLDER }/*/*.json`);
    const projects = files.reduce((acc, file) => {
        const projectName = file.split('/')[1] ?? '';
        if (projectName && !acc.includes(projectName)) {
            acc.push(projectName)
        }
        return acc;
    }, [] as string[]);


    return {
        props: {
            projects: projects
        }
    }
}

export const ReportsPage = ({ projects }: ReportsPageProps) => {
    return <ul>
        { projects.map((name) => (<li>
            <Link href={ `/reports/${ name }` }>
                { name }
            </Link>
        </li>)) }
    </ul>

}

export default ReportsPage;
