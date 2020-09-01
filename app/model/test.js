'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Test = app.model.define('test', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  return Test;
};