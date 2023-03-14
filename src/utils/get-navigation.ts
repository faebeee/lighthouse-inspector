import { getSites } from "../server/lib/project-services";

export type NavigationEntry = {
    label: string;
    url: string;
    isGroup?: boolean;
}

export const getNavigation = async (): Promise<NavigationEntry[]> => {
    const projects = await getSites();
    const links = projects.reduce((acc, project) => {
        if(!project.group){
            acc[project.id] = {label: project.name, url: `/projects/${project.id}`};
        }

        if(project.group && !acc[project.group]){
            acc[project.group] = {label: project.group, url: `/group/${project.group}`, isGroup: true};
        }

        return acc;
    },{} as Record<number|string, NavigationEntry>);
    return Object.values(links);
}
