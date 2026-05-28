const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mohammed.2003@",
  database: "ftms"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL");
});

const DatabaseControl = require('./database/DatabaseControl');
const AuthService = require('./services/AuthService');
const InternshipService = require('./services/InternshipService');
const ApplicationService = require('./services/ApplicationService');
const ReportService = require('./services/ReportService');
const EvaluationService = require('./services/EvaluationService');
const AttendanceService = require('./services/AttendanceService');
const ProgressService = require('./services/ProgressService');
const NotificationService = require('./services/NotificationService');
const AccreditationService = require('./services/AccreditationService');
const VisitService = require('./services/VisitService');

const dbControl = new DatabaseControl(db);
const authService = new AuthService(dbControl);
const internshipService = new InternshipService(dbControl);
const applicationService = new ApplicationService(dbControl);
const reportService = new ReportService(dbControl);
const evaluationService = new EvaluationService(dbControl);
const attendanceService = new AttendanceService(dbControl);
const progressService = new ProgressService(dbControl);
const notificationService = new NotificationService(dbControl);
const accreditationService = new AccreditationService(dbControl);
const visitService = new VisitService(dbControl);


app.post("/register", (req, res) => {
  console.log("Register Request Body:", req.body);
  const { role, password, data } = req.body;

  if (!role || !password || !data || !data.email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain uppercase, lowercase, numbers, and special symbols" });
  }

  if (role === "company" && (!data.commercialNumber || !data.location)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (role !== "company" && !data.id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const email = data.email.toLowerCase();

  if (role === "student") {
    if (!/^\d{3,7}$/.test(data.id)) {
        return res.status(400).json({ message: "University ID must contain 3 to 7 digits only" });
    }
    if (!email.endsWith("@cit.just.edu.jo")) {
      return res.status(400).json({ message: "Student email must be a CIT university email" });
    }
    if (!data.name || data.name.trim().split(/\s+/).length !== 4) {
      return res.status(400).json({ message: "Full Name must contain exactly 4 name parts" });
    }
    if (!/^\d+$/.test(data.phone)) {
        return res.status(400).json({ message: "Phone Number must contain numbers only" });
    }
    if (!/^[a-zA-Z\s]+$/.test(data.dept)) {
        return res.status(400).json({ message: "Department must contain letters only" });
    }
  } else if (role === "supervisor") {
    if (!email.endsWith("@just.edu.jo")) {
      return res.status(400).json({ message: "Supervisor email must be a JUST university email" });
    }
  } else if (role === "company") {
    if (!/^\d{5,15}$/.test(data.commercialNumber)) {
        return res.status(400).json({ message: "Commercial Registration Number must be 5-15 digits only" });
    }
    if (!data.name || !/^[a-zA-Z\s]+$/.test(data.name) || data.name.trim().length < 3) {
        return res.status(400).json({ message: "Company Name must contain letters and spaces only, minimum 3 characters" });
    }
    const personalDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
    if (personalDomains.some(domain => email.endsWith(domain))) {
      return res.status(400).json({ message: "Company email must be an official company email" });
    }
    if (!/^\d+$/.test(data.phone)) {
        return res.status(400).json({ message: "Company Phone Number must contain numbers only" });
    }
    if (!/^[a-zA-Z\s,]+$/.test(data.location)) {
        return res.status(400).json({ message: "Company Location must contain letters, spaces, and commas only" });
    }
    if (!/^[a-zA-Z]+$/.test(data.field)) {
        return res.status(400).json({ message: "Specialization must contain letters only" });
    }
  }

  const checkRegistration = () => {
    return new Promise((resolve, reject) => {
      if (role === "company") {
        db.query("SELECT * FROM companies WHERE commercial_number = ?", [data.commercialNumber], (err, results) => {
          if (err) return reject(err);
          if (results.length > 0) {
            return reject({ status: 400, message: "This commercial number is already registered." });
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  };

  checkRegistration().then(() => {
    const userIdToCheck = role === "company" ? null : data.id;
    const checkQuery = "SELECT user_id, email FROM users WHERE user_id = ? OR email = ?";
    db.query(checkQuery, [userIdToCheck, data.email], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("MySQL Error during duplicate check:", checkErr);
        return res.status(500).json({ message: "Database error during validation" });
      }

      if (checkResults.length > 0) {
        const existingUser = checkResults[0];
        if (userIdToCheck && existingUser.user_id === userIdToCheck) {
          return res.status(400).json({ message: "User ID already exists" });
        }
        if (existingUser.email === data.email) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }

      const generatedUserId = role === "company" ? "C" + Date.now().toString().slice(-10) : data.id;

      const query = "INSERT INTO users (user_id, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [generatedUserId, data.email, password, role], (err, results) => {
        if (err) {
          console.error("MySQL Error during users insert:", err);
          return res.status(500).json({ message: "Database error during registration" });
        }

        if (role === "student") {
          const studentQuery = "INSERT INTO students (student_id, user_id, full_name, phone, specialization) VALUES (?, ?, ?, ?, ?)";
          db.query(studentQuery, [data.id, generatedUserId, data.name, data.phone, data.dept], (studentErr) => {
            if (studentErr) {
              console.error("MySQL Error during students insert:", studentErr);
              return res.status(500).json({ message: "Database error while adding student details" });
            }
            res.json({ message: "Registered successfully" });
          });
        } else if (role === "company") {
          const companyQuery = "INSERT INTO companies (user_id, commercial_number, company_name, email, phone, location, specialization) VALUES (?, ?, ?, ?, ?, ?, ?)";
          db.query(companyQuery, [generatedUserId, data.commercialNumber, data.name, data.email, data.phone, data.location, data.field], (companyErr) => {
            if (companyErr) {
              console.error("MySQL Error during companies insert:", companyErr);
              return res.status(500).json({ message: "Database error while adding company details" });
            }
            res.json({ message: "Registered successfully" });
          });
        } else {
          res.json({ message: "Registered successfully" });
        }
      });
    });
  }).catch(err => {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    } else {
      console.error("Error during pre-registration check:", err);
      return res.status(500).json({ message: "Database error during pre-registration validation" });
    }
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error during login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const user = results[0];
    let nameQuery = "";
    let nameField = "";

    if (user.role === "student") {
      nameQuery = "SELECT full_name FROM students WHERE user_id = ?";
      nameField = "full_name";
    } else if (user.role === "company") {
      nameQuery = "SELECT company_name FROM companies WHERE user_id = ?";
      nameField = "company_name";
    }

    const respond = (fullName) => {
      res.json({
        message: "Login successful",
        role: user.role,
        user_id: user.user_id,
        email: user.email,
        full_name: fullName
      });
    };

    if (nameQuery) {
      db.query(nameQuery, [user.user_id], (err2, results2) => {
        if (err2) {
          console.error(err2);
          return respond(null);
        }
        if (results2.length > 0) {
          respond(results2[0][nameField]);
        } else {
          respond(null);
        }
      });
    } else {
      respond(null);
    }
  });
});

app.post("/validate-session", (req, res) => {
  const { user_id, role } = req.body;
  if (!user_id || !role) {
    return res.status(400).json({ valid: false, message: "Missing user_id or role" });
  }

  const query = "SELECT * FROM users WHERE user_id = ? AND role = ?";
  db.query(query, [user_id, role], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ valid: false, message: "Database error" });
    }
    if (results.length > 0) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  });
});

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error fetching categories" });
    res.json(results);
  });
});

app.get("/company-profile/:user_id", (req, res) => {
  const { user_id } = req.params;
  const query = "SELECT company_name, specialization FROM companies WHERE user_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error fetching company profile" });
    if (results.length === 0) return res.status(404).json({ message: "Company not found" });
    res.json(results[0]);
  });
});

app.get("/categories", (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error fetching categories" });
    res.json(results);
  });
});

app.post("/add-internship", (req, res) => {
  console.log("add-internship req.body:", req.body);
  const { internship_title, internship_description, students_required, training_duration_months, training_start_date, training_end_date, category, location, user_id } = req.body;

  if (!internship_title || !internship_description || !students_required || !training_duration_months || !training_start_date || !training_end_date || !category || !location || !user_id) {
    return res.status(400).json({ message: "Missing internship details" });
  }

  if (!/^[a-zA-Z\s]+$/.test(internship_title)) {
    return res.status(400).json({ message: "Internship Title must contain letters only" });
  }

  if (!/[a-zA-Z]/.test(internship_description) || internship_description.length < 50) {
    return res.status(400).json({ message: "Internship Description must contain letters and be at least 50 characters long" });
  }

  const numStudents = parseInt(students_required);
  if (isNaN(numStudents) || numStudents < 1 || numStudents > 100) {
    return res.status(400).json({ message: "Students Required must be a number between 1 and 100" });
  }

  const today = new Date();
  today.setHours(0,0,0,0);
  const start = new Date(training_start_date);
  start.setHours(0,0,0,0);
  const oneMonthAhead = new Date(today);
  oneMonthAhead.setMonth(today.getMonth() + 1);

  if (start < today) {
    return res.status(400).json({ message: "Training Start Date cannot be in the past" });
  }
  if (start > oneMonthAhead) {
    return res.status(400).json({ message: "Training Start Date cannot be more than 1 month ahead" });
  }

  const end = new Date(training_end_date);
  end.setHours(0,0,0,0);
  if (end <= start) {
    return res.status(400).json({ message: "Training End Date must be after Start Date" });
  }

  const maxEnd = new Date(start);
  maxEnd.setMonth(start.getMonth() + 4);
  if (end > maxEnd) {
    return res.status(400).json({ message: "Maximum allowed duration is 4 months" });
  }

  if (!/^[a-zA-Z\s]+$/.test(location)) {
    return res.status(400).json({ message: "Location must contain letters only" });
  }

  const getCompanyQuery = "SELECT company_id FROM companies WHERE user_id = ?";
  db.query(getCompanyQuery, [user_id], (err, results) => {
    if (err) {
      console.error("MySQL Error during company lookup:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Company profile not found" });
    }

    const company_id = results[0].company_id;

    const getCategoryQuery = "SELECT category_id FROM categories WHERE category_name = ?";
    db.query(getCategoryQuery, [category], (catErr, catResults) => {
      if (catErr) {
        console.error("MySQL Error during category lookup:", catErr);
        return res.status(500).json({ message: "Database error" });
      }

      if (catResults.length === 0) {
        return res.status(400).json({ message: "Invalid category" });
      }

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
          console.log("MYSQL INSERT ERROR:", insertErr);
          return res.status(500).json({ message: "Database error while publishing internship", error: insertErr.message });
        }
        res.json({ message: "Internship published successfully!" });
      });
    });
  });
});

app.get("/internships", (req, res) => {
  const query = `
    SELECT 
      internships.internship_title AS title,
      internships.internship_description AS description,
      internships.students_required,
      internships.training_duration_months AS duration_months,
      internships.training_start_date AS start_date,
      internships.training_end_date AS end_date,
      categories.category_name AS specialization,
      internships.location,
      companies.company_name
    FROM internships
    LEFT JOIN companies ON internships.company_id = companies.company_id
    LEFT JOIN categories ON internships.category_id = categories.category_id;
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("MySQL Error fetching internships:", err);
      return res.status(500).json({ message: "Database error fetching internships" });
    }
    res.json(results);
  });
});

app.get("/internships/:category", (req, res) => {
  const category = req.params.category;
  console.log("Fetching internships for category:", category);

  const query = `
    SELECT 
      internships.internship_title AS title,
      internships.internship_description AS description,
      internships.students_required,
      internships.training_duration_months AS duration_months,
      internships.training_start_date AS start_date,
      internships.training_end_date AS end_date,
      categories.category_name AS specialization,
      internships.location,
      companies.company_name
    FROM internships
    LEFT JOIN companies ON internships.company_id = companies.company_id
    LEFT JOIN categories ON internships.category_id = categories.category_id
    WHERE categories.category_name = ?;
  `;

  db.query(query, [category], (err, results) => {
    if (err) {
      console.error("MySQL Error fetching internships by category:", err);
      return res.status(500).json({ message: "Database error fetching internships" });
    }
    console.log("Returned internships:", results);
    res.json(results);
  });
});

app.get("/internship-counts", (req, res) => {
  const query = `
    SELECT c.category_id, c.category_name AS category, COUNT(i.internship_id) AS total
    FROM categories c
    LEFT JOIN internships i ON c.category_id = i.category_id
    GROUP BY c.category_id, c.category_name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("MySQL Error fetching internship counts:", err);
      return res.status(500).json({ message: "Database error fetching counts" });
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});