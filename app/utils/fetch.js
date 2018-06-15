import 'whatwg-fetch';
import {ERROR_TYPES} from 'config/consts';


const fetchWrapper = (...ars) =>
    fetch(...ars)
        .then((response) => {
            if (response.status >= 400) {
                throw response;
            }

            return response;
        });

export default fetchWrapper;


/**
 * @param {Response} response
 * @return {Promise<Object|Blob|string>}
 */
export const parseBody = (response) => {
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.startsWith('application/json')) {
        return response.json();
    }

    try {
        return response.text();
    } catch (err) {
        return response.blob();
    }
};

/**
 * parse error as response
 * @param {Response|Error} error
 * @return {Promise<{code: string, data: *}>}
 * @private
 */
export const parseError = (error) => {
    if (error instanceof Response) {
        return parseBody(error)
            .then((data) => {
                let code = ERROR_TYPES.UNKNOWN;

                if (error.status === 400) {
                    code = ERROR_TYPES.BAD_REQUEST;
                } else if (error.status === 401) {
                    code = ERROR_TYPES.UNAUTHORIZED;
                } else if (error.status === 403) {
                    code = ERROR_TYPES.FORBIDDEN;
                } else if (error.status === 404) {
                    code = ERROR_TYPES.NOT_FOUND;
                } else if (error.status === 409) {
                    code = ERROR_TYPES.CONFLICT;
                } else if (error.status === 503) {
                    code = ERROR_TYPES.SERVICE_UNAVAILABLE;
                } else if (error.status >= 500) {
                    code = ERROR_TYPES.INTERNAL_SERVER_ERROR;
                }

                throw {code, data};
            });
    }

    throw {code: ERROR_TYPES.UNKNOWN, data: error};
};