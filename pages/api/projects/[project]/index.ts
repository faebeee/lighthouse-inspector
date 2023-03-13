import { deleteProject, getProjectById, updateProject } from "../../../../src/server/lib/project-services";
import { NextApiRequest, NextApiResponse } from "next";
import { assertAuth } from "../../../../src/server/lib/api-helpers";

export const projectHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'GET') {
        const project = await getProjectById(parseInt(request.query.project as string));
        if (!project) {
            response.status(404).send({});
            return;
        }
        response.send(project);
        return;
    }

    if (request.method === 'DELETE') {
        await deleteProject(parseInt(request.query.project as string));
        response.send({});
        return;
    }
    if (request.method === 'PATCH') {
        const project = await getProjectById(parseInt(request.query.project as string));
        if (!project) {
            response.status(404).send({});
            return;
        }
        const updatedProject = await updateProject(project, {
            name: request.body.name ?? project.name,
            group: request.body.group ?? project.group,
            url: request.body.url ?? project.url,
            interval_reporting: request.body.interval_reporting
        })
        response.send(updatedProject);
        return;
    }

}
export default assertAuth(projectHandler);
