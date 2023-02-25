import { markProjectAsRunning } from "../lib/project-services";
import { runInspection } from "./run-inspection";
import { Project } from "@prisma/client";
import { getLogger } from "../logger";

export const auditRunnerForProject = async (project: Project) => {
    await markProjectAsRunning(project, true);
    try {
        await runInspection(project);
        await markProjectAsRunning(project, false);
    } catch (e) {
        await markProjectAsRunning(project, false);
        getLogger().error(`Error for #${ project.id } ${ project.name }`, e);

    } finally {
        await markProjectAsRunning(project, false);
    }
};
export const auditRunnerForProjects = async (projects: Project[]) => {
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        getLogger().info(`Run for #${ project.id } ${ project.name }`);
        await auditRunnerForProject(project);
    }
};
