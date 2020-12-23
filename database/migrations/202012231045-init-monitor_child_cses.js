'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数, 创建monitor_child_cses表
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     * 
     * Example:
     * await queryInterface.createTable('monitor_child_cses', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('monitor_child_cses', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      cse_id: STRING(16),
      cse_type: INTEGER,
      cse_parent_id: STRING(16),
      cse_summary: STRING(1024),
      project_name: STRING(256),
      project_manager: STRING(64),
      customer_name: STRING(128),
      customer_level: STRING(16),
      inspection_frequency: STRING(16),
      service_start_time: DATE,
      service_end_time: DATE,
      service_type: STRING(16),
      service_area: STRING(64),
      deploy_status: STRING(16),
      env_type: STRING(64),
      current_version: STRING(16),
      implement_name: STRING(64),
      cse_created: DATE,
      cse_updated: DATE,
      child_cse_extra_1: STRING(128),
      child_cse_extra_2: STRING(128),
      child_cse_extra_3: STRING(128),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     * 
     * Example:
     * await queryInterface.dropTable('monitor_child_cses');
     */
    await queryInterface.dropTable('monitor_child_cses');
  }
};
