let config = {};

// We force getting config info key by key, rather than giving the entire config object,
// so that the errors can be as explicit as possible
export function getConfig(key) {
  if (!config[key]) {
    throw new Error(
      `Could not find config key "${key}", maybe you forgot to set it in your config file?`,
    );
  }

  return config[key];
}

export function readConfig() {
  return fetch('./config.json')
    .then((response) => response.json())
    .then((res) => {
      config = res;
    })
    .catch(() => {
      throw new Error(
        'Could not parse config file, are you sure it is correctly formatted?',
      );
    });
}
