import { getProjects } from "./get-projects";
import { getReportsForProject } from "./get-reports-for-project";
import { DESKTOP_CONFIG, inspector, MOBILE_CONFIG } from "./inspector";

export const runner = async (regex?: RegExp) => {
    const projects = await getProjects();
    const filteredProjects = projects.filter(p => regex ? (p.match(regex)?.length ?? 0) > 0 : true);

    for (let projectIndex = 0; projectIndex < filteredProjects.length; projectIndex++) {
        const project = filteredProjects[projectIndex]
        const reports = await getReportsForProject(project)
        const report = reports[0];
        await inspector(report.finalUrl, project, DESKTOP_CONFIG);
        await inspector(report.finalUrl, project, MOBILE_CONFIG);
    }
}
