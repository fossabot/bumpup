export const lift = f => g => h => () => f(g())(h());
export const trace = <T>(fn: (x: T)=>any) => (x: T): T => {
    fn(x);
    return x;
};

export const log = message => trace(x => console.log(`${message}: ${x}`))
export const debug = trace(console.log);
export const flow = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
export const pipe = (...fns) => input => fns.reduce((f, g) => f.then(g), Promise.resolve(input));
export const match = (tests: { test: boolean | undefined, value: any }[]) => {
    const results = tests.filter(test => test.test);
    return results.length>0 ? results[0].value : null;
}