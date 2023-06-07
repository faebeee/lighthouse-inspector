import { NextApiRequest, NextApiResponse } from 'next'
import { assertAuth } from '../../../../../../src/server/lib/api-helpers'
import { auditRunnerForSites } from '../../../../../../src/server/utils/audit-runner-for-site'
import { getSiteById } from '../../../../../../src/server/lib/site'

export const projectHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === 'POST') {
        const site = await getSiteById(parseInt(request.query.site as string))
        if (!site) {
            response.status(404).send({})
            return
        }

        auditRunnerForSites([ site ])
        response.send({})
        return
    }
}
export default assertAuth(projectHandler)
