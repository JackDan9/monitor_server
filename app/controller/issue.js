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
    
    const customerQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const customer_total = await ctx.service.cseParent.totalCustomer(customerQuery);

    const totalNode_1 = await ctx.service.cseParent.totalNode_1();
    const totalNode_2 = await ctx.service.cseParent.totalNode_2();
    const totalNode_3 = await ctx.service.cseParent.totalNode_3();
    const totalNode_4 = await ctx.service.cseParent.totalNode_4();
    const totalNode_5 = await ctx.service.cseParent.totalNode_5();
    const totalNode_6 = await ctx.service.cseParent.totalNode_6();
    const totalNode_7 = await ctx.service.cseParent.totalNode_7();
    const totalNode = totalNode_1 + totalNode_2 + totalNode_3 + totalNode_4 + totalNode_5 + totalNode_6 + totalNode_7;

    const fixVersionQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const fix_version_data = await ctx.service.issue.fixVersionList(fixVersionQuery);

    const slaQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const sla_data = await ctx.service.issue.slaList(slaQuery);
    
    ctx.body = {
      code: 200,
      data: {
        issue_total_number: issue_total['count'],
        customer_total_number: customer_total.length,
        node_total_number: totalNode,
        sla_data: sla_data,
      }
    };
  }
}

module.exports = IssueController;