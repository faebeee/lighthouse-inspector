#!/usr/bin/env ts-node

import { getLogger } from '../src/server/logger';
import { getPrisma } from '../src/server/get-prisma';
import sha1 from 'sha1';

const exec = async (username: string, password: string) => {
    await getPrisma().user.create({
        data: {
            username: username,
            password: sha1(password)
        }
    });
};

const [ username, password ] = process.argv.slice(-2);
exec(username, password).then(() => {
    getLogger().info('User created');
});
