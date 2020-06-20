import * as fs from 'fs';
import {debug, flow, trace} from "@bumpup/fp";
import {ModuleConfig} from "@bumpup/lib";

export const parseEmoji = platform => emoji => platform === "win32" ? '✔' : emoji[0];
export const emoji = parseEmoji(process.platform);

export type ConfigFile = {
    version: string,
    steps: {
        version: { version: string },
        type: { type: string },
        determine: { determine: string }
        bump: { bump: string },
        record: { record: string },
    }
}


const parseJson = (json): ConfigFile => JSON.parse(json);

const extractVersion = (config: ConfigFile) => config.steps.version.version;
const extractType = (config: ConfigFile) => config.steps.type.type;
const extractDetermine = (config: ConfigFile) => config.steps.determine.determine;
const extractBump = (config: ConfigFile) => config.steps.bump.bump;
const extractRecord = (config: ConfigFile) => config.steps.record.record;

export function getConfigWithPackageJson(packageJson: Buffer) {
    return function (): ModuleConfig {
        const json: ConfigFile = parseJson(packageJson);
        return [
            extractVersion(json),
            trace(data => console.log(`${emoji`📖`} current version is ${data.version}`)),
            extractType(json),
            trace(data => console.log(`${emoji`🅱`} change type is ${data.type}`)),
            extractDetermine(json),
            trace(data => console.log(`${emoji(`🔎`)} ${data.newVersion !== data.version ? `new version is ${data.newVersion}` : `no new version`}`)),
            extractBump(json),
            trace(data => console.log(`${emoji(`👊`)} ${data.newVersion !== data.version ? `` : `not`} bumping version in package.json`)),
            extractRecord(json),
            trace(data => console.log(`${emoji(`📌`)} ${data.newVersion !== data.version ? `` : `not`} recording version in git`))
        ];
    }

}
