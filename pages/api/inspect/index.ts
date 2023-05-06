import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { allowed, assertAuth } from '../../../src/server/lib/api-helpers'
import { getRunningSites } from '../../../src/server/lib/site'
import { runAudit } from '../../../src/server/cli/run-audit'


const onPost = allowed('POST', async (request: NextApiRequest, response: NextApiResponse) => {
    runAudit()
    return response.send({})
})

const onGet = allowed('GET', async (request: NextApiRequest, response: NextApiResponse) => {
    const projects = await getRunningSites()
    return response.send(projects)
});

export const inspectHandler: NextApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    await onPost(request, response);
    await onGet(request, response);
};

export default assertAuth(inspectHandler);
