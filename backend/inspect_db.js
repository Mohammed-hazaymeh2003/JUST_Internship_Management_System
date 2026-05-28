const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohammed.2003@",
  database: "ftms"
});

db.connect((err) => {
  if (err) throw err;
  
  db.query("DESCRIBE internships", (err, results) => {
    console.log("Internships table:");
    console.log(results);
    
    db.query("SHOW TABLES LIKE 'categories'", (err, results) => {
      console.log("Categories table exists:");
      console.log(results);
      db.end();
    });
  });
});
