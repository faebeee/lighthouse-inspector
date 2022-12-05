import { LighthouseRunReport, Project } from "@prisma/client";
import { getPrisma } from "../get-prisma";
import { getLatestReportForProject } from "./lighthousereport-services";

export const getProjects = async (): Promise<Project[]> => {
    return getPrisma().project.findMany();
};
export const getProjectsByGroup = async (group: string): Promise<Project[]> => {
    return getPrisma().project.findMany({
        where: {
            group,
        }
    });
};

export const getProjectById = async (id: number): Promise<Project | null> => {
    return (await getPrisma().project.findFirst({
        where: {
            id,
        }
    })) || null;
}

export const updateProject = async (project: Project, data: Partial<Project>) => {
    return getPrisma().project.update({
        where: {
            id: project.id
        },
        data,
    });
}

export const getLatestReportsForAllProjects = async (type?: string) => {
    const projects = await getProjects();
    const a = {} as Record<number, LighthouseRunReport | null>;
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        a[project.id] = await getLatestReportForProject(project, type);
    }
    return a;
}
