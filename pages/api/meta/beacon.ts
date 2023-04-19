import { getPrisma } from '../../../src/server/get-prisma';
import { NextApiHandler } from 'next';
import { BEACON_KEY } from '../../../config';

export type BeaconApiResponse<T extends string = string> = {
    date: string;
    value: T | null;
}

export const beaconApiHandler: NextApiHandler<BeaconApiResponse | null> = async (req, res) => {
    const key = req.query.key as BEACON_KEY;
    try {
        const beacon = await getPrisma()
          .beacon
          .findFirstOrThrow({
              where: {
                  key
              }
          });

        res.send({
            date: beacon.date.toISOString(),
            value: beacon.value
        });
    } catch {
        res.status(404).send(null);
    }
};
export default beaconApiHandler;
