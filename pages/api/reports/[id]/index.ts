import path from "path";
import { REPORTS_FOLDER } from "../../../../config";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const reportHandler = (request: NextApiRequest, response: NextApiResponse) => {
    const name = request.query.name as string;
    const file = path.join(REPORTS_FOLDER, name);
    if (!fs.existsSync(file)) {
        return response.status(404).send({});
    }

    const data = fs.readFileSync(file, 'utf8');
    return response.send(data);
}

export default reportHandler;
