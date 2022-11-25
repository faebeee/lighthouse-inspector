import fs from 'fs';
import * as chromeLauncher from 'chrome-launcher';
import { format } from 'date-fns';
import { REPORTFILE_PROJECT_DELIMITER, REPORTS_FOLDER } from "../config";

const lighthouse = require('lighthouse');

export const inspector = async (url: string, name: string) => {
    const chrome = await chromeLauncher.launch({ chromeFlags: [ '--headless' ] });
    const options = { logLevel: 'info', output: [ 'json', 'html' ], port: chrome.port };
    const runnerResult = await lighthouse(url, options);

    // `.report` is the HTML report as a string
    const folder = `${ REPORTS_FOLDER }/${ name }`
    const reportData = runnerResult.report;
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
    fs.writeFileSync(`${ folder }/${ format(new Date(), 'yyyy-MM-dd-HHmm') }.json`, reportData[0]);
    fs.writeFileSync(`${ folder }/${ format(new Date(), 'yyyy-MM-dd-HHmm') }.html`, reportData[1]);

    await chrome.kill();
}
