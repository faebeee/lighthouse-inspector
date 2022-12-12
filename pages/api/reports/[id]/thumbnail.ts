import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import * as fs from 'fs';
import { REPORTS_FOLDER } from "../../../../config";
import { getReportById } from "../../../../src/server/report-services";
import { ConstructionOutlined } from "@mui/icons-material";



export const thumbnailHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const reportId = parseInt(req.query.id as string);
    const report = await getReportById(reportId);
    if (!report || !report?.htmlReportFile) {
        res.status(404).send({});
        return;
    }
    const file = path.basename(report?.htmlReportFile, '.html');
    const filePath = path.join(process.cwd(), REPORTS_FOLDER, `${file}.json`);
    if (!fs.existsSync(filePath)) {
        res.status(404).send('File not found');
        return;
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const reportData = JSON.parse(fileContents);
    const imageBase64 = reportData.audits['final-screenshot'].details.data
    console.log(imageBase64);
    const byteArray = new Buffer(imageBase64.replace(/^[\w\d;:\/]+base64\,/g, ''), 'base64');

    return res
        .setHeader('Content-Type', 'image/jpeg')
        .setHeader('Content-Length', byteArray.length)
        .send(byteArray);
}
export default thumbnailHandler;