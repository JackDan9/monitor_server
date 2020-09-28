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

    const issue_total = await ctx.service.issue.issueTotalList(query);

    let issue_data = issue_total['rows'];


    /**
     * issue month number
     * 
     */
    const issueMonthQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const issue_month_data = await ctx.service.issue.issueMonthList(issueMonthQuery);

    let issue_month_total = issue_month_data['rows'];

    let compare = (key) => {
      return (value1, value2) => {
        var val1 = value1[key];
        var val2 = value2[key];
        return val2 - val1;
      }
    };

    let _issue_assignee_data = issue_month_total.reduce((obj, item) => {
      let _find = obj.find(i => i.issue_assignee_name == item.issue_assignee_name);
      let _d = { issue_assignee_name: item.issue_assignee_name, frequency: 1 };
      _find ? _find.frequency++ : obj.push(_d);
      return obj;
    }, []);

    const result_issue_assignee_data = _issue_assignee_data.sort(compare('frequency')).splice(0, 19);

    let _issue_type_data = issue_month_total.reduce((obj, item) => {
      let _find = obj.find(i => i.issue_type == item.issue_type);
      let _d = { issue_type: item.issue_type, frequency: 1 };
      _find ? _find.frequency++ : obj.push(_d);
      return obj;
    }, []);

    const result_issue_type_data = _issue_type_data.sort(compare['frequency']).splice(0, 4);

    let _issue_version_data = issue_month_total.reduce((obj, item) => {
      let _find = obj.find(i => i.issue_fix_versions == item.issue_fix_versions);
      let _d = { issue_fix_versions: item.issue_fix_versions, frequency: 1 };
      _find ? _find.frequency++ : obj.push(_d);
      return obj;
    }, []);

    const result_issue_version_data = _issue_version_data.sort(compare['frequency']).splice(0, 19);

    let _issue_priority_data = issue_month_total.reduce((obj, item) => {
      let _find = obj.find(i => i.issue_priority == item.issue_priority);
      let _d = { issue_priority: item.issue_priority, frequency: 1 };
      _find ? _find.frequency++ : obj.push(_d);
      return obj;
    }, []);

    const result_issue_priority_data = _issue_priority_data.sort(compare['frequency']).splice(0, 3);

    const issue_cpu_data = await ctx.service.cseParent.totalCpu();

    let _issue_cpu_data = issue_cpu_data.reduce((obj, item) => {
      let _find = obj.find(i => i.cpu == item.cpu);
      let _d = { cpu: item.cpu, frequency: 1 };
      _find ? _find.frequency++ : obj.push(_d);
      return obj;
    }, []);

    const result_issue_cpu_data = _issue_cpu_data.sort(compare['frequency']).splice(0, 4);

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
    const ecsVersionList = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const ecs_version_data = await ctx.service.issue.ecsVersionList(ecsVersionList);

    let _ecs_version_data = ecs_version_data.reduce((obj, item) => {
      let _find = obj.find(i => i.current_version == item.current_version);
      let _d = { current_version: item.current_version, frequency: 1 };
      _find ? _find.frequency++ : obj.push(_d);
      return obj;
    }, []);

    /**
     * L2 issue sla time to resolution data
     */
    const slaQuery = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    const sla_data = await ctx.service.issue.slaList(slaQuery);

    const result_sla_data = [];

    sla_data.map((item, index) => {
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
        id: item['id'],
        issue_id: item['issue_key'],
        issue_name: item['issue_name'],
        issue_type: item['issue_type'],
        issue_status: item['issue_status'],
        issue_created: item['issue_created'],
        issue_updated: item['issue_updated'],
        issue_priority: item['issue_priority'],
        sla_1: item['issue_sla_time_to_first_response'],
        sla_2: item['issue_sla_time_to_l1_review'],
        sla_3: item['issue_sla_time_to_resolution'],
        issue_area: item['issue_area'],
        service_area: item['CseChild'],
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

    for (let i = 0; i < cseList.length; i++) {
      if (tempResult.indexOf(cseList[i]['customer_name']) === -1) {
        newResult.push({
          customer_name: cseList[i]['customer_name'],
          issue_number: cseList[i]['issue'].length,
        })
        tempResult.push(cseList[i]['customer_name']);
      } else {
        for (let j = 0; j < newResult.length; j++) {
          if (newResult[j]['customer_name'] == cseList[i]['customer_name']) {
            newResult[j]['issue_number'] = newResult[j]['issue_number'] + cseList[i]['issue'].length;
          }
        }
      }
    }

    const result_customer_rate_data = newResult.sort(compare('issue_number')).splice(0, 19);

    /**
     * 同比,环比周数量
     */
    const week_1 = await ctx.service.issue.week1();
    const week_2 = await ctx.service.issue.week2();
    const week_3 = await ctx.service.issue.week3();

    const _week_1 = week_1['count'];
    const _week_2 = week_2['count'];
    const _week_3 = week_3['count'];

    const finish_week_1 = await ctx.service.issue.finishWeek1();
    const finish_week_2 = await ctx.service.issue.finishWeek2();
    const finish_week_3 = await ctx.service.issue.finishWeek3();

    const _finish_week_1 = finish_week_1['count'];
    const _finish_week_2 = finish_week_2['count'];
    const _finish_week_3 = finish_week_3['count'];
    /**
     * 同比,环比月数量
     */
    const month_2 = await ctx.service.issue.month2();
    const month_3 = await ctx.service.issue.month3();

    const _month_1 = issue_month_data['count'];
    const _month_2 = month_2['count'];
    const _month_3 = month_3['count'];

    const finish_month_1 = await ctx.service.issue.finishMonth1();
    const finish_month_2 = await ctx.service.issue.finishMonth2();
    const finish_month_3 = await ctx.service.issue.finishMonth3();

    const _finish_month_1 = finish_month_1['count'];
    const _finish_month_2 = finish_month_2['count'];
    const _finish_month_3 = finish_month_3['count'];

    /**
     * 同步,环比季度数量
     */
    const quarter_1 = await ctx.service.issue.quarter1();
    const quarter_2 = await ctx.service.issue.quarter2();
    const quarter_3 = await ctx.service.issue.quarter3();

    const _quarter_1 = quarter_1['count'];
    const _quarter_2 = quarter_2['count'];
    const _quarter_3 = quarter_3['count'];

    const finish_quarter_1 = await ctx.service.issue.finishQuarter1();
    const finish_quarter_2 = await ctx.service.issue.finishQuarter2();
    const finish_quarter_3 = await ctx.service.issue.finishQuarter3();

    const _finish_quarter_1 = finish_quarter_1['count'];
    const _finish_quarter_2 = finish_quarter_2['count'];
    const _finish_quarter_3 = finish_quarter_3['count'];

    /**
     * 同步,环比半年数量
     */
    const half_year1 = await ctx.service.issue.halfYear1();
    const half_year2 = await ctx.service.issue.halfYear2();
    const half_year3 = await ctx.service.issue.halfYear3();

    const _half_year1 = half_year1['count'];
    const _half_year2 = half_year2['count'];
    const _half_year3 = half_year3['count'];

    const finish_half_year_1 = await ctx.service.issue.finishHalfYear1();
    const finish_half_year_2 = await ctx.service.issue.finishHalfYear2();
    const finish_half_year_3 = await ctx.service.issue.finishHalfYear3();

    const _finish_half_year_1 = finish_half_year_1['count'];
    const _finish_half_year_2 = finish_half_year_2['count'];
    const _finish_half_year_3 = finish_half_year_3['count'];

    const result_variation = {
      week_1: _week_1,
      week_2: _week_2,
      week_3: _week_3,
      month_1: _month_1,
      month_2: _month_2,
      month_3: _month_3,
      quarter_1: _quarter_1,
      quarter_2: _quarter_2,
      quarter_3: _quarter_3,
      half_year1: _half_year1,
      half_year2: _half_year2,
      half_year3: _half_year3,
    };

    const result_finish_variation = {
      week_1: _finish_week_1,
      week_2: _finish_week_2,
      week_3: _finish_week_3,
      month_1: _finish_month_1,
      month_2: _finish_month_2,
      month_3: _finish_month_3,
      quarter_1: _finish_quarter_1,
      quarter_2: _finish_quarter_2,
      quarter_3: _finish_quarter_3,
      half_year_1: _finish_half_year_1,
      half_year_2: _finish_half_year_2,
      half_year_3: _finish_half_year_3,
    };

    const todayStartDate = new Date((new Date().setHours(0, 0, 0) + 8 * 60 * 60 * 1000));
    const todayEndDate = new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000));

    const MonthStartDate = new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 30 * 24 * 60 * 60 * 1000));
    const MonthEndDate = new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000));

    const today_created_count = await ctx.service.issue.issueCreated(todayStartDate, todayEndDate);
    const today_changed_to_count = await ctx.service.issue.issueChangedTo(todayStartDate, todayEndDate);
    const month_created_count = await ctx.service.issue.issueCreated(MonthStartDate, MonthEndDate);
    const month_changed_to_count = await ctx.service.issue.issueChangedTo(MonthStartDate, MonthEndDate);

    ctx.body = {
      code: 200,
      data: {
        issue_total_number: issue_total['count'],
        customer_total_number: customer_total.length,
        node_total_number: totalNode,
        ecs_version_data: _ecs_version_data,
        sla_data: result_sla_data,
        customer_rate_data: result_customer_rate_data,
        issue_variation: result_variation,
        issue_finish_variation: result_finish_variation,
        issue_data: {
          assignee: result_issue_assignee_data,
          type: result_issue_type_data,
          version: result_issue_version_data,
          priority: result_issue_priority_data,
          issue_cpu_data: result_issue_cpu_data,
        },
        today_created_count: today_created_count,
        today_changed_to_count: today_changed_to_count,
        month_created_count: month_created_count,
        month_changed_to_count: month_changed_to_count
      }
    };
  }
}

module.exports = IssueController;