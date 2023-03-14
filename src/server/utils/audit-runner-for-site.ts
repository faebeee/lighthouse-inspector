import { runInspection } from "./run-inspection";
import { Site } from "@prisma/client";
import { getLogger } from "../logger";
import { markSiteAsRunning } from "../lib/site";

export const auditRunnerForSite = async (site: Site) => {
    await markSiteAsRunning(site, true);
    try {
        await runInspection(site);
        await markSiteAsRunning(site, false);
    } catch (e) {
        await markSiteAsRunning(site, false);
        getLogger().error(`Error for #${ site.id } ${ site.name }`, e);

    } finally {
        await markSiteAsRunning(site, false);
    }
};
export const auditRunnerForProjects = async (sites: Site[]) => {
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        getLogger().info(`Run for #${ site.id } ${ site.name }`);
        await auditRunnerForSite(site);
    }
};
