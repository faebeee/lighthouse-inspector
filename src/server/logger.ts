import { pino } from 'pino';

const targets = [];

if (process.env.LOGTAIL_SOURCE_TOKEN) {
    targets.push({
        level: 'debug',
        target: '@logtail/pino',
        options: {sourceToken: process.env.LOGTAIL_SOURCE_TOKEN}
    });
}

const transports = pino.transport({
    targets
});

const logger = pino(transports);

export const getLogger = (name?: string) => {
    return logger;
};
