import { NextApiRequest, NextApiResponse } from 'next'
import { auditRunnerForProjects } from '../../../../src/server/utils/audit-runner-for-site'
import { assertAuth } from '../../../../src/server/lib/api-helpers'
import { getProjectById } from '../../../../src/server/lib/project'

export const projectHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const project = await getProjectById(parseInt(request.query.project as string))
        if (!project) {
            response.status(404).send({})
            return
        }

        auditRunnerForProjects([ project ])
        response.send({})
        return
    }
}
export default assertAuth(projectHandler)
