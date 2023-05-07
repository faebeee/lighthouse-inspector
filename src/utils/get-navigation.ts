import { getProjects } from '../server/lib/project'

export type NavigationEntry = {
    label: string;
    url: string;
    isGroup?: boolean;
    isActive?: boolean;
}

export const getNavigation = async (): Promise<NavigationEntry[]> => {
    const activeProjects = await getProjects(true)
    const inactiveProjects = await getProjects(false)
    const links = [ ...activeProjects, ...inactiveProjects ].map((project) => {
        return {
            label: project.name,
            url: `/projects/${project.id}`,
            isActive: project.interval_reporting
        }

    }, {} as Record<number | string, NavigationEntry>)
    return links
}
