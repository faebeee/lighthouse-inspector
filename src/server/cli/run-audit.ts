import { getAutoUpdateProjects } from "../lib/project";
import { getLogger } from "../logger";
import { auditRunnerForProjects } from "../utils/audit-runner-for-site";
import { getMixpanel } from "./get-mixpanel";
import { sendBeacon } from "./send-beacon";
import { BEACON_KEY } from "../../../config";

export const runAudit = async () => {
    const projects = await getAutoUpdateProjects();
    const startDate = new Date();
    getLogger().info(`Run for ${ projects.length } projects`);
    await auditRunnerForProjects(projects);
    const endDate = new Date();
    const diff = endDate.getTime() - startDate.getTime();
    getMixpanel()?.track("audit", {
        duration: diff,
        projectsCount: projects.length
    });
    sendBeacon(BEACON_KEY.AUDIT);
    getLogger().info(`Completed in ${ diff / 1000 }s`);
};
