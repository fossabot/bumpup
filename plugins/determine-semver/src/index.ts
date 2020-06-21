import {flow} from "@bumpup/fp";


const split = data => ({...data, newVersion: data.version.split('.').map(x => parseInt(x))})

const increase = data => {
    if(data.type === 'patch'){
        data.newVersion[2]++;
    }
    if(data.type === 'minor'){
        data.newVersion[2]=0;
        data.newVersion[1]++;
    }
    if(data.type === 'major'){
        data.newVersion[2]=0;
        data.newVersion[1]=0;
        data.newVersion[0]++;
    }
    return data;
}

const join = data => ({...data, newVersion: data.newVersion !== null ? data.newVersion.map(x => x.toString()).join('.'): null});

export const step = flow(split,increase,join);