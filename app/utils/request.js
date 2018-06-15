import Url from 'url';
import fetch, {parseBody, parseError} from 'utils/fetch';
import {cacheManager} from 'utils/cache-manager';


/**
 * cache settings for Get-request
 * @typedef {Object} CacheSettings
 * @property {string} [name]
 * @property {number} [lifeTime]
 * @property {string} [flag]
 */

/**
 * default cache life time - 1 min
 */
const DEFAULT_CACHE_LIFE_TIME = 60000;


/**
 * HTTP manager for Utair server
 * uses fetch
 * @singleton
 */
export const request = {

    /**
     * get source
     * @param {string} url
     * @param {Object} params - get-params
     * @param {boolean} [isUserAuth] - true if need access token of user
     * @param {CacheSettings} [cacheSettings]
     * @return {Promise}
     */
    get(url, params, isUserAuth, cacheSettings) {
        if (cacheSettings instanceof Object) {
            const cacheName = cacheSettings.name || `${url}:${JSON.stringify(params)}`;
            const cacheFlag = cacheSettings.flag;
            const cacheLifeTime = cacheSettings.lifeTime || DEFAULT_CACHE_LIFE_TIME;
            const cachedData = cacheManager.getItem(cacheName);

            if (cachedData) {
                return Promise.resolve(cachedData);
            }
            return this._request('GET', url, params, null, isUserAuth)
                .then((data) => {
                    cacheManager.setItem(cacheName, data, cacheLifeTime, cacheFlag);
                    return data;
                });
        }

        return this._request('GET', url, params, null, isUserAuth);
    },

    /**
     * post new source
     * @param {string} url
     * @param {Object} data - body-params
     * @param {boolean} [isUserAuth] - true if need access token of user
     * @return {Promise}
     */
    post(url, data, isUserAuth) {
        return this._request('POST', url, null, data, isUserAuth);
    },

    /**
     * update source
     * @param {string} url
     * @param {Object} data - body-params
     * @param {boolean} [isUserAuth] - true if need access token of user
     * @return {Promise}
     */
    put(url, data, isUserAuth) {
        return this._request('PUT', url, null, data, isUserAuth);
    },

    /**
     * delete source
     * @param {string} url
     * @param {boolean} [isUserAuth] - true if need access token of user
     * @return {Promise}
     */
    delete(url, isUserAuth) {
        return this._request('DELETE', url, null, null, isUserAuth);
    },

    /**
     * - get access token
     * - sign data
     * - create HTTP request
     * @param {string} method - GET, POST, PUT, DELETE
     * @param {string} url - base url
     * @param {Object} params - search-params
     * @param {Object} data - body-params
     * @param {boolean} isUserAuth - true if need access token of user
     * @return {Promise}
     * @private
     */
    _request(method, url, params, data, isUserAuth) {
        const headers = new Headers();
        const token = 'no token yet';
        let body = null;
        let fullUrl = url;

        if (method === 'GET' && params) {
            params = {json: JSON.stringify(params)};
            fullUrl = url + Url.format({query: params});
        }

        if ((method === 'POST' || method === 'PUT') && data) {
            headers.append('Content-type', 'application/json');
            body = JSON.stringify(data);
        }

        // const signature = this._signData(url, params, data);
        headers.append('X-Secure', window.API_TOKEN);
        headers.append('Origin', 'http://manager.mfork.ru');

        headers.append('Authorization', 'Bearer ' + token);

        return fetch(fullUrl, {
            headers,
            method,
            body
        })
            .then(parseBody)
            .catch(parseError);
    }
};