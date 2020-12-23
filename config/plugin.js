'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  // io引擎
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
  // 模板引擎
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // redis 缓存任务管理引擎
  redis: {
    enable: false,
    package: 'egg-redis',
  },
  // orm: 对象关系映射
  sequelize: {
    enable: false,
    package: 'egg-sequelize',
  },
  // graphql 查询语言
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
};
