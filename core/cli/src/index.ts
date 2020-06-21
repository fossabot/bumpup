import {bumpup} from "@bumpup/lib";
import {emoji, getConfigWithPackageJson} from "./config";
import * as fs from "fs";

const readJson = () => fs.readFileSync('bumpup.json');


(async () => {
    await bumpup(getConfigWithPackageJson(readJson())());
    console.log(`${emoji`📦`} done`)
})();
