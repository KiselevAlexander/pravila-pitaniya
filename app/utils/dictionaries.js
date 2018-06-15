import {request} from 'managers/request';
import {API_BASE_URL} from 'consts';
import {Promise} from 'bluebird';

/**
 * Get dictionaries list
 * @type {{get: (function(*))}}
 */
export const Dictionary = {

    CACHE_LIFETIME: 60 * 60 * 1000,

    /**
     * Список доступных словарей с ссылками на api
     */
    dictionaries: {
        products: API_BASE_URL + '/dict/products/',
        smsTemplates: API_BASE_URL + '/dict/sms_templates/',
        banks: API_BASE_URL + '/dict/banks/'
    },

    check(name) {
        return Object.keys(this.dictionaries).includes(name);
    },

    /**
     *
     * @param {array} list - принемает название словаря или список словарей
     * @returns {Promise} - list of dictionary
     */
    get(list) {

        if (typeof list === 'string') {

            if (!this.check(list)) {
                return Promise.reject(new Error(`Dictionary '${list}' is not exists`));
            }

            return request.get(this.dictionaries[list], null, false, {
                name: list,
                lifeTime: this.CACHE_LIFETIME
            })
                .catch((err) => {
                    console.error(`Dictionary '${list}' request error: ${err}`);
                    return Promise.resolve([]);
                });
        }

        if (typeof list === 'object') {

            const promiseChain = list.reduce((res, item) => {
                if (!this.check(item)) {
                    console.error(`Dictionary '${item}' does not exists`);
                    return res;
                }

                return {
                    ...res,
                    [item]: request.get(this.dictionaries[item], null, false, {
                        name: item,
                        lifeTime: this.CACHE_LIFETIME
                    })
                        .catch((err) => {
                            console.error(`Dictionary '${item}' request error: ${err}`);
                            return Promise.resolve([]);
                        })
                };
            }, {});

            return Promise.props(promiseChain);

        }

        return Promise.reject(new Error('Incorrect dict args'));

    }
};
