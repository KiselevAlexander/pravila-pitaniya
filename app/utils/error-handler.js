/**
 * Обработчик ошибок сервера
 * @param {object} errors - список обрабатывамых кодов ошибок, например: {40001: 'Текст ошибки'}
 * @param {function} callback - обработчик ошибки
 * @constructor
 */
export const ErrorHandler = (errors = '', callback = () => {}) => (request) => {
    let errorCode = 0;
    let text = '';
    const isObj = (errors instanceof Object);
    console.error(request);
    if (request.data && request.data.error && request.data.error.code) {
        const {code, message} = request.data.error;

        errorCode = code;

        if (errors) {

            if (isObj && errors[errorCode]) {
                text = errors[errorCode];
            } else if (message) {
                text = `Ошибка: ${message}`;
            } else if (isObj && errors.default) {
                text = errors.default;
            } else if (typeof errors === 'string') {
                text = errors;
            }
        } else if (message) {
            text = `Ошибка: ${message}`;
        }

        if (!text) {
            text = 'Возникла нераспознанная ошибка';
            console.error(request);
        }

    } else if (errors) {

        if (isObj && errors.default) {
            text = errors.default;

        } else if (typeof errors === 'string') {
            text = errors;
            console.error(request);
        }

    } else {
        text = 'Возникла нераспознанная ошибка';
        console.error(request);
    }

    return callback({
        code: errorCode,
        text
    });

};