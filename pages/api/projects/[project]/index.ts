import { getProjectById, updateProject } from "../../../../src/server/lib/project-services";
import { NextApiRequest, NextApiResponse } from "next";

export const projectHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'PATCH') {
        console.log(request.query.project);
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
export default projectHandler;
