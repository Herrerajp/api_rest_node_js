const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const database = new Sequelize('project_node', 'root', '', {
  host: 'localhost',
  dialect:  'mysql',
  /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

module.exports=database;