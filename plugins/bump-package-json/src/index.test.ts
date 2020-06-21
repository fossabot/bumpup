import {stepWithFileWriter} from "./index";

describe('@bumpup/determine-semver', ()=>{
    it('writes to file for new version', ()=>{
        const writer = jest.fn();
        const reader = jest.fn(()=>'{"version":"1.0.0"}')
        const data = {newVersion: '1.0.1', version: '1.0.0'}
        const actual = stepWithFileWriter(reader)(writer)(data);
        expect(reader).toHaveBeenCalled();
        expect(actual).toEqual(data);
        expect(writer).toHaveBeenCalledWith(
`{
  "version": "1.0.1"
}`)
    })
    it('doesn\'t write to file for same version', ()=>{
        const writer = jest.fn();
        const reader = jest.fn(()=>'{"version":"1.0.0"}')
        const data = {newVersion: '1.0.0', version: '1.0.0'}
        const actual = stepWithFileWriter(reader)(writer)(data);
        expect(reader).toHaveBeenCalledTimes(0);
        expect(writer).toHaveBeenCalledTimes(0);
        expect(actual).toEqual(data);
    })
})