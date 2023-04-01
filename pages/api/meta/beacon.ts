import { getPrisma } from "../../../src/server/get-prisma";
import { NextApiHandler } from "next";
import { BEACON_KEY } from "../../../config";

export type BeaconApiResponse = {
    lastSeen: string;
}

export const beaconApiHandler: NextApiHandler<BeaconApiResponse | null > = async (req, res) => {
    const key = req.query.key as BEACON_KEY;
    try {
        const cronBeacon = await getPrisma()
            .beacon
            .findFirstOrThrow({
                where: {
                    key
                }
            });

        res.send({
            lastSeen: cronBeacon.date.toISOString()
        });
    } catch {
        res.status(404).send(null);
    }
};
export default beaconApiHandler;
