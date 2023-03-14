import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSiteById } from "../../../../../../src/server/lib/site";
import { assertAuth, assertMethod } from "../../../../../../src/server/lib/api-helpers";
import { auditRunnerForSite } from "../../../../../../src/server/utils/audit-runner-for-site";

export const inspectHandler: NextApiHandler = assertMethod("POST", async (request: NextApiRequest, response: NextApiResponse) => {
    const site = await getSiteById(parseInt(request.query.site as string));
    if (!site || site.is_running) {
        response.send(404);
        return;
    }
    await auditRunnerForSite(site);

    return response.send({});
});

export default assertAuth(inspectHandler);
