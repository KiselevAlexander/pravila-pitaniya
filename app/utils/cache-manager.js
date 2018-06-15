import {parseJson} from 'utils/formatter';


const CACHE_PREFIX = 'crm_';

/**
 * Cache manager
 * uses localStorage
 * @singleton
 */
export const cacheManager = {

    /**
     * save resource in local storage
     * create unlimited cache if {lifeTime} is missing
     * @param {string} name - unique name of resource
     * @param {*} data - resource
     * @param {?number} [lifeTime] - per milliseconds
     * @param {?string} [flag] - resources group name
     */
    setItem(name, data, lifeTime, flag) {
        const expireDate = lifeTime ? new Date(Date.now() + lifeTime) : null;

        localStorage.setItem(CACHE_PREFIX + name, JSON.stringify({
            expireDate,
            flag,
            data
        }));
    },

    /**
     * get resource by name
     * @param {string} name - unique name of resource
     * @return {*} resource
     */
    getItem(name) {
        const item = parseJson(localStorage.getItem(CACHE_PREFIX + name));

        if (!(item instanceof Object)) {
            return null;
        }

        if (!item.expireDate) {
            return item.data;
        }

        const expireDate = new Date(item.expireDate);
        const now = new Date;

        if (expireDate > now) {
            return item.data;
        }

        return null;
    },

    /**
     * get resources by flag
     * @param {string} flag - resources group name
     * @return {Array<*>} resources
     */
    getByFlag(flag) {

        return Object.keys(localStorage)
            .filter((key) => key.startsWith(CACHE_PREFIX))
            .map((key) => parseJson(localStorage.getItem(key)))
            .filter((resource) => resource instanceof Object && resource.flag === flag)
            .map((resource) => resource.data);
    },

    /**
     * remove resource by name
     * @param {string} name - unique name of resource
     */
    removeItem(name) {
        localStorage.removeItem(CACHE_PREFIX + name);
    },

    /**
     * remove resources by flag
     * @param {string} flag - resources group name
     */
    removeByFlag(flag) {

        return Object.keys(localStorage)
            .filter((key) => {
                if (!key.startsWith(CACHE_PREFIX)) {
                    return false;
                }

                const resource = parseJson(localStorage.getItem(key));
                return resource instanceof Object && resource.flag === flag;
            })
            .forEach((key) => localStorage.removeItem(key));
    },

    /**
     * remove all cached resources
     */
    removeAll() {

        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    },

    /**
     * get expire date of resource from local storage
     * @param {string} name - unique name of resource
     * @return {?Date}
     */
    getExpireDate(name) {
        const item = parseJson(localStorage.getItem(CACHE_PREFIX + name));

        if (!(item && item.data && item.expireDate)) {
            return null;
        }

        return new Date(item.expireDate);
    },

    /**
     * subscribe on changes of resource in local storage
     * @param {string} name - unique name of resource
     * @param {function(event)} listener
     */
    subscribe(name, listener) {
        window.addEventListener('storage', (event) => {
            if (event.key === CACHE_PREFIX + name) {
                listener(event);
            }
        });
    }
};