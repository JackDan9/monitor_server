'use strict';

const Controller = require('egg').Controller;

class Item1Controller extends Controller {
  async index() {
    const ctx = this.ctx;

    /**
     * 
     */
    const item1IssueQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const item1_issue_total = await ctx.service.item1.item1IssueList(item1IssueQuery);



    ctx.body = {
      code: 200,
      data: {
        item1_issue_total: item1_issue_total,
      }
    }
  }
}

module.exports = Item1Controller;