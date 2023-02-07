import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { assertMethod } from "../../../../src/server/lib/api-helpers";
import { getProjectsByGroup } from "../../../../src/server/lib/project-services";

export const getGroupApiHandler: NextApiHandler = assertMethod("GET", async (request: NextApiRequest, response: NextApiResponse) => {
    const projects = await getProjectsByGroup(request.query.group as string);

    return response.send(projects);
});

export default getGroupApiHandler;
