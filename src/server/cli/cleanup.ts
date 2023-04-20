import { KEEP_TOTAL_REPORTS } from "../../../config.cron";
import { getPrisma } from "../get-prisma";
import { getAllSites } from "../lib/site";
import { getLogger } from "../logger";

export const cleanup = async () => {
    getLogger().debug(`Cleanup started`);

    const allSites = await getAllSites();
    for (let i = 0; i < allSites.length; i++) {
        const site = allSites[i];
        const reports = await getPrisma()
            .lighthouseRunReport
            .findMany({
                where: {
                    siteId: site.id
                },
                orderBy: {
                    date: "desc"
                },
                take: KEEP_TOTAL_REPORTS
            });

        const removedReports = await getPrisma()
            .lighthouseRunReport
            .deleteMany({
                where: {
                    siteId: site.id,
                    id: {
                        notIn: reports.map(r => r.id)
                    }
                }
            });

        getLogger().info(`Cleanup reports for ${ site.project.name } - ${ site.name }. Removed ${ removedReports.count } reports`);
    }

    getLogger().debug(`Cleanup complete`);
};
