import { NextApiRequest, NextApiResponse } from "next";
import { getReportById } from "../../../../src/server/report-services";
import { getReportFile, hasReportFile } from "../../../../src/server/lib/minio";
import { assertAuth } from "../../../../src/server/lib/api-helpers";

export const reportHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    const id = parseInt(request.query.id as string);
    const report = await getReportById(id)
    if (!report) {
        return response.status(404).send('Report not found');
    }
    const hasFile = await hasReportFile(report);
    if (!hasFile) {
        return response.status(404).send('File not found');
    }
    const content = await getReportFile(report);

    return response.send(content);
}

export default assertAuth(reportHandler);
