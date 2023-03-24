import { runInspection } from "./run-inspection";
import { Project, Site } from "@prisma/client";
import { getLogger } from "../logger";
import { getSitesByProject, markSiteAsRunning } from "../lib/site";
import mixpanel from "mixpanel-browser";

export const auditRunnerForSite = async (site: Site) => {
    await markSiteAsRunning(site, true);
    try {
        await runInspection(site);
        await markSiteAsRunning(site, false);
    } catch (e) {
        await markSiteAsRunning(site, false);
        getLogger().error(`Error for #${ site.id } ${ site.name }`);
        getLogger().error((e as Error).message);
        mixpanel.track("auditError", {
            message: (e as Error).message
        });
    } finally {
        await markSiteAsRunning(site, false);
    }
};
export const auditRunnerForSites = async (sites: Site[]) => {
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        getLogger().info(`Run for Site #${ site.id } ${ site.name }`);
        await auditRunnerForSite(site);
    }
};

export const auditRunnerForProjects = async (projects: Project[]) => {
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        getLogger().info(`Run for Project #${ project.id } ${ project.name }`);
        const sites = await getSitesByProject(project);
        await auditRunnerForSites(sites);
    }
};
