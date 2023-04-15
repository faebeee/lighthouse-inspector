import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {getSiteById, updateSite} from "../../../../../../src/server/lib/site";
import {assertAuth} from "../../../../../../src/server/lib/api-helpers";
import {getShareUrl} from "../../../../../../src/routes";
import {getPrisma} from "../../../../../../src/server/get-prisma";
import {v4 as uuidv4} from 'uuid';

export type ShareHandlerGetResponse = {
    url: string | null;
}
export const shareHandler:NextApiHandler<ShareHandlerGetResponse | null> = async (request, response) => {
    const currentSiteId = parseInt(request.query.site as string);
    const site = await getSiteById(currentSiteId);

    if (request.method === "GET") {
        response.send({url: site?.share_token ? getShareUrl(site.share_token) : null});
        return;
    }

    if (request.method === 'DELETE') {
        await getPrisma().site.update({
            where: {
                id: site?.id
            },
            data: {
                share_token: null
            }
        })
        response.status(203).send(null);
        return;
    }

    if (request.method === 'POST') {
        if (!site) {
            response.status(404).send(null);
            return;
        }
        const token = uuidv4();
        await updateSite(site, {
            share_token: token
        });
        response.send({url: getShareUrl(token)});
        return;
    }

}
export default assertAuth(shareHandler);
