#!/usr/bin/env ts-node

import { auditRunnerForProjects } from "../src/server/utils/audit-runner-for-site";
import { getLogger } from "../src/server/logger";
import { getAutoUpdateProjects } from "../src/server/lib/project";

export const exec = async () => {
    const projects = await getAutoUpdateProjects();
    const startDate = new Date();
    getLogger().info(`Run for ${ projects.length } projects`);
    await auditRunnerForProjects(projects);
    const endDate = new Date();
    const diff = endDate.getTime() - startDate.getTime();
    getLogger().info(`Completed in ${ diff / 1000 }s`);
};

exec();
