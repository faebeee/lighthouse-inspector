import fs from "fs";
import path from "path";
import { ReportResult } from "../pages/reports/[project]";
import { REPORTS_FOLDER } from "../config";
import glob from "glob";

export const getReportFilesForProject = async (project: string): Promise<string[]> => {
    const folder = path.join(process.cwd(), REPORTS_FOLDER);
    return new Promise((resolve, reject) => {
        glob(`${ folder }/${ project }/*.json`, (err, files) => {
            if (err) {
                return reject(err);
            }
            return resolve(files);
        });
    })
}

export const getReportsForProject = async (project: string): Promise<ReportResult[]> => {
    const folder = path.join(process.cwd(), REPORTS_FOLDER);
    return new Promise((resolve, reject) => {
        glob(`${ folder }/${ project }/*.json`, (err, files) => {
            if (err) {
                return reject(err);
            }
            const reports = files.reduce((acc, file) => {
                const report = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
                const htmlReport = file.replace('.json', '.html');
                const htmlExists = fs.existsSync(htmlReport);
                acc.push({
                    date: report.fetchTime,
                    finalUrl: report.finalUrl,
                    performance: report.categories.performance.score * 100,
                    accessibility: report.categories.accessibility.score * 100,
                    bestPractices: report.categories['best-practices'].score * 100,
                    seo: report.categories.seo.score * 100,
                    pwa: report.categories.pwa.score * 100,
                    hasReport: htmlExists,
                    htmlReportFile: htmlExists ? path.basename(htmlReport, '.html') : null,
                    type: report.configSettings.formFactor,
                    stacks: report.stackPacks.map((stack) => stack.title),
                });
                return acc;
            }, [] as ReportResult[]);
            return resolve(reports);
        });
    })
}
