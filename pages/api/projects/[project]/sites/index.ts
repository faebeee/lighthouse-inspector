import { NextApiRequest, NextApiResponse } from 'next'
import { getProjectById } from '../../../../../src/server/lib/project'
import { createSite, getSitesByProject } from '../../../../../src/server/lib/site'
import { assertAuth } from '../../../../../src/server/lib/api-helpers'
import { CACHE_VERY_LONG } from '../../../../../config.web'

export const ProjectsHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    const projectId = parseInt(request.query['project'] as string)
    const project = await getProjectById(projectId)
    if (!project) {
        return response.status(404).send({})
    }

    if (request.method === 'POST') {
        try {
            const site = await createSite(request.body.name, request.body.name, project)
            response.status(201).send(site);
            return;
        } catch (e) {
            response.status(403).send({ message: (e as Error).message });
            return
        }
    }

    if (request.method === 'GET') {
        const sites = await getSitesByProject(project);

        response.setHeader(
          'Cache-Control',
          `public, s-maxage=${CACHE_VERY_LONG}, stale-while-revalidate=59`
        );
        response.send(sites);
        return;
    }
}

export default assertAuth(ProjectsHandler);
