import { runInspection } from './run-inspection';
import { Project, Site } from '@prisma/client';
import { getLogger } from '../logger';
import { getSitesByProject, markSiteAsRunning } from '../lib/site';
import { setBeaconValue } from '../lib/beacon';
import { BEACON_KEY } from '../../../config';

export const auditRunnerForSite = async (site: Site) => {
    getLogger().info(`Run audit for Site #${site.id} ${site.name}`);
    await markSiteAsRunning(site, true);
    try {
        await runInspection(site);
        await markSiteAsRunning(site, false);
    } catch (e) {
        await markSiteAsRunning(site, false);
        getLogger().error(`Error for #${site.id} ${site.name}`);
        getLogger().error((e as Error).message);
    } finally {
        await markSiteAsRunning(site, false);
    }
    getLogger().info(`Run audit for Site #${site.id} ${site.name} complete`);
};

export const auditRunnerForSites = async (sites: Site[]) => {
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
            await auditRunnerForSite(site);
    }
};

export const auditRunnerForProjects = async (projects: Project[]) => {
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        await setBeaconValue(BEACON_KEY.AUDIT_PROGRESS, `${i} of ${projects.length}`);
        const sites = await getSitesByProject(project);
        getLogger().info(`Audit project #${project.id} ${project.name} with ${sites.length} sites`);
        await auditRunnerForSites(sites);
        getLogger().info(`Audit project #${project.id} ${project.name} complete`);
    }
    await setBeaconValue(BEACON_KEY.AUDIT_PROGRESS, `complete`);
};
