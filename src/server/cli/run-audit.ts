import { getAutoUpdateProjects } from "../lib/project";
import { getLogger } from "../logger";
import { auditRunnerForProjects } from "../utils/audit-runner-for-site";
import { sendBeacon } from "./send-beacon";
import { BEACON_KEY } from "../../../config";

export const runAudit = async () => {
    const projects = await getAutoUpdateProjects();
    const startDate = new Date();
    getLogger().info(`Run for ${ projects.length } projects`);
    await auditRunnerForProjects(projects);
    const endDate = new Date();
    const diff = endDate.getTime() - startDate.getTime();
    sendBeacon(BEACON_KEY.AUDIT);
    getLogger().info(`Completed in ${ diff / 1000 }s`);
};
