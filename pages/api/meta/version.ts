import checker from "@version-checker/core";
import { NextApiHandler } from "next";
import { version } from "../../../package.json";
import { CheckOptions } from "@version-checker/api";


const options: CheckOptions = {
    token: process.env.GH_ACCESS_TOKEN,                      // personal access token (can be omitted to use the v3 api)
    repo: "lighthouse-inspector",                    // repository name
    owner: "faebeee",                               // repository owner
    currentVersion: version,                       // your app's current version
    fetchTags: true,
    latestOnly: true
};

export type VersionApiHandlerResponse = {
    updateAvailable: boolean,
    version?: string
}

export const versionApiHandler: NextApiHandler<VersionApiHandlerResponse> = async (req, res) => {
    const result = await checker(options);
    res.send({
        updateAvailable: !!result.update,
        version: result.update?.name
    });
};

export default versionApiHandler;
