let appContext = {};

/**
 * save object into application context
 * @param {String} key
 * @param {*} value
 */
const save = (key, value) => {
    appContext[key] = value;
}

/**
 * get value from application context
 * @param {String} key
 * @return {*}
 */
const get = (key) => {
    return appContext[key];
}
