#!/usr/bin/env ts-node

import { runAudit } from '../../src/server/cli/run-audit';
import { getLogger } from '../../src/server/logger';

getLogger('audit').info('Run audit');
runAudit()
  .then(() => {
    getLogger('audit').info('Complete');
  });
