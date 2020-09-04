'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  
  async index() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      data: {
        version: '1.0.0',
        desc: 'API interface for monitor',
        author: 'CIC',
      },
    };
  }
}

module.exports = HomeController;
