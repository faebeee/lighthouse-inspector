import { getProjects } from "./get-projects";
import { getReportsForProject } from "./get-reports-for-project";
import { DESKTOP_CONFIG, inspector, MOBILE_CONFIG } from "./inspector";

export const runner = async () => {
    const projects = await getProjects();
    for (let projectIndex = 0; projectIndex < projects.length; projectIndex++) {
        const project = projects[projectIndex]
        const reports = await getReportsForProject(project)
        const report = reports[0];
        await inspector(report.finalUrl, project, DESKTOP_CONFIG);
        await inspector(report.finalUrl, project, MOBILE_CONFIG);
    }
}
