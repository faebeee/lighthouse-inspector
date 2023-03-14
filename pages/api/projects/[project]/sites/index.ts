import { NextApiRequest, NextApiResponse } from "next";
import { getPrisma } from "../../../../../src/server/get-prisma";
import { getProjectById } from "../../../../../src/server/lib/project";
import { getSitesByProject } from "../../../../../src/server/lib/site";
import { assertAuth } from "../../../../../src/server/lib/api-helpers";

export const ProjectsHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    const projectId = parseInt(request.query["project"] as string);
    const project = await getProjectById(projectId);
    if (!project) {
        return response.status(404).send({});
    }

    if (request.method === "POST") {
        try {
            const site = await getPrisma().site.create({
                data: {
                    name: request.body.name,
                    url: request.body.url,
                    projectId: project.id,
                    is_running: false
                }
            });
            response.status(201).send(site);
            return;
        } catch (e) {
            response.status(403).send({ message: (e as Error).message });
            return
        }
    }

    if (request.method === 'GET') {
        const sites = await getSitesByProject(project);
        response.send(sites);
        return;
    }
}

export default assertAuth(ProjectsHandler);
