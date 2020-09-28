'use strict';

const Service = require('egg').Service;

class IssueService extends Service {
  async issueTotalList({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;
    
    const Op = this.app.Sequelize.Op;

    if(!ctx.model.Issue.hasAlias('CseParent')) {
      ctx.model.Issue.hasMany(ctx.model.CseParent, {as: 'CseParent', foreignKey: 'cse_key', sourceKey: 'issue_cse_id'});
    }
    const options = {
      attributes: [ 'id', 'issue_cse_id', 'issue_key'],
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

  async issueCreated(startDate, endDate) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: endDate,
          [Op.gt]: startDate,
        },
      },
    };

    return ctx.model.Issue.count(options);
  };

  async issueChangedTo(startDate, endDate) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: endDate,
          [Op.gt]: startDate,
        },
      },
    };

    return ctx.model.Issue.count(options);
  };

  async week1() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async week2() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 14 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async week3() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 371 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async issueMonthList({offset = 0, limit = 10}) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id', 'issue_id', 'issue_cse_id', 'issue_key', 'issue_name', 'issue_assignee_name', 'issue_type', 'issue_fix_versions', 'issue_priority'],
      order: [['issue_created']],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 31 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async month2() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000- 30 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000- 60 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async month3() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 395 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async quarter1() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id'],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 91 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async quarter2() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 91 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 182 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async quarter3() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 454 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async halfYear1() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id'],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 182 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async halfYear2() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 182 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async halfYear3() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 546 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishWeek1() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishWeek2() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 7 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 14 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishWeek3() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 371 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishMonth1() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id'],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 31 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishMonth2() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 30 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 60 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishMonth3() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000- 364 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 395 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishQuarter1() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id'],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 91 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishQuarter2() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 91 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 182 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishQuarter3() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 454 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishHalfYear1() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id'],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 182 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishHalfYear2() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 182 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async finishHalfYear3() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id' ],
      plain: false,
      where: {
        issue_status: '完成',
        issue_status_change_date: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 364 * 24 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 546 * 24 * 60 * 60 * 1000)),
        },
      },
    };

    return ctx.model.Issue.findAndCountAll(options);
  };

  async ecsVersionList({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: ['id', 'current_version' ],
      order: [['cse_created']],
      plain: false,
      where: {
        current_version: {[Op.not]: null},
      },
    };

    return ctx.model.CseParent.findAll(options);
  };

  async slaList({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    if(!ctx.model.Issue.hasAlias('CseChild')) {
      ctx.model.Issue.hasMany(ctx.model.CseChild, {as: 'CseChild', foreignKey: 'cse_parent_id', sourceKey: 'issue_cse_id'});
    }

    const options = {
      attributes: ['id', 'issue_sla_time_to_first_response', 'issue_sla_time_to_l1_review', 'issue_sla_time_to_resolution', 'issue_area', 'issue_status', 'issue_created', 'issue_updated', 'issue_type', 'issue_key', 'issue_name', 'issue_priority' ],
      order: [['issue_created']],
      plain: false,
      where: {
        issue_name: {
          [Op.not]: null,
        },
        issue_created: {
          [Op.lt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000)),
          [Op.gt]: new Date((new Date().setHours(23, 59, 59) + 8 * 60 * 60 * 1000 - 31 * 24 * 60 * 60 * 1000))
        },
      },

      include: [
        {
          model: ctx.model.CseChild,
          as: 'CseChild',
          attributes: ['service_area'],
        },
      ],
    };

    return ctx.model.Issue.findAll(options);
  };
}

module.exports = IssueService;