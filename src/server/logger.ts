import { pino } from "pino";

const logger = pino({
    level: "debug",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true
        }
    }
});

export const getLogger = () => logger;
