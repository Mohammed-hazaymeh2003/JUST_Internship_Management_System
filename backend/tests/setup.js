const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.test") });

module.exports = async () => {
  console.log("Setting up test database...");
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Mohammed.2003@"
  });

  await connection.query(`DROP DATABASE IF EXISTS ftms_test`);
  await connection.query(`CREATE DATABASE ftms_test`);
  await connection.query(`USE ftms_test`);

  const schemaPath = path.resolve(__dirname, "../schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  
  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);
  for (const stmt of statements) {
    if (stmt === "CREATE DATABASE IF NOT EXISTS ftms_test") continue;
    if (stmt === "USE ftms_test") continue;
    await connection.query(stmt);
  }
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');

  const categories = [
    'Software Engineering', 'Data Science', 'Cyber Security', 'Networking', 'AI', 'Cloud Computing'
  ];
  for (const cat of categories) {
    await connection.query(`INSERT INTO categories (category_name) VALUES (?)`, [cat]);
  }

  const companyPassword = 'TestCompanyPassword.123@';
  await connection.query(`INSERT INTO users (user_id, email, password, role) VALUES ('C1234567890', 'test@company.com', ?, 'company')`, [companyPassword]);
  await connection.query(`INSERT INTO companies (commercial_number, user_id, company_name, email, phone, specialization, location) VALUES ('12345', 'C1234567890', 'Test Company', 'test@company.com', '123456789', 'Tech', 'Amman')`);

  const studentPassword = 'TestStudentPassword.123@';
  await connection.query(`INSERT INTO users (user_id, email, password, role) VALUES ('123456', 'student@cit.just.edu.jo', ?, 'student')`, [studentPassword]);
  await connection.query(`INSERT INTO students (student_id, user_id, full_name, phone, specialization) VALUES (123456, '123456', 'Test Student Name Here', '123456789', 'SE')`);

  await connection.end();
  console.log("Test database setup completed.");
};
