import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../src/server/get-prisma";
import { getProjects } from "../../../src/server/lib/project-services";

export const ProjectsHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        try {
            const project = await getPrisma().project.create({
                data: {
                    name: request.body.name,
                    url: request.body.url,
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
        const projects = await getProjects();
        response.send(projects);
        return;
    }
}

export default ProjectsHandler;
