import { markProjectAsRunning } from "../lib/project-services";
import { runInspection } from "./run-inspection";
import { Project } from "@prisma/client";

export const auditRunnerForProject = async (project: Project) => {
    await markProjectAsRunning(project, true);
    try {
        await runInspection(project);
        await markProjectAsRunning(project, false);
    } catch (e) {
        await markProjectAsRunning(project, false);
        throw e;
    }
};
export const auditRunnerForProjects = async (projects: Project[]) => {
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        await markProjectAsRunning(project, true);
        try {
            await runInspection(project);
            await markProjectAsRunning(project, false);
        } catch (e) {
            await markProjectAsRunning(project, false);
            throw e;
        }
    }

};
