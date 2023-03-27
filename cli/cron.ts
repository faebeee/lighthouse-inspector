#!/usr/bin/env ts-node

import cron from "node-cron";
import { AUDIT_CRON_EXPRESSION, CLEANUP_CRON_EXPRESSION, SEND_HEALTH_BEACON_EXPRESSION } from "../config.cron";
import { getLogger } from "../src/server/logger";
import { runAudit } from "../src/server/cli/run-audit";
import { cleanup } from "../src/server/cli/cleanup";
import { sendBeacon } from "../src/server/cli/send-beacon";

cron.schedule(AUDIT_CRON_EXPRESSION, () => {
    runAudit();
});

cron.schedule(CLEANUP_CRON_EXPRESSION, () => {
    cleanup();
});

cron.schedule(SEND_HEALTH_BEACON_EXPRESSION, () => {
    sendBeacon();
});

sendBeacon();
getLogger().info("Cron setup");

