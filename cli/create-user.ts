#!/usr/bin/env ts-node

import { getLogger } from "../src/server/logger";
import { getPrisma } from "../src/server/get-prisma";
import sha1 from "sha1";

const exec = async () => {
    await getPrisma().user.create({
        data: {
            username: "admin",
            password: sha1("admin")
        }
    });
};

exec().then(() => {
    getLogger().info("User created");
});
