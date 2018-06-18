export const UNITS = {
    kg: 'кг',
    gr: 'гр',
    units: 'ед.',
    bundle: 'пучок'
};

export const ERROR_TYPES = {
    CONNECTION_REFUSED: 'connection_refused',
    BAD_REQUEST: 'bad_request',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    NOT_FOUND: 'not_found',
    CONFLICT: 'conflict',
    INTERNAL_SERVER_ERROR: 'internal_server_error',
    UNKNOWN: 'unknown',
    SERVICE_UNAVAILABLE: 'service_unavailable'
};

export const ADMIN_PASSWORD = '331138';

console.log(process);
export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost';

export const API_URLS = {
    SAVER: BASE_URL + '/datasaver.php',
    PRODUCTS: BASE_URL + '/data/?type=products'
};