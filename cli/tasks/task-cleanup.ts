#!/usr/bin/env ts-node

import { cleanup } from '../../src/server/cli/cleanup';
import { getLogger } from '../../src/server/logger';

getLogger('cleanup').info('Start cleanup')

cleanup()
  .then(() => {
    getLogger().info('Cleanup complete')
  })
  .catch((e) => {
    getLogger().error(e)
  })
