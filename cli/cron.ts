#!/usr/bin/env ts-node

import cron from "node-cron";
import { AUDIT_CRON_EXPRESSION, CLEANUP_CRON_EXPRESSION } from "../config.cron";
import { getLogger } from "../src/server/logger";
import { runAudit } from "../src/server/cli/run-audit";
import { cleanup } from "../src/server/cli/cleanup";

cron.schedule(AUDIT_CRON_EXPRESSION, () => {
    runAudit();
});

cron.schedule(CLEANUP_CRON_EXPRESSION, () => {
    cleanup();
});

getLogger().info("Cron setup");

