const mysql = require("mysql2/promise");
const fs = require("fs");

async function exportSchema() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mohammed.2003@",
    database: "ftms"
  });

  const [tables] = await connection.query("SHOW TABLES");
  let schema = "CREATE DATABASE IF NOT EXISTS ftms_test;\nUSE ftms_test;\n\n";

  for (const row of tables) {
    const tableName = Object.values(row)[0];
    const [createTableResult] = await connection.query(`SHOW CREATE TABLE \`${tableName}\``);
    schema += createTableResult[0]["Create Table"] + ";\n\n";
  }

  fs.writeFileSync("schema.sql", schema);
  console.log("Schema exported successfully.");
  await connection.end();
}

exportSchema().catch(console.error);
