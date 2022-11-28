import fs from 'fs';
import * as chromeLauncher from 'chrome-launcher';
import { format } from 'date-fns';
import { REPORTFILE_PROJECT_DELIMITER, REPORTS_FOLDER } from "../config";

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
      // lighthouse:default is mobile by default
      // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
      skipAudits: ['uses-http2'],
    },
    audits: [
      'metrics/first-contentful-paint-3g',
    ],
    categories: {
      // TODO(bckenny): type extended Config where e.g. category.title isn't required
      performance: /** @type {LH.Config.CategoryJson} */({
        auditRefs: [
          {id: 'first-contentful-paint-3g', weight: 0},
        ],
      }),
    },
}

export const inspector = async (url: string, name: string, config:unknown = {}) => {
    const chrome = await chromeLauncher.launch({ chromeFlags: [ '--headless' ] });
    const options = {
        logLevel: 'info', output: [ 'json', 'html' ], 
        port: chrome.port, 
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
