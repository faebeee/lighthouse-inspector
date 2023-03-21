import { getPrisma } from "../../get-prisma";
import { Project } from "@prisma/client";

export const getProjectsByTags = async (tagId: number[]): Promise<Project[]> => {
    return (await getPrisma().project.findMany({
        where: {
            tags: {
                some: {
                    tagId: {
                        in: tagId
                    }
                }
            }
        },
        include: { tags: true },
        orderBy: { name: "asc" }
    })) ?? [];
};

export const getAutoUpdateProjects = async (): Promise<Project[]> => {
    return (await getPrisma().project.findMany({
        where: {
            interval_reporting: true
        },
        include: { tags: true }
    })) ?? [];
};

export const getProjectById = async (projectId: number): Promise<Project | null> => {
    try {
        return getPrisma().project.findFirst({
            where: { id: projectId }
        });
    } catch {
        return null;
    }
};

export const getProjects = async (): Promise<Project[]> => {
    try {
        return getPrisma().project.findMany();
    } catch {
        return [];
    }
};

export const updateProject = async (id: number, data: Partial<Project>) => {
    console.log(data);
    return getPrisma().project.update({
        where: {
            id
        },
        data
    });
};
