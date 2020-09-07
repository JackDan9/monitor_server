'use strict';

const Controller = require('egg').Controller;

class IssueController extends Controller {
  async index() {
    const ctx = this.ctx;

    /**
     * issue total number
     */
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const issue_total = await ctx.service.issue.list(query);
    
    /**
     * customer total number
     */
    const customerQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const customer_total = await ctx.service.cseParent.totalCustomer(customerQuery);

    /**
     * ecs node total number
     */
    const totalNode_1 = await ctx.service.cseParent.totalNode_1();
    const totalNode_2 = await ctx.service.cseParent.totalNode_2();
    const totalNode_3 = await ctx.service.cseParent.totalNode_3();
    const totalNode_4 = await ctx.service.cseParent.totalNode_4();
    const totalNode_5 = await ctx.service.cseParent.totalNode_5();
    const totalNode_6 = await ctx.service.cseParent.totalNode_6();
    const totalNode_7 = await ctx.service.cseParent.totalNode_7();
    const totalNode = totalNode_1 + totalNode_2 + totalNode_3 + totalNode_4 + totalNode_5 + totalNode_6 + totalNode_7;

    /**
     * ecs product version total number
     */
    const fixVersionQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const fix_version_data = await ctx.service.issue.fixVersionList(fixVersionQuery);

    /**
     * L2 issue sla time to resolution data
     */
    const slaQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const sla_time_to_resolution_data = await ctx.service.issue.slaList(slaQuery);

    const result_sla_time_to_resolution_data = [];

    sla_time_to_resolution_data.map((item, index) => {
      result_sla_time_to_resolution_data.push({
        id: item['id'],
        sla_resolution: JSON.parse(item['issue_sla_time_to_resolution']),
        issue_area: item['issue_area'],
        service_area: item['issue_service_area'],
      });
    });

    /**
     * customer rate data
     */
    const customerListQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const cseList = await ctx.service.cseChild.customerIssues(customerListQuery);

    const tempResult = [];
    const newResult = [];

    for(let i = 0; i < cseList.length; i++) {
      if (tempResult.indexOf(cseList[i]['customer_name']) === -1) {
        newResult.push({
          customer_name: cseList[i]['customer_name'],
          issue_number: cseList[i]['issue'].length,
        })
        tempResult.push(cseList[i]['customer_name']);
      } else {
        for (let j = 0; j < newResult.length; j++) {
          if(newResult[j]['customer_name'] == cseList[i]['customer_name']) {
            newResult[j]['issue_number'] = newResult[j]['issue_number'] + cseList[i]['issue'].length;
          }
        }
      }
    }

    /**
     * issue total sla data
     */
    const totalSlaListQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const total_sla_data = await ctx.service.issue.totalSlaList(totalSlaListQuery);

    const result_total_sla_data = [];

    total_sla_data.map((item, index) => {
      result_total_sla_data.push({
        sla_1: JSON.parse(item['issue_sla_time_to_first_response']),
        sla_2: JSON.parse(item['issue_sla_time_to_l1_review']),
        sla_3: JSON.parse(item['issue_sla_time_to_resolution']),
        issue_status: item['issue_status'],
      });
    });
    

    ctx.body = {
      code: 200,
      data: {
        issue_total_number: issue_total['count'],
        customer_total_number: customer_total.length,
        node_total_number: totalNode,
        ecs_version_data: fix_version_data,
        sla_data: result_sla_time_to_resolution_data,
        customer_rate_data: newResult,
        total_sla_data: result_total_sla_data,
      }
    };
  }
}

module.exports = IssueController;