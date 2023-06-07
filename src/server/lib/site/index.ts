import { Project, Site } from '@prisma/client'
import { getPrisma } from '../../get-prisma'
import { getLogger } from '../../logger'

export type SiteWithProject = Site & { project: Project }

export const getSiteById = async (id: number): Promise<Site | null> => {
    return (await getPrisma().site.findFirst({
        where: {
            id
        }
    })) || null
}

export const createSite = async (name: string, url: string, project: Project): Promise<Site> => {
    const site = await getPrisma().site.create({
        data: {
            name,
            url,
            projectId: project.id,
            is_running: false
        }
    })
    return site
}

export const getSiteByToken = async (token: string): Promise<Site | null> => {
    return (await getPrisma().site.findFirst({
        where: {
            share_token: token
        }
    })) || null
}

export const getRunningSites = async (): Promise<Site[]> => {
    return (await getPrisma().site.findMany({
        where: {
            is_running: true
        },
        orderBy: { name: "asc" }
    })) ?? [];
};
export const getAllSites = async (): Promise<SiteWithProject[]> => {
    return await getPrisma()
        .site
        .findMany({
            orderBy: { name: "asc" },
            include: {
                project: true
            }
        });
};

export const deleteSite = async (id: number): Promise<void> => {
    const reports = await getPrisma().lighthouseRunReport.findMany({ where: { siteId: id } });

    await getPrisma().lighthouseRunReport.deleteMany({
        where: {
            id: {
                in: reports.map((r) => r.id)
            }
        }
    });

    await getPrisma().site.delete({
        where: {
            id
        }
    });
};

export const updateSite = async (site: Site, data: Partial<Site>) => {
    return getPrisma().site.update({
        where: {
            id: site.id
        },
        data
    });
};


export const markSiteAsRunning = async (site: Site, isRunning: boolean) => {
    getLogger().debug(`Mark project #${site.id} ${site.name} as Running{${isRunning}}`);
    try {
        return getPrisma().site.update({
            where: {
                id: site.id
            },
            data: {
                is_running: isRunning
            }
        });
    } catch {
        getLogger().error(`Failed to mark site ${site.id}`);
    }
};

export const getSites = async (activeOnly?: boolean): Promise<Site[]> => {
    if (activeOnly) {
        return getActiveSites()
    }
    return (await getPrisma().site.findMany({
        orderBy: {
            project: {
                name: 'asc'
            }
        }
    })) ?? []
}
export const getActiveSites = async (): Promise<Site[]> => {
    return (await getPrisma().site.findMany({
        where: {
            project: {
                interval_reporting: true
            }
        },
        orderBy: {
            project: {
                name: 'asc'
            }
        }
    })) ?? []
}

export const getSitesByProject = async (project: Project): Promise<Site[]> => {
    try {
        return getPrisma().site.findMany({
            where: {projectId: project.id},
            orderBy: {name: 'asc'}
        })
    } catch {
        return []
    }
}


export const getSitesByProjects = async (projects: Project[]): Promise<Site[]> => {
    try {
        return getPrisma().site.findMany({
            where: {
                projectId: {
                    in: projects.map(p => p.id)
                }
            },
            orderBy: {name: 'asc'}
        })
    } catch {
        return []
    }
}
