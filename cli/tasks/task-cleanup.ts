#!/usr/bin/env ts-node

import { cleanup } from '../../src/server/cli/cleanup';
import { getLogger } from '../../src/server/logger';

getLogger('cleanup').info('Start task')

cleanup()
  .then(() => {
    getLogger().info('Task complete')
  })
  .catch((e) => {
    getLogger().error(e)
  })
