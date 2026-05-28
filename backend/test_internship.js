const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohammed.2003@",
  database: "ftms"
});

async function runTest() {
  const ts = Date.now();
  const email = "contact" + ts + "@testcompany.com";
  const password = "password123";
  const commercialNumber = "COMM-" + ts;
  
  console.log("Registering company...");
  let res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role: "company",
      password: password,
      data: {
        commercialNumber: commercialNumber,
        name: "Test Cyber Company",
        email: email,
        phone: "123456789",
        field: "Technology"
      }
    })
  });
  console.log("Register res:", await res.json());

  res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password })
  });
  let loginData = await res.json();
  console.log("Login res:", loginData);
  const user_id = loginData.user_id;

  // 3. Add Internship
  res = await fetch("http://localhost:3000/add-internship", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      internship_title: "Junior Cyber Analyst",
      internship_description: "Analyze network traffic.",
      students_required: 2,
      training_duration_months: 3,
      training_start_date: "2026-06-01",
      training_end_date: "2026-09-01",
      category: "Cybersecurity",
      location: "Amman",
      user_id: user_id
    })
  });
  console.log("Add Internship res:", await res.json());

  db.query("SELECT * FROM internships ORDER BY internship_id DESC LIMIT 1", (err, results) => {
    if (err) console.error(err);
    else console.log("Latest Internship in DB:", results);
    
    fetch("http://localhost:3000/internship-counts")
    .then(res => res.json())
    .then(counts => {
      console.log("Internship counts API:", counts.find(c => c.category === "Cybersecurity"));
      db.end();
    });
  });
}

runTest();
