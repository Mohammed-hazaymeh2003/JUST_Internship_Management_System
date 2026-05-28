const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohammed.2003@",
  database: "ftms"
});

db.connect((err) => {
  if (err) throw err;
  
  db.query("DESCRIBE users", (err, results) => {
    console.log("Users table:");
    console.log(results);
    
    db.query("DESCRIBE companies", (err, results) => {
      console.log("Companies table:");
      console.log(results);
      
      db.end();
    });
  });
});
