'use strict';

const Controller = require('egg').Controller;

class Item1Controller extends Controller {
    async index() {
        const ctx = this.ctx;

        /**
         * item1 issue list
         */
        const item1IssueQuery = {
            limit: ctx.helper.parseInt(ctx.query.limit),
            offset: ctx.helper.parseInt(ctx.query.offset),
        };

        const item1_issue_total = await ctx.service.item1.item1IssueList(item1IssueQuery);

        const item1_busy_issue = await ctx.service.item1.item1BusyIssueList();
        const item1_remain_issue = await ctx.service.item1.item1RemainIssueList();
        const item1_sla_data = await ctx.service.item1.item1SlaData();

        const result_sla_data = [];

        item1_sla_data['rows'].map((item, index) => {
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

        const item1_change = await ctx.service.item1.item1ChangeIssue();

        const item1_receive = await ctx.service.item1.item1ReceiveIssue();
        const item1_remain = await ctx.service.item1.item1RemainIssue();
        const item1_resolved = await ctx.service.item1.item1ResolvedIssue();

        ctx.body = {
            code: 200,
            data: {
                item1_issue_total: item1_issue_total,
                item1_busy_issue: item1_busy_issue,
                item1_remain_issue: item1_remain_issue,
                item1_sla_data: result_sla_data,
                item1_inspection_frequency: _inspection_frequency,
                item1_change_data: item1_change,
                item1_receive_data: item1_receive,
                item1_remain_data: item1_remain,
                item1_resolved_data: item1_resolved,
            }
        }
    }
}

module.exports = Item1Controller;