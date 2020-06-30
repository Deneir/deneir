import defaultConfig from '../constants/default-config';

let config = {};

// We force getting config info key by key, rather than giving the entire config object,
// so that the errors can be as explicit as possible
export function getConfig(key) {
  if (
    !config[key]
    && config[key] !== false
    && !defaultConfig[key]
    && defaultConfig[key] !== false
  ) {
    throw new Error(
      `Could not find config key "${key}", maybe you forgot to set it in your config file?`,
    );
  }

  return config[key] || defaultConfig[key];
}

export function readConfig() {
  return fetch('/config.json')
    .then((response) => response.json())
    .then((res) => {
      config = mergeDeep(defaultConfig, res);
    })
    .catch((error) => {
      throw new Error(
        'Could not parse config file, are you sure it is correctly formatted?',
        error,
      );
    });
}

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
/* eslint-disable no-param-reassign */
function mergeDeep(...objects) {
  const isObject = (obj) => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}
