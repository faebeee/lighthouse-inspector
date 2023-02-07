import { getPrisma } from "../get-prisma";

export const getTagByName = (name: string) => {
    return getPrisma().tag.findFirst({
        where: {
            name
        }
    });
};
export const createTag = (name: string) => {
    return getPrisma().tag.create({
        data: {
            name
        }
    });
};

export const getAllTags = () => {
    return getPrisma().tag.findMany();
};

export const getTagsByProjectId = (id: number) => {
    return getPrisma().tag.findMany(
        {
            where: {
                projects: {
                    some: {
                        projectId: id
                    }
                }
            }
        });
};


export const projectHasTag = async (projectId: number, tagId: number) => {
    const has = await getPrisma().tagsOnProjects.findFirst({
        where: {
            projectId,
            tagId
        }
    });
    return !!has;
};

export const addTagToProject = async (projectId: number, tagId: number) => {
    const hasTag = await projectHasTag(projectId, tagId);
    if (hasTag) {
        return;
    }
    return getPrisma().tagsOnProjects.create({
        data: {
            projectId,
            tagId
        }
    });
};

export const removeTagFromProject = (projectId: number, tagId: number) => {
    return getPrisma().project.update({
        where: {
            id: projectId
        },
        data: {
            tags: {
                delete: {
                    tagId_projectId: {
                        projectId: projectId,
                        tagId: tagId
                    }
                }
            }
        }
    });
};
