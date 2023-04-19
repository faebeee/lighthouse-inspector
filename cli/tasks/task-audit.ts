#!/usr/bin/env ts-node

import { runAudit } from '../../src/server/cli/run-audit';
import { getLogger } from '../../src/server/logger';
import { setBeaconValue } from '../../src/server/lib/beacon';
import { AUDIT_BEACON_VALUE, BEACON_KEY } from '../../config';

getLogger('audit').info('Start audit');

setBeaconValue(BEACON_KEY.AUDIT, AUDIT_BEACON_VALUE.running)
  .then(() => runAudit())
  .then(() => {
    getLogger('audit').info('Audt complete');
  })
  .catch((e) => {
    getLogger('audit').error(e);
  })
  .finally(() => setBeaconValue(BEACON_KEY.AUDIT, AUDIT_BEACON_VALUE.standby));
