'use strict';

const Controller = require('egg').Controller;

class Item4Controller extends Controller {
  async index() {
    const ctx = this.ctx;

    /**
     * 
     */
    const item4IssueQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const item4_issue_total = await ctx.service.item4.item4IssueList(item4IssueQuery);

    const item4_busy_issue = await ctx.service.item4.item4BusyIssueList();
    const item4_remain_issue = await ctx.service.item4.item4RemainIssueList();
    const item4_sla_data = await ctx.service.item4.item4SlaData();

    const result_sla_data = [];

    item4_sla_data['rows'].map((item, index) => {
      if (item['issue_sla_time_to_first_response'] !== null) {
        item['issue_sla_time_to_first_response'] = {
          goalDuration: JSON.parse(item['issue_sla_time_to_first_response'])['goalDuration']['millis'],
          elapsedTime: JSON.parse(item['issue_sla_time_to_first_response'])['elapsedTime']['millis'],
        }
      }

      if (item['issue_sla_time_to_l1_review'] !== null) {
        item['issue_sla_time_to_l1_review'] = {
          goalDuration: JSON.parse(item['issue_sla_time_to_l1_review'])['goalDuration']['millis'],
          elapsedTime: JSON.parse(item['issue_sla_time_to_l1_review'])['elapsedTime']['millis'],
        }
      }

      if (item['issue_sla_time_to_resolution'] !== null) {
        item['issue_sla_time_to_resolution'] = {
          goalDuration: JSON.parse(item['issue_sla_time_to_resolution'])['goalDuration']['millis'],
          elapsedTime: JSON.parse(item['issue_sla_time_to_resolution'])['elapsedTime']['millis'],
        }
      }

      result_sla_data.push({
        issue_id: item['issue_key'],
        issue_name: item['issue_name'],
        issue_type: item['issue_type'],
        issue_status: item['issue_status'],
        issue_created: item['issue_created'],
        issue_updated: item['issue_updated'],
        issue_priority: item['issue_priority'],
        issue_assignee_name: item['issue_assignee_name'],
        sla_1: item['issue_sla_time_to_first_response'],
        sla_2: item['issue_sla_time_to_l1_review'],
      });
    });

    const inspection_frequency = await ctx.service.cseChild.inspectionFrequency();

    let _inspection_frequency = inspection_frequency.reduce((obj, item) => {
      let _find = obj.find(i => i.inspection_frequency == item.inspection_frequency);
      let _d = { inspection_frequency: item.inspection_frequency, frequency: 1 };
      _find ? _find.frequency++ : obj.push(_d);
      return obj;
    }, []);

    const item4_change = await ctx.service.item4.item4ChangeIssue();

    const item4_receive = await ctx.service.item4.item4ReceiveIssue();
    const item4_remain = await ctx.service.item4.item4RemainIssue();
    const item4_resolved = await ctx.service.item4.item4ResolvedIssue();

    ctx.body = {
      code: 200,
      data: {
        item4_issue_total: item4_issue_total,
        item4_busy_issue: item4_busy_issue,
        item4_remain_issue: item4_remain_issue,
        item4_sla_data: result_sla_data,
        item4_inspection_frequency: _inspection_frequency,
        item4_change_data: item4_change,
        item4_receive_data: item4_receive,
        item4_remain_data: item4_remain,
        item4_resolved_data: item4_resolved,
      }
    }
  }
}

module.exports = Item4Controller;