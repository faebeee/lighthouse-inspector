import { NextApiRequest, NextApiResponse } from "next";
import { getReportById } from "../../../../src/server/report-services";
import { getReportFile, hasReportFile } from "../../../../src/server/lib/minio";
import { assertAuth } from "../../../../src/server/lib/api-helpers";
import { CACHE_SHORT, CACHE_VERY_LONG } from '../../../../config.web';

export const reportHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    const id = parseInt(request.query.id as string);
    const type = (request.query.type as "html" | "json") ?? "html";
    const report = await getReportById(id);
    if (!report) {
        return response.status(404).send('Report not found');
    }
    const hasFile = await hasReportFile(report, type);
    if (!hasFile) {
        return response.status(404).send('File not found');
    }
    const content = await getReportFile(report, type);

    response.setHeader(
      'Cache-Control',
      `public, s-maxage=${CACHE_VERY_LONG}, stale-while-revalidate=59`
    );
    return response.send(content);
}

export default assertAuth(reportHandler);
