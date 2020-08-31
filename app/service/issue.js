'use strict';

const Service = require('egg').Service;

class IssueService extends Service {
  async get(name) {
    return { name };
  }
}

module.exports = IssueService;