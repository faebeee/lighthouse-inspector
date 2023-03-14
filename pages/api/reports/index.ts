import { NextApiHandler } from "next";
import { getLatestReportsForAllSites } from "../../../src/server/lib/project-services";
import { transformForSerialisation } from "../../../src/server/lib/lighthousereport-services";
import { LighthouseRunReport } from "@prisma/client";
import { assertAuth } from "../../../src/server/lib/api-helpers";

export const getReportsApiHandler: NextApiHandler = async (req, res) => {
    const type = req.query["type"] as string;
    const desktopReports = await getLatestReportsForAllSites(type);
    const a = Object.entries(desktopReports)
        .reduce((acc, [ id, report ]) => {
            // @ts-ignore
            acc[id] = report ? transformForSerialisation(report) : null;
            return acc;
        }, {} as Record<number, LighthouseRunReport>);

    res.send(a);
};

export default assertAuth(getReportsApiHandler);
