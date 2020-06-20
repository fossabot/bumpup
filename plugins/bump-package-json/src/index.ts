import * as fs from "fs";
import {flow} from "@bumpup/fp";

export const stepWithFileWriter = reader => writer => data => {
    if (data.newVersion !== data.version) {
        const packageJson = flow(reader, parsePackageJson)();
        packageJson.version = data.newVersion;
        writer(JSON.stringify(packageJson, null, 2));
    }
    return data;
};

const writeToFile = data => fs.writeFileSync('package.json', data);
const readPackageJson = () => fs.readFileSync('package.json', {encoding: 'utf8', flag: 'r'});

export const step = stepWithFileWriter(readPackageJson)(writeToFile)


const parsePackageJson = packageJson => JSON.parse(packageJson);