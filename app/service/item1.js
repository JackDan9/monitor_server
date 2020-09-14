'use strict';

const Service = require('egg').Service;

class Item1Service extends Service {
  async item1IssueList({ offset = 0, limit = 10 }) {
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
      attributes: ['id', 'issue_id', 'issue_key', 'issue_status', 'issue_assignee_name', 'issue_creator_name', 'issue_reporter_name', 'issue_area', 'issue_created'],
      order: [['issue_created']],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date(new Date()),
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
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
}

module.exports = Item1Service;
