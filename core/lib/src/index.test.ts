import {
    emoji,
    parseEmoji,
    release,
    Type,
    Bump,
    Determine,
    Version,
    Record, Releaser
} from './index';
import 'jest-chain';

describe('@bumpup/lib', () => {
    it('release calls each functions excatly once', () => {
        const type: Type = jest.fn(lastVersion => 'fix');
        const version: Version = jest.fn(() => '1.0.0');
        const getNewVersionFromLastVersion = jest.fn(lastVersion => '1.0.1');
        const determine: Determine = jest.fn(changeType => getNewVersionFromLastVersion);
        const bump: Bump = jest.fn(version => ({status: '', message: ''}));
        const record: Record = jest.fn(version => ({status: '', message: ''}));
        const rel: Releaser = release(version)(type)(determine)(bump)(record);
        rel();

        expect(type).toHaveBeenCalledTimes(1);
        expect(version).toHaveBeenCalledTimes(1);
        expect(determine).toHaveBeenCalledWith('fix').toHaveBeenCalledTimes(1);
        expect(getNewVersionFromLastVersion).toHaveBeenCalledWith('1.0.0').toHaveBeenCalledTimes(1);
        expect(bump).toHaveBeenCalledWith('1.0.1').toHaveBeenCalledTimes(1)
        expect(record).toHaveBeenCalledWith('1.0.1').toHaveBeenCalledTimes(1)
    })
    describe('emoji', ()=>{
        it('parses emojies on linux', () => {
            const emoji = parseEmoji('linux');
            expect(emoji`📦`).toBe('📦');
        })

        it('parses emojies on windows', () => {
            const emoji = parseEmoji('win32');
            expect(emoji`📦`).toBe('✔');
        })
    })
})
