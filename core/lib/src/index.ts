import * as path from "path";
import {flow, pipe} from "@bumpup/fp";

export type BumpupData = {
    version?: string,
    type?: string,
    newVersion?: string,
}
export type Step = (data: BumpupData) => BumpupData;
export type BumpupConfig = Step[];
export type ModuleConfig = (string | Step)[];
export type Bumpup = (config: ModuleConfig) => Promise<BumpupData>;
export type BumpupWithConfig = (steps: BumpupConfig) => BumpupData;
export type ModuleLoader = (moduleName: string) => Promise<Step>;

export const bumpupWithConfig: BumpupWithConfig = config => flow(...config)()

export const loadModule = async module => (await import(path.resolve('node_modules', module)));

export const loadSubModuleWithModuleLoader = loader => async modulename => {
    let [mod, fn] = modulename.split('#');
    if (!fn) fn = 'step';
    return (await loader(mod))[fn];
}
export const loadSubModule = loadSubModuleWithModuleLoader(loadModule);

export const loadModules = (loader) => async (config: ModuleConfig): Promise<BumpupConfig> =>
    await Promise.all(config.map((step: Step) => typeof step === 'string' ? loader(step) : Promise.resolve(step)));
export const loadModulesDynamic = loadModules(loadSubModule);


export const bumpup: Bumpup = pipe(loadModulesDynamic, bumpupWithConfig);