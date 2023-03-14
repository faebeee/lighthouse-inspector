#!/usr/bin/env ts-node

import { getLogger } from "../src/server/logger";
import { getPrisma } from "../src/server/get-prisma";
import sha1 from "sha1";

const exec = async () => {
    await getPrisma().user.create({
        data: {
            username: "fabs",
            password: sha1("prw7v")
        }
    });
};

exec().then(() => {
    getLogger().info("User created");
});
