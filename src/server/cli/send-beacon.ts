import { getPrisma } from "../get-prisma";
import { getLogger } from "../logger";
import { BEACON_KEY } from "../../../config";

export const sendBeacon = async (key: BEACON_KEY): Promise<void> => {
    getLogger().debug("Send health beacon");

    await getPrisma().beacon.upsert({
        where: {
            key: key
        },
        create: {
            key: key,
            date: new Date()
        },
        update: {
            date: new Date()
        }
    });
};
