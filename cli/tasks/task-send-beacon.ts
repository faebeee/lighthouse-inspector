#!/usr/bin/env ts-node

import { sendBeacon } from '../../src/server/cli/send-beacon';
import { BEACON_KEY } from '../../config';
import { getLogger } from '../../src/server/logger';

getLogger('beacon').info('Start task');
sendBeacon(BEACON_KEY.CRON)
  .then(() => {
    getLogger('beacon').info('Task complete');
  });
