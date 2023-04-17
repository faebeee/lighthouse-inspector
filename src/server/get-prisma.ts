import { PrismaClient } from "@prisma/client";
import { getLogger } from './logger';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

getLogger().info(`Using the database ${process.env.DATABASE_URL}`);

const prisma = globalForPrisma.prisma ||
    new PrismaClient({
        log: [ "info" ]
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


export const getPrisma = () => prisma;
