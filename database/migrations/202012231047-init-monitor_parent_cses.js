'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数, 创建monitor_parent_cses表
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     * 
     * Example
     * await queryInterface.createTable('monitor_parent_cses', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('monitor_parent_cses', {
      id: { type: INTEGER, primaryKey: true },
      cse_id: STRING(64),
      cse_type: INTEGER,
      cse_key: STRING(16),
      cse_summary: STRING(1024),
      project_name: STRING(128),
      project_id: STRING(32),
      customer_name: STRING(512),
      deploy_status: STRING(16),
      deploy_version: STRING(16),
      current_version: STRING(16),
      fix_version: STRING(16),
      fix_version_desc: STRING(1028),
      node_1: INTEGER,
      node_2: INTEGER,
      node_3: INTEGER,
      node_4: INTEGER,
      node_5: INTEGER,
      node_6: INTEGER,
      node_7: INTEGER,
      license_expire: DATE,
      cpu: STRING(16),
      components: STRING(64),
      cse_created: DATE,
      cse_updated: DATE,
      parent_cse_extra_1: STRING(128),
      parent_cse_extra_2: STRING(128),
      parent_cse_extra_3: STRING(128),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     * 
     * Example:
     * await queryInterface.dropTable('monitor_parent_cses');
     */
    await queryInterface.dropTable('monitor_parent_cses');
  }
};
