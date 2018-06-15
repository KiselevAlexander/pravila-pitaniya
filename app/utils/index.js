export * from './request';
export * from './fsa';
export * from './fetch';
export * from './formatter';
export * from './cache-manager';
export * from './uid';
export * from './error-handler';

export const sortByKey = (array, key) =>
    array.sort((a, b) => {
        let x = a[key];
        let y = b[key];

        if (typeof x === 'string') {
            x = x.toLowerCase();
        }
        if (typeof y === 'string') {
            y = y.toLowerCase();
        }
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        }

        return 0;
    });


export const parseQuery = (queryString) => {
    const query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};