export const KEEP_TOTAL_REPORTS = process.env.MAX_DATA_RETENTION_ITEMS ?? 20;
export const AUDIT_CRON_EXPRESSION = process.env.AUDIT_CRON ?? "*/15 * * * *";
export const CLEANUP_CRON_EXPRESSION = process.env.CLEANUP_CRON ?? "* 12 * * *";
export const SEND_HEALTH_BEACON_EXPRESSION = "* * * * *";
