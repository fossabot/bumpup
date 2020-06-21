import * as fs from 'fs';
import {flow} from "@bumpup/fp";
import {BumpupData} from "@bumpup/lib";
import {FunctionalInterface} from "@bumpup/fp/";

const readPackageJson = (): string => fs.readFileSync('package.json', {encoding: 'utf8', flag: 'r'});

const parsePackageJson = packageJson => JSON.parse(packageJson);

const extractVersion = packageJson => ({version: packageJson.version});

export const step: FunctionalInterface<void, BumpupData> = flow(readPackageJson, parsePackageJson, extractVersion);
