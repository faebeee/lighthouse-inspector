import * as chromeLauncher from 'chrome-launcher';
import { LighthouseReport } from "../../../types/lighthouse";

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

export const inspector = async (url: string, config:unknown = {}) => {
    const chrome = await chromeLauncher.launch({ chromeFlags: [ '--headless', '--no-gpu' ] });
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

    const reportData = runnerResult.report;

    await chrome.kill();

    return {
        json: JSON.parse(reportData[0]) as LighthouseReport,
        html: reportData[1],
    };
}
