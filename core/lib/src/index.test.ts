import {
    bumpupWithConfig,
    BumpupConfig,
    ModuleLoader,
    loadModules,
    ModuleConfig, Step, loadSubModuleWithModuleLoader,
} from './index';
import 'jest-chain';

describe('@bumpup/lib', () => {
    const version: Step = jest.fn(data => ({version: '1.0.0'}));
    const type: Step = jest.fn(data => ({...data, type: 'fix'}));
    const determine: Step = jest.fn(data => ({...data, newVersion: '1.0.1'}));
    const bump: Step = jest.fn(data => data);
    const record: Step = jest.fn(data => data);

    const bumpupConfig: BumpupConfig = [
        version,
        type,
        determine,
        bump,
        record,
    ];

    it('should parse the submodule with explicit name', async () => {
        const modulename = '@bumpup/type#record';
        const loadModule = async modulename => Promise.resolve({type: 'type', record: 'record'});
        const loadSubModule = loadSubModuleWithModuleLoader(loadModule);

        expect(await loadSubModule(modulename)).toEqual('record')
    })

    it('should parse the submodule with default name', async () => {
        const modulename = '@bumpup/type';
        const loadModule = async modulename => Promise.resolve({step: 'type', record: 'record'});
        const loadSubModule = loadSubModuleWithModuleLoader(loadModule);

        expect(await loadSubModule(modulename)).toEqual('type')
    })

    it('should call each step exactly once', () => {
        const result = bumpupWithConfig(bumpupConfig);
        expect(result).toEqual({version: '1.0.0', type: 'fix', newVersion: '1.0.1'})
        expect(version).toHaveBeenCalledTimes(1);
        expect(type).toHaveBeenCalledWith({version: '1.0.0'}).toHaveBeenCalledTimes(1);
        expect(determine).toHaveBeenCalledWith({version: '1.0.0', type: 'fix'}).toHaveBeenCalledTimes(1);
        expect(bump).toHaveBeenCalledWith({version: '1.0.0', type: 'fix', newVersion: '1.0.1'}).toHaveBeenCalledTimes(1)
        expect(record).toHaveBeenCalledWith({
            version: '1.0.0',
            type: 'fix',
            newVersion: '1.0.1'
        }).toHaveBeenCalledTimes(1)
    })
    afterEach(() => {
        jest.clearAllMocks();
    });
})
