import { getPrisma } from '../get-prisma';
import { getLogger } from '../logger';

export const setBeaconValue = (key: string, value?: string) => {
  getLogger().info(`Set beacon ${key}:${value}`);
  return getPrisma().beacon.upsert({
    where: {
      key
    },
    create: {
      key,
      date: new Date(),
      value
    },
    update: {
      date: new Date(),
      value
    }
  });
};

export const setBeaconDate = (key: string, date: Date) => {
  getLogger().info(`Set beacon ${key}:${date.toISOString()}`);
  return getPrisma().beacon.upsert({
    where: {
      key
    },
    create: {
      key,
      date
    },
    update: {
      date
    }
  });
};
