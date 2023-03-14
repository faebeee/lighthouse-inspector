import { getProjects } from "../server/lib/project";

export type NavigationEntry = {
    label: string;
    url: string;
    isGroup?: boolean;
}

export const getNavigation = async (): Promise<NavigationEntry[]> => {
    const projects = await getProjects();
    const links = projects.map((project) => {
        return {
            label: project.name,
            url: `/projects/${ project.id }`
        };

    }, {} as Record<number | string, NavigationEntry>);
    return links;
}
