import { getPrisma } from "../../../src/server/get-prisma";
import { isBefore, subMinutes } from "date-fns";
import { NextApiHandler } from "next";
import { BEACON_KEY } from "../../../config";

export type CronStatusApiResponse = {
    lastSeen: string;
    online: boolean
}

export const cronStatusApiHandler: NextApiHandler<CronStatusApiResponse> = async (req, res) => {
    const cronBeacon = await getPrisma()
        .beacon
        .findFirstOrThrow({
            where: {
                key: BEACON_KEY.CRON
            }
        });

    const isOnline = isBefore(subMinutes(new Date(), 5), cronBeacon.date);

    res.send({
        lastSeen: cronBeacon.date.toISOString(),
        online: isOnline
    });

};
export default cronStatusApiHandler;
