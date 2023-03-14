import { Project, Site } from "@prisma/client";
import { getPrisma } from "../../get-prisma";
import { getLogger } from "../../logger";

export const getSiteById = async (id: number): Promise<Site | null> => {
    return (await getPrisma().site.findFirst({
        where: {
            id
        }
    })) || null;
};

export const getRunningSites = async (): Promise<Site[]> => {
    return (await getPrisma().site.findMany({
        where: {
            is_running: true
        },
        orderBy: { name: "asc" }
    })) ?? [];
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
    getLogger().debug(`Mark project #${ site.id } ${ site.name } as Running{${ isRunning }}`);
    return getPrisma().site.update({
        where: {
            id: site.id
        },
        data: {
            is_running: isRunning
        }
    });
};

export const getSites = async (): Promise<Site[]> => {
    return (await getPrisma().site.findMany({
        orderBy: { name: "asc" }
    })) ?? [];
};

export const getSitesByProject = async (project: Project): Promise<Site[]> => {
    try {
        return getPrisma().site.findMany({
            where: { projectId: project.id }
        });
    } catch {
        return [];
    }
};
