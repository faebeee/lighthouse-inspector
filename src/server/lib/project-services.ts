import { LighthouseRunReport, Project } from "@prisma/client";
import { getPrisma } from "../get-prisma";
import { getLatestReportForProject } from "./lighthousereport-services";

export const getProjects = async (): Promise<Project[]> => {
    return (await getPrisma().project.findMany({ include: { tags: true } })) ?? [];
};
export const getProjectsByGroup = async (group: string): Promise<Project[]> => {
    return getPrisma().project.findMany({
        where: {
            group
        },
    });
};

export const getProjectById = async (id: number): Promise<Project | null> => {
    return (await getPrisma().project.findFirst({
        where: {
            id
        },
    })) || null;
}

export const deleteProject = async (id: number): Promise<void> => {
    const reports = await getPrisma().lighthouseRunReport.findMany({where: {projectId: id}});

    await getPrisma().lighthouseRunReport.deleteMany({
        where: {
            id: {
                in: reports.map((r) => r.id),
            },
        }
    });

    await getPrisma().project.delete({
        where: {
            id,
        }
    });
}

export const updateProject = async (project: Project, data: Partial<Project>) => {
    return getPrisma().project.update({
        where: {
            id: project.id
        },
        data,
    });
}


export const markProjectAsRunning = async (project: Project, isRunning: boolean) => {
    return getPrisma().project.update({
        where: {
            id: project.id
        },
        data: {
            is_running: isRunning,
        },
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
