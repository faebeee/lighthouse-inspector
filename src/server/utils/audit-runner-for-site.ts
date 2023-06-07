import { runInspection } from './run-inspection'
import { Project, Site } from '@prisma/client'
import { getLogger } from '../logger'
import { getSitesByProjects, markSiteAsRunning } from '../lib/site'
import { setBeaconValue } from '../lib/beacon'
import { BEACON_KEY } from '../../../config'

export const auditRunnerForSite = async (site: Site) => {
    getLogger().debug(`Run audit for Site #${site.id} ${site.name}`)
    await markSiteAsRunning(site, true)
    try {
        await runInspection(site)
        await markSiteAsRunning(site, false)
    } catch (e) {
        await markSiteAsRunning(site, false)
        getLogger().error(`Error for #${site.id} ${site.name}`)
        getLogger().error((e as Error).message);
    } finally {
        await markSiteAsRunning(site, false);
    }
    getLogger().debug(`Run audit for Site #${site.id} ${site.name} complete`);
};

export const auditRunnerForSites = async (sites: Site[]) => {
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        await setBeaconValue(BEACON_KEY.AUDIT_PROGRESS, `${i} of ${sites.length}`)
        getLogger().info(`Audit sites progress ${i}/${sites.length}`)
        await auditRunnerForSite(site);
    }
};

export const auditRunnerForProjects = async (projects: Project[]) => {
    const totalSites = await getSitesByProjects(projects)
    getLogger().info(`Audit ${totalSites} sites`)
    await auditRunnerForSites(totalSites)
    await setBeaconValue(BEACON_KEY.AUDIT_PROGRESS, `complete`)
};
