'use strict';

const Service = require('egg').Service;

class IssueService extends Service {
  async list({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;
    
    const Op = this.app.Sequelize.Op;

    if(!ctx.model.Issue.hasAlias('CseParent')) {
      ctx.model.Issue.hasMany(ctx.model.CseParent, {as: 'CseParent', foreignKey: 'cse_key', sourceKey: 'issue_cse_id'});
    }
    const options = {
      attributes: [ 'id', 'issue_id', 'issue_cse_id', 'issue_key', 'issue_name', 'issue_summary', 'issue_assignee_name', 'issue_type', 'issue_fix_versions', 'issue_priority'],
      order: [['issue_created']],
      plain: false,
      include: [
        {
          model: ctx.model.CseParent,
          as: 'CseParent',
          attributes: ['cpu'],
        },
      ],
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async totalIssue({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id', 'issue_id', 'issue_cse_id', 'issue_key', 'issue_name', 'issue_summary', 'issue_status', 'issue_type' ],
      order: [['issue_created'], ['id']],
      where: {
        issue_cse_id: {[Op.not]: null},
        issue_type: {[Op.ne]: 'Change'},
      },
    };

    return ctx.model.Issue.findAll(options);
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

    return ctx.model.Issue.findAll(options);
  };

  async slaList({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if(!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {as: 'CseChild', foreignKey: 'cse_parent_id', sourceKey: 'issue_cse_id'});
    }

    const options = {
      attributes: ['id', 'issue_sla_time_to_first_response', 'issue_sla_time_to_l1_review', 'issue_sla_time_to_resolution', 'issue_area', 'issue_status', 'issue_created', 'issue_updated', 'issue_type', 'issue_key', 'issue_name', 'issue_summary', 'issue_priority' ],
      order: [['issue_created']],
      plain: false,
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
        },
      ],
      where: {
        issue_name: {
          [Op.not]: null,
        },
      },
    };

    return ctx.model.Issue.findAll(options);
  };
}

module.exports = IssueService;