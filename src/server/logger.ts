import { pino } from 'pino';

const targets: {level:string, target:string, options: object}[] = [
    {
        level: 'debug',
        target: 'pino-pretty',
        options: {
            msgPrefix: '[HTTP]',
        }
    }
];

if (process.env.LOGTAIL_SOURCE_TOKEN) {
    targets.push({
        level: 'debug',
        target: '@logtail/pino',
        options: {sourceToken: process.env.LOGTAIL_SOURCE_TOKEN}
    });
}

const transports = pino.transport({
    targets,
});

const logger = pino(transports);

export const getLogger = (name?: string) => {
    return logger;
};
