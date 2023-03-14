import { NextApiHandler } from "next";
import { getPrisma } from "../../../src/server/get-prisma";
import { getAllTags, getTagByName } from "../../../src/server/lib/tag-service";
import { assertAuth } from "../../../src/server/lib/api-helpers";
import { getSiteById } from "../../../src/server/lib/site";

export const tagsListApiHandler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        if (!req.body["id"]) {
            res.status(403).send("id is missing on body");
            return;
        }

        if (!req.body["name"]) {
            res.status(403).send("name is missing on body");
            return;
        }

        const project = await getSiteById(req.body["id"]);
        const tag = await getTagByName(req.body["name"]);

        if (!project) {
            res.status(404).send("project not found");
            return;
        }

        if (tag) {
            await getPrisma().project.update({
                where: {
                    id: req.body["id"]
                },
                data: {
                    tags: {
                        create: {
                            tag: {
                                connect: {
                                    id: tag.id
                                }
                            }
                        }
                    }
                }
            });
        } else {
            await getPrisma().project.update({
                where: {
                    id: req.body["id"]
                },
                data: {
                    tags: {
                        create: {
                            tag: {
                                create: {
                                    name: req.body["name"]
                                }
                            }
                        }
                    }
                }
            });
        }

        res.status(201);
        return;
    }
    if (req.method === "GET") {
        const tags = await getAllTags();
        res.send(tags);
        return;
    }
};

export default assertAuth(tagsListApiHandler);
