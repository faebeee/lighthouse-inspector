import { NextApiRequest, NextApiResponse } from "next";
import { getReportById } from "../../../../src/server/report-services";
import { getReportFile, hasReportFile } from "../../../../src/server/lib/minio";


export const thumbnailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const reportId = parseInt(req.query.id as string);
    const isMobile = req.query.type === 'mobile';
    const report = await getReportById(reportId);
    if (!report || !report?.htmlReportFile) {
        res.status(404).send(`No reportfile stored`);
        return;
    }

    const reportFileExists = await hasReportFile(report, 'json', isMobile );
    if (!reportFileExists) {
        res.status(404).send(`File for report #${ report } (${ report.htmlReportFile }) not found`);
        return;
    }
    const fileContents = await getReportFile(report, 'json', isMobile)!;

    const reportData = JSON.parse(fileContents);
    const imageBase64 = reportData.audits['final-screenshot'].details.data
    const byteArray = new Buffer(imageBase64.replace(/^[\w\d;:\/]+base64\,/g, ''), 'base64');

    return res
        .setHeader('Content-Type', 'image/jpeg')
        .setHeader('Content-Length', byteArray.length)
        .send(byteArray);
}
export default thumbnailHandler;
