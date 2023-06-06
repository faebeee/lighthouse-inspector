import { NextApiRequest, NextApiResponse } from "next";
import { deleteSite, getSiteById, updateSite } from "../../../../../../src/server/lib/site";
import { assertAuth } from "../../../../../../src/server/lib/api-helpers";
import {CACHE_VERY_SHORT} from "../../../../../../config.web";
import { auditRunnerForSite } from '../../../../../../src/server/utils/audit-runner-for-site'

export const siteHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    const currentSiteId = parseInt(request.query.site as string);
    const site = await getSiteById(currentSiteId);
    if (!site) {
        response.status(404).send({});
        return;
    }

    if (request.method === "GET") {
        const [ site ] = await Promise.all([ getSiteById(currentSiteId) ]);
        if (!site) {
            response.status(404).send({});
            return;
        }

        response.setHeader(
          'Cache-Control',
          `public, s-maxage=30, stale-while-revalidate=59`
        );
        response.send(site);
        return;
    }

    if (request.method === 'POST') {
        await auditRunnerForSite(site);
        response.send({});
        return;
    }

    if (request.method === 'DELETE') {
        await deleteSite(currentSiteId);
        response.send({});
        return;
    }
    if (request.method === 'PATCH') {
        const site = await getSiteById(currentSiteId);
        if (!site) {
            response.status(404).send({});
            return;
        }
        const updatedSite = await updateSite(site, {
            name: request.body.name ?? site.name,
            url: request.body.url ?? site.url
        });
        response.send(updatedSite);
        return;
    }

}
export default assertAuth(siteHandler);
