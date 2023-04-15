import {NextApiHandler} from "next";
import {LighthouseRunReport} from "@prisma/client";
import {assertAuth} from "../../../src/server/lib/api-helpers";
import {getLatestReportsForAllSites, transformForSerialisation} from "../../../src/server/lib/report";
import {CACHE_SHORT} from "../../../config.web";

export const getReportsApiHandler: NextApiHandler = async (req, res) => {
    const type = req.query["type"] as string;
    const desktopReports = await getLatestReportsForAllSites(type);
    const a = Object.entries(desktopReports)
        .reduce((acc, [id, report]) => {
            //@ts-ignore
            acc[id] = report ? transformForSerialisation(report) : null;
            return acc;
        }, {} as Record<number, LighthouseRunReport>);


    res.setHeader('Cache-Control', `s-maxage=${CACHE_SHORT}`)
    res.send(a);
};

export default assertAuth(getReportsApiHandler);
