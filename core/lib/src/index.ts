import * as path from "path";
import {flow, FunctionalInterface, pipe} from "@bumpup/fp";

export type BumpupData = {
    version?: string,
    type?: string,
    newVersion?: string,
}
export type Step = FunctionalInterface<BumpupData, BumpupData>;
export type BumpupConfig = Step[];
export type ModuleConfig = (string | Step)[];

export type BumpupWithConfig = (steps: BumpupConfig) => BumpupData;
export const bumpupWithConfig: BumpupWithConfig = config => flow(...config)()

// FIXME: Split in Module Loading and Function Loading

export type ModuleLoader = (module: string) => Promise<{ [key: string]: FunctionalInterface<BumpupData, BumpupData> }>;
export const loadModule: ModuleLoader = async module => (await import(path.resolve('node_modules', module)));

export const loadSubModuleWithModuleLoader = (loader: ModuleLoader) => async (modulename: string): Promise<FunctionalInterface<BumpupData, BumpupData>> => {
    const [mod, sub] = modulename.split('#');
    return (await loader(mod))[sub || 'step'];
}
export const loadSubModule = loadSubModuleWithModuleLoader(loadModule);

export const loadModules = (loader: (modulename: string) => Promise<FunctionalInterface<BumpupData, BumpupData>>) => async (config: ModuleConfig): Promise<BumpupConfig> =>
    await Promise.all(config.map((step: Step) => typeof step === 'string' ? loader(step) : Promise.resolve(step)));
export const loadModulesDynamic = loadModules(loadSubModule);

export const bumpup = pipe(loadModulesDynamic, bumpupWithConfig);