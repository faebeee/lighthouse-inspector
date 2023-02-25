#!/usr/bin/env ts-node

import { getAutoUpdateProjects } from "../src/server/lib/project-services";
import { auditRunnerForProjects } from "../src/server/utils/audit-runner-for-project";
import cron from "node-cron";
import { getLogger } from "../src/server/logger";

const exec = async () => {
    const projects = await getAutoUpdateProjects();
    const startDate = new Date();
    getLogger().info(`Run for ${ projects.length } projects`);
    await auditRunnerForProjects(projects);
    const endDate = new Date();
    const diff = endDate.getTime() - startDate.getTime();
    getLogger().info(`Completed in ${ diff / 1000 }s`);
};

cron.schedule("0 * * * *", () => {
    exec();
});
getLogger().info("Cron setup");
