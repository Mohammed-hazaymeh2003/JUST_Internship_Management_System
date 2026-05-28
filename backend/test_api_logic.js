const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohammed.2003@",
  database: "ftms"
});

const user_id = "C9289235669"; // The one from my last test that failed
const category = "Cybersecurity";
const internship_title = "Junior Cyber Analyst";
const internship_description = "Analyze network traffic.";
const students_required = 2;
const training_start_date = "2026-06-01";
const training_end_date = "2026-09-01";
const training_duration_months = 3;
const location = "Amman";

const getCompanyQuery = "SELECT company_id FROM companies WHERE user_id = ?";
db.query(getCompanyQuery, [user_id], (err, results) => {
  if (err) throw err;
  const company_id = results[0].company_id;
  
  const getCategoryQuery = "SELECT category_id FROM categories WHERE category_name = ?";
  db.query(getCategoryQuery, [category], (catErr, catResults) => {
    if (catErr) throw catErr;
    const category_id = catResults[0].category_id;
    
    const query = `
      INSERT INTO internships 
      (company_id, category_id, internship_title, internship_description, students_required, training_start_date, training_end_date, training_duration_months, location) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      company_id, category_id, internship_title, internship_description, students_required, training_start_date, training_end_date, training_duration_months, location
    ];

    db.query(query, values, (insertErr, insertResults) => {
      if (insertErr) {
        console.error("MYSQL INSERT ERROR:", insertErr);
      } else {
        console.log("Success:", insertResults);
      }
      db.end();
    });
  });
});
