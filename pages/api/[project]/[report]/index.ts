import { NextApiRequest, NextApiResponse } from "next";
import { REPORTS_FOLDER } from "../../../../config";
import path from 'path';
import fs from 'fs';

export const reportHandler = (request: NextApiRequest, response: NextApiResponse) => {
    const { project, report } = request.query;
    const type = request.query.type === 'json' ? 'json' : 'html';
    const file = path.join(REPORTS_FOLDER, project as string, `${ report }.${ type }`);
    if (!fs.existsSync(file)) {
        return response.status(404).send({});
    }

    const data = fs.readFileSync(file, 'utf8');
    return response.send(data);
}

export default reportHandler;
