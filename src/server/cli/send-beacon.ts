import { getPrisma } from "../get-prisma";
import { getLogger } from "../logger";

export const sendBeacon = async (): Promise<void> => {
    getLogger().debug("Send health beacon");
    
    await getPrisma().beacon.upsert({
        where: {
            key: "cron"
        },
        create: {
            key: "cron",
            date: new Date()
        },
        update: {
            date: new Date()
        }
    });
};
