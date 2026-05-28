const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohammed.2003@",
  database: "ftms"
});

db.connect((err) => {
  if (err) throw err;
  
  db.query("ALTER TABLE companies ADD commercial_number VARCHAR(50) UNIQUE", (err, results) => {
    if (err && err.code !== 'ER_DUP_FIELDNAME') {
      console.error(err);
    } else {
      console.log("Column added or already exists.");
    }
    db.end();
  });
});
