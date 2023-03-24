
import { auditRunnerForProjects } from "../src/server/utils/audit-runner-for-site";
import { getLogger } from "../src/server/logger";
import { getAutoUpdateProjects } from "../src/server/lib/project";
import mixpanel from "mixpanel-browser";

export const exec = async () => {
    mixpanel.init("ed8326a29f285167e189ddcc22c3c0c0", { debug: true });
    const projects = await getAutoUpdateProjects();
    const startDate = new Date();
    getLogger().info(`Run for ${ projects.length } projects`);
    await auditRunnerForProjects(projects);
    const endDate = new Date();
    const diff = endDate.getTime() - startDate.getTime();
    mixpanel.track("audit", {
        duration: diff,
        projectsCount: projects.length
    });
    getLogger().info(`Completed in ${ diff / 1000 }s`);
};
