import fs from 'fs';
import * as chromeLauncher from 'chrome-launcher';
import { format } from 'date-fns';
import { REPORTFILE_PROJECT_DELIMITER, REPORTS_FOLDER } from "../../../config";

const lighthouse = require('lighthouse');
const constants = require('lighthouse/lighthouse-core/config/constants');

export const DESKTOP_CONFIG = {
    extends: 'lighthouse:default',
    settings: {
      maxWaitForFcp: 15 * 1000,
      maxWaitForLoad: 35 * 1000,
      formFactor: 'desktop',
      throttling: constants.throttling.desktopDense4G,
      screenEmulation: constants.screenEmulationMetrics.desktop,
      emulatedUserAgent: constants.userAgents.desktop,
    },
}

export const MOBILE_CONFIG = {
    extends: 'lighthouse:default',
    settings: {
      maxWaitForFcp: 15 * 1000,
      maxWaitForLoad: 35 * 1000,
    },
    audits: [
      'metrics/first-contentful-paint-3g',
    ],
}

export const inspector = async (url: string, name: string, config:unknown = {}) => {
    console.log(`Run for ${ url }`);
    const chrome = await chromeLauncher.launch({ chromeFlags: [ '--headless', '--no-gpu', '--no-sandbox', '--disable-dev-shm-usage' ] });
    const options = {
        logLevel: 'info',
        output: [ 'json', 'html' ],
        port: chrome.port,
        locale: 'en-US',
        settings: {
            throttling: constants.throttling.desktopDense4G,
            screenEmulation: constants.screenEmulationMetrics.desktop,
        }
    };
    const runnerResult = await lighthouse(url, options, config);

    // `.report` is the HTML report as a string
    const folder = `${ REPORTS_FOLDER }/${ name }`
    const reportData = runnerResult.report;
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
    fs.writeFileSync(`${ folder }/${ format(new Date(), 'yyyy-MM-dd-HHmmss') }.json`, reportData[0]);
    fs.writeFileSync(`${ folder }/${ format(new Date(), 'yyyy-MM-dd-HHmmss') }.html`, reportData[1]);

    await chrome.kill();
}
