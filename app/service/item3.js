'use strict';

const Service = require('egg').Service;

class Item3Service extends Service {
  async item3IssueList({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if (!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {
        as: 'CseChild',
        foreignKey: 'cse_parent_id',
        sourceKey: 'issue_cse_id'
      });
    }

    const options = {
      attributes: ['id', 'issue_key', 'issue_name', 'issue_status', 'issue_type', 'issue_assignee_name', 'issue_created', 'issue_status_change_date', 'issue_priority'],
      order: [['issue_created']],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000))
        },
      },
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['id'],
          where: {
            service_area: '运维大区3',
          },
        },
      ],
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async item3BusyIssueList() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if (!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {
        as: 'CseChild',
        foreignKey: 'cse_parent_id',
        sourceKey: 'issue_cse_id',
      });
    }

    const options = {
      attributes: ['issue_key', 'issue_status', 'issue_assignee_name', 'issue_type', 'issue_created'],
      order: [['issue_created']],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000))
        },
      },
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
          where: {
            service_area: '运维大区3',
          },
        },
      ],
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async item3RemainIssueList() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if (!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {
        as: 'CseChild',
        foreignKey: 'cse_parent_id',
        sourceKey: 'issue_cse_id',
      });
    }

    const options = {
      attributes: ['issue_key', 'issue_status', 'issue_assignee_name', 'issue_type', 'issue_created', 'issue_updated'],
      order: [['issue_created']],
      plain: false,
      where: {
        issue_status: {
          [Op.not]: '完成'
        },
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000))
        },
      },
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
          where: {
            service_area: '运维大区3',
          },
        },
      ],
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async item3SlaData() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if (!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {
        as: 'CseChild',
        foreignKey: 'cse_parent_id',
        sourceKey: 'issue_cse_id',
      });
    }

    const options = {
      attributes: ['issue_key', 'issue_name', 'issue_type', 'issue_status', 'issue_created', 'issue_updated', 'issue_sla_time_to_first_response', 'issue_sla_time_to_l1_review', 'issue_sla_time_to_resolution', 'issue_assignee_name'],
      order: [['issue_created']],
      plain: false,
      where: {
        issue_type: {
          [Op.not]: 'Service Request',
        },
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000))
        },
      },
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
          where: {
            service_area: '运维大区3',
          },
        },
      ],
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async item3ChangeIssue() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if (!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {
        as: 'CseChild',
        foreignKey: 'cse_parent_id',
        sourceKey: 'issue_cse_id',
      });
    }

    const options = {
      attributes: ['issue_key', 'issue_name', 'issue_type', 'issue_status', 'issue_updated', 'issue_assignee_name', 'issue_status_change_date', 'issue_priority'],
      order: [['issue_created']],
      plain: false,
      where: {
        issue_type: {
          [Op.eq]: 'Change',
        },
        issue_status: {
          [Op.not]: '完成',
        },
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000))
        },
      },
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
          where: {
            service_area: '运维大区3',
          },
        },
      ],
    };

    return ctx.model.Issue.findAll(options);
  };

  async item3ReceiveIssue() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if (!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {
        as: 'CseChild',
        foreignKey: 'cse_parent_id',
        sourceKey: 'issue_cse_id',
      });
    }

    const options = {
      attributes: ['id'],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000))
        }
      },
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
          where: {
            service_area: '运维大区3',
          },
        },
      ],
    };

    return ctx.model.Issue.count(options);
  };

  async item3ResolvedIssue() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if (!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {
        as: 'CseChild',
        foreignKey: 'cse_parent_id',
        sourceKey: 'issue_cse_id',
      });
    }

    const options = {
      attributes: ['id'],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000))
        },
      },
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
          where: {
            service_area: '运维大区3',
          },
        },
      ],
    };

    return ctx.model.Issue.count(options);
  };

  async item3RemainIssue() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if (!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {
        as: 'CseChild',
        foreignKey: 'cse_parent_id',
        sourceKey: 'issue_cse_id',
      });
    }

    const options = {
      attributes: ['id'],
      plain: false,
      where: {
        issue_status: {
          [Op.not]: '完成',
        },
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000))
        },
      },
      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
          where: {
            service_area: '运维大区3',
          },
        },
      ],
    };

    return ctx.model.Issue.count(options);
  };
}

module.exports = Item3Service;
