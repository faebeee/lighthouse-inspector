import { NextApiRequest, NextApiResponse } from "next";
import { REPORTS_FOLDER } from "../../../../config";
import path from 'path';
import fs from 'fs';
import { LighthouseReport } from "../../../../types/lighthouse";

export const thumbnailHandler = (request: NextApiRequest, response: NextApiResponse) => {
    const { project, report } = request.query;
    const file = path.join(REPORTS_FOLDER, project as string, `${ report }.json`);
    if (!fs.existsSync(file)) {
        return response.status(404).send({});
    }
    const data = JSON.parse(fs.readFileSync(file, 'utf8')) as LighthouseReport;
    const imageBase64Data = data.audits['final-screenshot'].details.data;
    const img = Buffer.from(imageBase64Data, 'base64');

    response.setHeader('Content-Type', 'image/jpg')
    response.send(imageBase64Data);
}

export default thumbnailHandler;
