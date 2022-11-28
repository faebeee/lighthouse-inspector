import { getProjects } from "./get-projects";
import { getReportsForProject } from "./get-reports-for-project";
import { inspector } from "./inspector";

export const runner = async () => {
    const projects = await getProjects();

    for (let projectIndex = 0; projectIndex < projects.length; projectIndex++) {
        const project = projects[projectIndex]
        const reports = await getReportsForProject(project)
        const report = reports[0];
        await inspector(report.finalUrl, project);
    }
}
