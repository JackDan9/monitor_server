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

    const result_sla_data = [];

    sla_data.map((item, index) => {
      result_sla_data.push({
        sla_1: JSON.parse(item['issue_sla_time_to_first_response']),
        sla_2: JSON.parse(item['issue_sla_time_to_l1_review']),
        sla_3: JSON.parse(item['issue_sla_time_to_resolution']),
        sla_4: JSON.parse(item['issue_sla_time_to_close_after_resolution']),
        issue_area: item['issue_area'],
        service_area: item['service_area'],
      });
    });

    const customerListQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const cseList = await ctx.service.cseChild.customerIssues(customerListQuery);
    let tempArr = [], newArr = []
    for (let i = 0; i < cseList.length; i++) {
      if (tempArr.indexOf(arr[i].id) === -1) {
        newArr.push({
          id: arr[i].id,
          list: [arr[i].list]
        })
        tempArr.push(arr[i].id);
      } else {
        for (let j = 0; j < newArr.length; j++) {
          if (newArr[j].id == arr[i].id) {
            newArr[j].list.push(arr[i].list)
          }
        }
      }
    }
    // const totalIssueQuery = {
    //   limit: ctx.helper.parseInt(ctx.query.limit),
    //   offset: ctx.helper.parseInt(ctx.query.offset),
    // };

    // const issueList = await ctx.service.issue.totalIssue(totalIssueQuery);

    // const result_top_issue = [];

    // cseList.map((cseItem, cseIndex) => {
    //   issueList.map((issueItem, issueIndex) => {
    //     if(cseItem['cse_key'] === issueItem['issue_cse_id'] || cseItem['cse_parent_id'] === issueItem['issue_cse_id']) {
    //       cseItem['issue_list'].push(issueItem);
    //     }
    //   })
    // })

    ctx.body = {
      code: 200,
      data: {
        issue_total_number: issue_total['count'],
        customer_total_number: customer_total.length,
        node_total_number: totalNode,
        cseList: cseList,
        // customerList: customerList,
        // issueList: issueList,
        // ecs_version_data: fix_version_data,
        // sla_data: result_sla_data,
      }
    };
  }
}

module.exports = IssueController;