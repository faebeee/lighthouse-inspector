import { NextApiRequest, NextApiResponse } from "next";
import { addTagToProject, createTag, getTagsByProjectId } from "../../../../../src/server/lib/tag-service";

export type Tag = {
    name: string;
    id?: number;
}
export const projectTagApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    const projectId = parseInt(request.query["project"] as string);
    if (request.method === "GET") {
        const tags = await getTagsByProjectId(projectId);
        response.send(tags);
        return;
    }

    if (request.method === "POST") {
        const tags = request.body["tags"] as (Tag | string)[];
        const createdTags = await Promise.all(tags.filter(t => typeof t === "string").map((name) => createTag(name as string)));
        await Promise.all(tags.map(t => {
            if (typeof t === "string") {
                return createdTags.find(tag => tag.name === t);
            }
            return t;
        })
            .filter(t => !!t?.id)
            .map((tag) => addTagToProject(projectId, tag!.id!)));
        const newTags = await getTagsByProjectId(projectId);
        response.send(newTags);
        return;
    }
};
export default projectTagApiHandler;
