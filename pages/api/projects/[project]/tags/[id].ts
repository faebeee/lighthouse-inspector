import { NextApiRequest, NextApiResponse } from "next";
import { getTagsByProjectId, removeTagFromProject } from "../../../../../src/server/lib/tag-service";

export const projectTagApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "DELETE") {
        await removeTagFromProject(parseInt(request.query["project"] as string), parseInt(request.query["id"] as string));
        const tags = await getTagsByProjectId(parseInt(request.query["project"] as string));
        response.send(tags);
        return;
    }
};
export default projectTagApiHandler;
