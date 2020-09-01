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
  }
}

module.exports = IssueService;