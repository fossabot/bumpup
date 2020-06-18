import {match} from "@bumpup/fp";

export type Version = () => string;
export type Type = (string) => string;
export type Determine = (string) => (string) => string;
export type Bump = (string) => { status: string, message: string };
export type Record = (string) => { status: string, message: string }
export type Releaser = () => void;

export const parseEmoji = platform => emoji => platform === "win32" ? '✔' : emoji[0];
export const emoji = parseEmoji(process.platform);

export const release =
    (version: Version) =>
        (type: Type) =>
            (determine: Determine) =>
                (bump: Bump) =>
                    (record: Record): Releaser => {
                        return () => {
                            const lastVersion = version();
                            console.log(`${emoji`📖`} current version is ${lastVersion}`)
                            const lastType = type(lastVersion);
                            console.log(`${emoji`🅱`} change type is ${lastType}`)
                            const newVersion = determine(lastType)(lastVersion);
                            console.log(`${emoji(`🔎`)} ${newVersion !== null ? `new version is ${newVersion}` : `no new version`}`)
                            bump(newVersion)
                            console.log(`${emoji(`👊`)} bumping version in package.json`)
                            record(newVersion)
                            console.log(`${emoji(`📌`)} recording version in git`)
                            console.log(`${emoji(`📦`)} done`)
                        };
                    }

