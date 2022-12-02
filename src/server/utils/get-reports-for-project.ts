import fs from "fs";
import path from "path";
import { ReportResult } from "../../../pages/reports/[project]";
import { REPORTS_FOLDER } from "../../../config";
import glob from "glob";
import { LighthouseReport } from "../../../types/lighthouse";

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

export const getAllReports = (): Promise<ReportResult[]> => {
    const folder = path.join(process.cwd(), REPORTS_FOLDER);
    return new Promise((resolve, reject) => {
        return glob(`${ folder }/**/*.json`, (err, files) => {
            if (err) {
                return reject(err);
            }
            const reports = files.reduce((acc, file) => {
                acc.push(getReport(file));
                return acc;
            }, [] as ReportResult[]);
            return resolve(reports);
        });
    });
}

export const getReport = (file: string): ReportResult => {
    const report = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' })) as LighthouseReport;
    const htmlReport = file.replace('.json', '.html');
    const htmlExists = fs.existsSync(htmlReport);
    const projectName = path.basename(path.dirname(file));
    return {
        projectName: projectName,
        date: report.fetchTime,
        finalUrl: report.finalUrl,
        performance: report.categories.performance.score * 100,
        accessibility: report.categories.accessibility.score * 100,
        bestPractices: report.categories['best-practices'].score * 100,
        seo: report.categories.seo.score * 100,
        pwa: report.categories.pwa.score * 100,
        imageBase64: report.audits['final-screenshot'].details.data,
        hasReport: htmlExists,
        htmlReportFile: htmlExists ? path.basename(htmlReport, '.html') : null,
        type: report.configSettings.formFactor,
        stacks: report.stackPacks.map((stack) => stack.title),
    };
}

export const getReportsForProject = async (project: string): Promise<ReportResult[]> => {
    const folder = path.join(process.cwd(), REPORTS_FOLDER);
    return new Promise((resolve, reject) => {
        glob(`${ folder }/${ project }/*.json`, (err, files) => {
            if (err) {
                return reject(err);
            }
            const reports = files.reduce((acc, file) => {
                acc.push(getReport(file));
                return acc;
            }, [] as ReportResult[]);
            return resolve(reports);
        });
    })
}
