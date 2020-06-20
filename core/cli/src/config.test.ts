import {getConfigWithPackageJson, parseEmoji} from "./config";

describe('config', () => {
    it('parses config v1', () => {
        const packageJson = Buffer.from(`
        {
          "version": "1.0.0",
          "steps": {
            "version": {
              "version": "../../../plugins/version-package-json"
            },
            "type": {
              "type": "../../../plugins/type-git"
            },
            "determine": {
              "determine": "../../../plugins/determine-semver"
            },
            "bump": {
              "bump": "../../../plugins/bump-package-json"
            },
            "record": {
              "record": "../../../plugins/type-git#record"
            }
          }
        }
        `)
        const getConfig = getConfigWithPackageJson(packageJson);
        expect(getConfig()[0]).toBe('../../../plugins/version-package-json')
        expect(getConfig()[2]).toBe('../../../plugins/type-git')
        expect(getConfig()[4]).toBe('../../../plugins/determine-semver')
        expect(getConfig()[6]).toBe('../../../plugins/bump-package-json')
        expect(getConfig()[8]).toBe('../../../plugins/type-git#record')
    })
    describe('emoji', () => {
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