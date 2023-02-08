import { deleteProject, getProjectById, updateProject } from "../../../../src/server/lib/project-services";
import { NextApiRequest, NextApiResponse } from "next";
import { assertAuth } from "../../../../src/server/lib/api-helpers";

export const projectHandler = async (request: NextApiRequest, response: NextApiResponse) => {
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
            group: request.body.group
        })
        response.send(updatedProject);
        return;
    }

}
export default assertAuth(projectHandler);
