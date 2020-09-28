'use strict';

const Service = require('egg').Service;

class CseParentService extends Service {
  async totalCustomer({ offset = 0, limit = 10 }) {
    const ctx = this.ctx;
    
    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: [ 'id', 'customer_name' ],
      order: [['id']],
      plain: false,
    };

    options.where = {
      customer_name: {[Op.not]: null, [Op.ne]: 'None'},
    };

    options.group = 'customer_name';

    return ctx.model.CseParent.findAll(options);
  };

  async totalCpu() {
    const ctx = this.ctx;

    const Op = this.app.Sequelize.Op;

    const options = {
      attributes: ['cpu'],
      order: [['id']],
      plain: false,
    }

    return ctx.model.CseParent.findAll(options);
  }

  async totalNode_1() {
    const ctx = this.ctx;

    return ctx.model.CseParent.sum('node_1');
  };

  async totalNode_2() {
    const ctx = this.ctx;

    return ctx.model.CseParent.sum('node_2');
  };

  async totalNode_3() {
    const ctx = this.ctx;

    return ctx.model.CseParent.sum('node_3');
  };

  async totalNode_4() {
    const ctx = this.ctx;

    return ctx.model.CseParent.sum('node_4');
  };

  async totalNode_5() {
    const ctx = this.ctx;

    return ctx.model.CseParent.sum('node_5');
  };

  async totalNode_6() {
    const ctx = this.ctx;

    return ctx.model.CseParent.sum('node_6');
  };

  async totalNode_7() {
    const ctx = this.ctx;

    return ctx.model.CseParent.sum('node_7');
  };
}

module.exports = CseParentService;