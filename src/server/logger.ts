import { pino } from 'pino';

const logger = pino({
    level: 'debug',
    name: 'app',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});


export const getLogger = (name?: string) => {
    return logger;
};
