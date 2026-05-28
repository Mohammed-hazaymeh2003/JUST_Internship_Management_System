const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohammed.2003@",
  database: "ftms"
});

db.connect((err) => {
  if (err) throw err;
  
  db.query("DESCRIBE categories", (err, results) => {
    console.log("Categories Schema:");
    console.log(results);
    
    db.query("SELECT * FROM categories", (err, rows) => {
      console.log("Categories Data:");
      console.log(rows);
      db.end();
    });
  });
});
