import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../src/server/get-prisma";
import { getSites, getProjectsByTags } from "../../../src/server/lib/project-services";
import { assertAuth } from "../../../src/server/lib/api-helpers";

export const ProjectsHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "POST") {
        try {
            const project = await getPrisma().project.create({
                data: {
                    name: request.body.name,
                    url: request.body.url,
                    group: request.body.group,
                    is_running: false
                }
            });
            response.status(201).send(project);
            return;
        } catch (e) {
            response.status(403).send({ message: (e as Error).message });
            return
        }
    }

    if (request.method === 'GET') {
        const ids = request.query["tags[]"];
        if (Array.isArray(ids)) {
            const projects = await getProjectsByTags(ids.map((i) => parseInt(i)));
            response.send(projects);
            return;
        }

        if (typeof ids === "string") {
            const projects = await getProjectsByTags([ parseInt(ids) ]);
            response.send(projects);
            return;
        }
        const projects = await getSites();
        response.send(projects);
        return;
    }
}

export default assertAuth(ProjectsHandler);
