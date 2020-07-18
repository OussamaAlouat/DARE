/* eslint-disable global-require */
const config = (app) => {
  const CONFIG_ENV = {
    development: './development',
    production: './production',
    test: './test',
  };

  // eslint-disable-next-line import/no-dynamic-require
  return require(CONFIG_ENV[app.get('env')]).default;
};

export default config;
