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
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598509395721_6769';
  config.proxy = true
  // ctx.ip // 获取用户的IP地址
  // ctx.host // 获取用户请求的域名
  // ctx.protocol // 获取用户请求的协议
  // add your middleware config here
  config.middleware = [ 'graphql' ]; // 一旦捕获到graphql路由就会指向到app/graphql上

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    },
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为false, 当设置为true时, 将会放过所有content-type为`application/json`的请求
    },
    domainWhiteList: ['*'],
  };
  config.cluster = {
    listen: {
      port: 8080,
      hostname: '0.0.0.0'
    },
  };
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: []
      },
    },
  };
  config.redis = {

  };
  // 使用npx可以执行sequelize模块带有的命令
  config.sequelize = {
    dialect: 'mysql',
    host: 'db_host',
    port: 3306,
    username: 'db_username',
    password: 'db_password',
    database: 'db_name',
  };
  // add your user config here
  const userConfig = {
    myAppName: 'monitor-server',
  };

  return {
    ...config,
    ...userConfig,
  };
};
