import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../src/server/get-prisma";
import { getProjectById, getProjects, updateProject } from "../../../src/server/lib/project-services";

export const ProjectsHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        try {
            const project = await getPrisma().project.create({
                data: {
                    name: request.body.name,
                    url: request.body.url,
                    group: request.body.group,
                    is_running: false,
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
