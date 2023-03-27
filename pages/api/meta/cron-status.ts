import { getPrisma } from "../../../src/server/get-prisma";
import { isBefore, subMinutes } from "date-fns";
import { NextApiHandler } from "next";

export type CronStatusApiResponse = {
    lastSeen: string;
    online: boolean
}

export const cronStatusApiHandler: NextApiHandler<CronStatusApiResponse> = async (req, res) => {
    const cronBeacon = await getPrisma()
        .beacon
        .findFirstOrThrow({
            where: {
                key: "cron"
            }
        });

    const isOnline = isBefore(subMinutes(new Date(), 2), cronBeacon.date);

    res.send({
        lastSeen: cronBeacon.date.toISOString(),
        online: isOnline
    });

};
export default cronStatusApiHandler;
