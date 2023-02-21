#!/usr/bin/env ts-node

import { getAutoUpdateProjects } from "../src/server/lib/project-services";
import { auditRunnerForProjects } from "../src/server/utils/audit-runner-for-project";
import cron from "node-cron";

const exec = async () => {
    const projects = await getAutoUpdateProjects();
    console.log(`Run for ${ projects.length } projects`);
    await auditRunnerForProjects(projects);
    console.log("Complete");
};

cron.schedule("* */2 * * *", () => {
    exec();
});
console.log('Cron setup');
