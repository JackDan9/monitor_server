'use strict';

const Controller = require('egg').Controller;

class IssueController extends Controller {
  async index() {
    const ctx = this.ctx;

    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const issue_total = await ctx.service.issue.list(query);
    
    // const issue_total_number = await ctx.model.Issue.findAndCountAll();

    // const cse_list = await ctx.model.Issue.findAll({
    //   attributes: ['issue_cse_id']
    // });

    
    // for(let cse_key in cse_list) {
      
    // }

    ctx.body = {
      code: 200,
      data: {
        issue_total_number: issue_total['count'],
      }
    };
  }
}

module.exports = IssueController;