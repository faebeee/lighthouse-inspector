import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { allowed, assertAuth, createHandler } from '../../../../src/server/lib/api-helpers';
import { getProjectById, updateProject } from '../../../../src/server/lib/project';


const methods: NextApiHandler[] = [
    allowed('GET', async (request: NextApiRequest, response: NextApiResponse) => {
        const project = await getProjectById(parseInt(request.query.project as string));

        response.setHeader(
          'Cache-Control',
          `public, s-maxage=30, stale-while-revalidate=59`
        );
        return response.send(project);
    }),
    allowed("PUT", async (request: NextApiRequest, response: NextApiResponse) => {
        const project = await getProjectById(parseInt(request.query.project as string));
        if (!project) {
            return response.status(404).send({});
        }
        const updatedProject = await updateProject(project?.id, {
            name: request.body.name as string ?? project?.name,
            interval_reporting: request.body.interval_reporting ?? project?.interval_reporting
        });

        return response.send(updatedProject);
    })
];


export default assertAuth(createHandler(methods));
