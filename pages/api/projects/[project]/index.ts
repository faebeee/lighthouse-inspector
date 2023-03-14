import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { assertAuth, assertMethod } from "../../../../src/server/lib/api-helpers";
import { getProjectById } from "../../../../src/server/lib/project";

export const getProjectApiHandler: NextApiHandler = assertMethod("GET", async (request: NextApiRequest, response: NextApiResponse) => {
    const projects = await getProjectById(parseInt(request.query.project as string));

    return response.send(projects);
});

export default assertAuth(getProjectApiHandler);
