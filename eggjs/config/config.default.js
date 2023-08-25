/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  // 关闭安全策略
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1692863708523_786';
  // 自定义配置
  const userConfig = {};
  // 配置中间件
  // config.middleware = [ 'auth' ];
  // 配置mysql
  userConfig.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'lh123456',
      database: 'dijia',
    },
    app: true,
    agent: false,
  };
  // 配置跨域
  userConfig.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  return {
    ...config,
    ...userConfig,
  };
};