import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../src/server/get-prisma";
import { assertAuth } from "../../../src/server/lib/api-helpers";

export const ProjectsHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "POST") {
        try {
            const project = await getPrisma().project.create({
                data: {
                    name: request.body.name,
                    interval_reporting: true,
                }
            });
            response.status(201).send(project);
            return;
        } catch (e) {
            response.status(403).send({ message: (e as Error).message });
            return
        }
    }
}

export default assertAuth(ProjectsHandler);
