import { NextApiHandler } from "next";
import { getLatestReportsForAllProjects } from "../../../src/server/lib/project-services";
import { transformForSerialisation } from "../../../src/server/lib/lighthousereport-services";
import { LighthouseRunReport } from "@prisma/client";

export const getReportsApiHandler: NextApiHandler = async (req, res) => {
    const desktopReports = await getLatestReportsForAllProjects("desktop");
    const a = Object.entries(desktopReports).reduce((acc, [ id, report ]) => {
        // @ts-ignore
        acc[id] = report ? transformForSerialisation(report) : null;
        return acc;
    }, {} as Record<number, LighthouseRunReport>);

    res.send(a);
};

export default getReportsApiHandler;
