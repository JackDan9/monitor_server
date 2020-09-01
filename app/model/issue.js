'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER, BOOLEAN } = app.Sequelize;

  const Issue = app.model.define('monitor_issues', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    issue_id: STRING(128),
    issue_cse_id: STRING(128),
    issue_key: STRING(128),
    issue_name: STRING(256),
    issue_summary: STRING(1028),
    issue_status: STRING(128),
    issue_type: STRING(64),
    issue_type_description: STRING(1028),
    issue_created: DATE,
    issue_fix_versions: STRING(128),
    issue_fix_versions_description: STRING(1028),
    issue_creator_name: STRING(128),
    issue_creator_id: STRING(128),
    issue_assignee_name: STRING(128),
    issue_assignee_id: STRING(128),
    issue_reporter_name: STRING(128),
    issue_reporter_id: STRING(128),
    issue_updated: DATE,
    issue_priority: STRING(64),
    issue_sla_time_to_resolution: STRING(128),
    issue_sla_time_to_l1_review: STRING(128),
    issue_sla_time_to_first_response: STRING(128),
    issue_sla_time_to_close_after_resolution: STRING(128),
    issue_components: STRING(128),
    issue_area: STRING(128),
    issue_result: STRING(128),
    issue_extra_1: STRING(128),
    issue_extra_2: STRING(128),
    issue_extra_3: STRING(128),
    created_at: DATE,
    updated_at: DATE,
  });

  return Issue;
};
