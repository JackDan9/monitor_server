'use strict';

const Service = require('egg').Service;

class IssueService extends Service {
  async list({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const options = {
      offset,
      limit,
      attributes: [ 'id', 'issue_id', 'issue_cse_id', 'issue_key', 'issue_name', 'issue_summary', 'issue_status', 'issue_type' ],
      order: [['issue_created'], ['id']],
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async fixVersionList({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: ['id', 'issue_fix_versions'],
      order: [['id']],
      plain: false,
      where: {
        issue_fix_versions: {[Op.not]: null},
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async slaList({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: ['id', 'issue_key', 'issue_sla_time_to_first_response', 'issue_sla_time_to_l1_review', 'issue_sla_time_to_resolution', 'issue_sla_time_to_close_after_resolution', 'issue_area'],
      order: [['id']],
      plain: false,
      where: {
        issue_status: '完成',
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };
}

module.exports = IssueService;