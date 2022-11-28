import glob from "glob";
import { REPORTS_FOLDER } from "../config";

export const getProjects = async (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        glob(`${ REPORTS_FOLDER }/*/*.json`, (err, files) => {
            if (err) {
                return reject(err);
            }
            const projects = files.reduce((acc, file) => {
                const projectName = file.split('/')[1] ?? '';
                if (projectName && !acc.includes(projectName)) {
                    acc.push(projectName)
                }
                return acc;
            }, [] as string[]);
            return resolve(projects);
        });
    })
}
