let parserContext = {};

/**
 * save object into parser context
 * @param key
 * @param value
 */
const save = (key, value) => {
    parserContext[key] = value;
    return value;
}

/**
 * get value from parser context
 * @param key
 * @return {*}
 */
const get = (key) => {
    return parserContext[key];
}

export {
    save,
    get
}
