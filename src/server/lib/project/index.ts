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


