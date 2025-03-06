const config = require("config");
const mysql = require("mysql2/promise");
const logger = require("./logger");

async function get_pool() {
  try {
    let mssql_config = {
      user: config.get("mysqldatabase.user"),
      password: config.get("mysqldatabase.password"),
      host: config.get("mysqldatabase.host"),
      port: config.get("mysqldatabase.port"),
      database: config.get("mysqldatabase.database"),
    };
    const pool = new mysql.createPool(mssql_config);
    await pool.getConnection();
    return pool;
  } catch (error) {
    logger.log_error(error);
  }
}

module.exports = {
  get_pool,
};
