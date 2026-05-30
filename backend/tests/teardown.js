const mysql = require("mysql2/promise");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.test") });

module.exports = async () => {
  console.log("Tearing down test database...");
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Mohammed.2003@"
  });

  await connection.query(`DROP DATABASE IF EXISTS ftms_test`);
  await connection.end();
  console.log("Test database teardown completed.");
};
