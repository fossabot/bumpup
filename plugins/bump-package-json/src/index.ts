import * as fs from "fs";
import {flow, FunctionalInterface} from "@bumpup/fp";
import {BumpupData} from "@bumpup/lib";

export const stepWithFileWriter = (reader: FunctionalInterface<void, string>) => (writer: FunctionalInterface<string, void>) => (data: BumpupData): BumpupData => {
    if (data.newVersion !== data.version) {
        const packageJson = flow(reader, parsePackageJson)() as { version: string };
        packageJson.version = data.newVersion;
        writer(JSON.stringify(packageJson, null, 2));
    }
    return data;
};

const writeToFile = data => fs.writeFileSync('package.json', data);
const readPackageJson = () => fs.readFileSync('package.json', {encoding: 'utf8', flag: 'r'});

export const step = stepWithFileWriter(readPackageJson)(writeToFile)


const parsePackageJson = (packageJsonString): { version: string } => JSON.parse(packageJsonString);