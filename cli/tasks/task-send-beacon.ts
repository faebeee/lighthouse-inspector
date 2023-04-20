#!/usr/bin/env ts-node

import { BEACON_KEY } from '../../config';
import { getLogger } from '../../src/server/logger';
import { setBeaconDate } from '../../src/server/lib/beacon';

getLogger('beacon').info('Send beacon');

setBeaconDate(BEACON_KEY.CRON, new Date())
  .then(() => {
    getLogger('beacon').info('Send beacon complete');
  })
  .catch((e) => {
    getLogger('beacon').error(e);
  });
