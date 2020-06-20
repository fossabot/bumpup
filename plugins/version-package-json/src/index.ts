import * as fs from 'fs';
import {flow} from "@bumpup/fp";

const readPackageJson = data => fs.readFileSync('package.json', {encoding: 'utf8', flag: 'r'});

const parsePackageJson = packageJson => JSON.parse(packageJson);

const extractVersion = packageJson => ({version: packageJson.version});

export const step = flow(readPackageJson, parsePackageJson, extractVersion);
