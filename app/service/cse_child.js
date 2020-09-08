'use strict';

const Service = require('egg').Service;

class CseChildService extends Service {
  async customerIssues({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if(!ctx.model.CseChild.hasAlias('issue')) {
      ctx.model.CseChild.hasMany(ctx.model.Issue, {as: 'issue', foreignKey: 'issue_cse_id', sourceKey: 'cse_parent_id'});
    }

    const options = {
      attributes: ['id', 'cse_key', 'cse_parent_id', 'customer_name'],
      order: [['id']],
      plain: false,
      include: [
        {
          model: ctx.model.Issue,
          as: 'issue',
          attributes: ['id', 'issue_key', 'issue_name', 'issue_type'],
          where: {
            issue_cse_id: {[Op.not]: null},
          },
        },
      ],
    };

    options.where = {
      customer_name: {[Op.not]: null, [Op.ne]: 'None'},
    };

    return ctx.model.CseChild.findAll(options);
  };
};

module.exports = CseChildService;