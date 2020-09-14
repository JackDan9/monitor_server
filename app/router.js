'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/issue', controller.issue.index);
  router.get('/item/1', controller.item1.index);
  router.get('/item/3', controller.item3.index);
};
