'use strict';

const Controller = require('egg').Controller;

class Item3Controller extends Controller {
  async index() {
    const ctx = this.ctx;

    /**
     * 
     */
    const item3IssueQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const item3_issue_total = await ctx.service.item3.item3IssueList(item3IssueQuery);



    ctx.body = {
      code: 200,
      data: {
        item3_issue_total: item3_issue_total,
      }
    }
  }
}

module.exports = Item3Controller;