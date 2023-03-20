#!/usr/bin/env ts-node

import cron from "node-cron";
import { getLogger } from "../src/server/logger";
import { exec } from "./audit";


cron.schedule("*/15 * * * *", () => {
    exec();
});
getLogger().info("Cron setup");

