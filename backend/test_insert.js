const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohammed.2003@",
  database: "ftms"
});

const query = `
  INSERT INTO internships 
  (company_id, category_id, internship_title, internship_description, students_required, training_start_date, training_end_date, training_duration_months, location) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  1, 8, "Junior Cyber Analyst", "Analyze network traffic.", 2, "2026-06-01", "2026-09-01", 3, "Amman"
];

db.query(query, values, (insertErr, insertResults) => {
  if (insertErr) {
    console.error("MYSQL INSERT ERROR:", insertErr);
  } else {
    console.log("Success:", insertResults);
  }
  db.end();
});
