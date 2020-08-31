'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
