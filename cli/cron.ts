#!/usr/bin/env ts-node

import cron from "node-cron";
import { AUDIT_CRON_EXPRESSION, CLEANUP_CRON_EXPRESSION, SEND_HEALTH_BEACON_EXPRESSION } from "../config.cron";
import { getLogger } from "../src/server/logger";
import { runAudit } from "../src/server/cli/run-audit";
import { cleanup } from "../src/server/cli/cleanup";
import { sendBeacon } from "../src/server/cli/send-beacon";
import { BEACON_KEY } from "../config";

cron.schedule(AUDIT_CRON_EXPRESSION, () => {
    runAudit();
});

cron.schedule(CLEANUP_CRON_EXPRESSION, () => {
    cleanup();
});

cron.schedule(SEND_HEALTH_BEACON_EXPRESSION, () => {
    sendBeacon(BEACON_KEY.CRON);
});

sendBeacon(BEACON_KEY.CRON);
getLogger().info("Cron setup");

