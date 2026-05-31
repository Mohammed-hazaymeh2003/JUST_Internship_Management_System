const {

  validatePassword,
  confirmPassword,
  validateStudentEmail,
 validateStudentId,
validatePhone,
validateFullName,
validateRegister,
validateLogin,
 validateInternshipTitle,
validateInternshipDescription,
validateStudentsRequired,
 validateLocation,
validateTrainingDuration,
validateCategory,
validateCompanyEmail,
validateCommercialNumber,
validateSpecialization,
validateSupervisorEmail,
validateStartDate,
validateEndDate










} = require("../utils/validation");

test("Valid password should return true", () => {

  expect(validatePassword("Test@123"))
    .toBe(true);

});

test("Password with only numbers should fail", () => {

  expect(validatePassword("12345678"))
    .toBe(false);

});

test("Password with only letters should fail", () => {

  expect(validatePassword("Password"))
    .toBe(false);

});

test("Password with numbers and symbols only should fail", () => {

  expect(validatePassword("123@#$"))
    .toBe(false);

});

test("Password with lowercase letters only should fail", () => {

  expect(validatePassword("password"))
    .toBe(false);

});

test("Password with uppercase letters only should fail", () => {

  expect(validatePassword("PASSWORD"))
    .toBe(false);

});

test("Password without special character should fail", () => {

  expect(validatePassword("Test123"))
    .toBe(false);

});

test("Password without uppercase should fail", () => {

  expect(validatePassword("test@123"))
    .toBe(false);

});

test("Password without lowercase should fail", () => {

  expect(validatePassword("TEST@123"))
    .toBe(false);

});

test("Empty password should fail", () => {

  expect(validatePassword(""))
    .toBe(false);

});
test("Matching passwords should return true", () => {

  expect(confirmPassword("Test@123", "Test@123"))
    .toBe(true);

});

test("Different passwords should return false", () => {

  expect(confirmPassword("Test@123", "Test@124"))
    .toBe(false);

});
test("Valid student email should return true", () => {

  expect(validateStudentEmail("student@cit.just.edu.jo"))
    .toBe(true);

});

test("Email without CIT domain should fail", () => {

  expect(validateStudentEmail("student@gmail.com"))
    .toBe(false);

});

test("Email with wrong university domain should fail", () => {

  expect(validateStudentEmail("student@just.edu.jo"))
    .toBe(false);

});

test("Empty email should fail", () => {

  expect(validateStudentEmail(""))
    .toBe(false);

});

test("Email without @ should fail", () => {

  expect(validateStudentEmail("studentcit.just.edu.jo"))
    .toBe(false);

});
test("Valid student ID should return true", () => {

  expect(validateStudentId("1234567"))
    .toBe(true);

});

test("Student ID with less than 3 digits should fail", () => {

  expect(validateStudentId("12"))
    .toBe(false);

});

test("Student ID with more than 7 digits should fail", () => {

  expect(validateStudentId("12345678"))
    .toBe(false);

});

test("Student ID containing letters should fail", () => {

  expect(validateStudentId("12AB34"))
    .toBe(false);

});

test("Empty student ID should fail", () => {

  expect(validateStudentId(""))
    .toBe(false);

});
test("Valid phone number should return true", () => {

  expect(validatePhone("0798334246"))
    .toBe(true);

});

test("Phone number with letters should fail", () => {

  expect(validatePhone("07983ABCD"))
    .toBe(false);

});

test("Phone number with symbols should fail", () => {

  expect(validatePhone("07983@#$"))
    .toBe(false);

});

test("Empty phone number should fail", () => {

  expect(validatePhone(""))
    .toBe(false);

});

test("Phone number with spaces should fail", () => {

  expect(validatePhone("079 8334246"))
    .toBe(false);

});
test("Valid full name should return true", () => {

  expect(validateFullName("Taimaa Abdelrahman Flieh Alshraideh"))
    .toBe(true);

});

test("Full name with less than 4 parts should fail", () => {

  expect(validateFullName("Taimaa Alshraideh"))
    .toBe(false);

});

test("Full name with more than 4 parts should fail", () => {

  expect(validateFullName("Taimaa Abdelrahman Flieh Alshraideh Mohammed"))
    .toBe(false);

});

test("Empty full name should fail", () => {

  expect(validateFullName(""))
    .toBe(false);

});

test("Full name with spaces only should fail", () => {

  expect(validateFullName("     "))
    .toBe(false);

});
test("Valid register data should return true", () => {

  const data = {

    password: "Taimaa@123",
    confirmPassword: "Taimaa@123",
    email: "taalshraiedeh20@cit.just.edu.jo",
    id: "144044",
    phone: "0798334246",
    name: "Taimaa Abdelrahman Flieh Alshraideh"

  };

  expect(validateRegister(data))
    .toBe(true);

});

test("Register should fail if password is invalid", () => {

  const data = {

    password: "12345678",
    confirmPassword: "12345678",
    email: "taalshraiedeh20@cit.just.edu.jo",
    id: "144044",
    phone: "0798334246",
    name: "Taimaa Abdelrahman Flieh Alshraideh"

  };

  expect(validateRegister(data))
    .toBe(false);

});

test("Register should fail if email is invalid", () => {

  const data = {

    password: "Taimaa@123",
    confirmPassword: "Taimaa@123",
    email: "taimaa@gmail.com",
    id: "144044",
    phone: "0798334246",
    name: "Taimaa Abdelrahman Flieh Alshraideh"

  };

  expect(validateRegister(data))
    .toBe(false);

});

test("Register should fail if full name is invalid", () => {

  const data = {

    password: "Taimaa@123",
    confirmPassword: "Taimaa@123",
    email: "taalshraiedeh20@cit.just.edu.jo",
    id: "144044",
    phone: "0798334246",
    name: "Taimaa Alshraideh"

  };

  expect(validateRegister(data))
    .toBe(false);

});
test("Valid login data should return true", () => {

  const data = {

    email: "taalshraiedeh20@cit.just.edu.jo",
    password: "Taimaa@123"

  };

  expect(validateLogin(data))
    .toBe(true);

});

test("Login should fail if email is empty", () => {

  const data = {

    email: "",
    password: "Taimaa@123"

  };

  expect(validateLogin(data))
    .toBe(false);

});

test("Login should fail if password is empty", () => {

  const data = {

    email: "taalshraiedeh20@cit.just.edu.jo",
    password: ""

  };

  expect(validateLogin(data))
    .toBe(false);

});

test("Login should fail if both fields are empty", () => {

  const data = {

    email: "",
    password: ""

  };

  expect(validateLogin(data))
    .toBe(false);

});
test("Valid internship title should return true", () => {

  expect(validateInternshipTitle("Software Engineer"))
    .toBe(true);

});

test("Internship title with numbers should fail", () => {

  expect(validateInternshipTitle("Software123"))
    .toBe(false);

});

test("Internship title with symbols should fail", () => {

  expect(validateInternshipTitle("Software@Engineer"))
    .toBe(false);

});

test("Empty internship title should fail", () => {

  expect(validateInternshipTitle(""))
    .toBe(false);

});

test("Internship title with spaces only should fail", () => {

  expect(validateInternshipTitle("     "))
    .toBe(false);

});
test("Valid internship description should return true", () => {

  expect(
    validateInternshipDescription(
      "Software engineering internship for university students in web development"
    )
  ).toBe(true);

});

test("Description shorter than 50 characters should fail", () => {

  expect(
    validateInternshipDescription(
      "Short internship description"
    )
  ).toBe(false);

});

test("Description with numbers only should fail", () => {

  expect(
    validateInternshipDescription(
      "12345678901234567890123456789012345678901234567890"
    )
  ).toBe(false);

});

test("Empty internship description should fail", () => {

  expect(
    validateInternshipDescription("")
  ).toBe(false);

});

test("Description with spaces only should fail", () => {

  expect(
    validateInternshipDescription("                                                  ")
  ).toBe(false);

});
test("Valid number of students should return true", () => {

  expect(validateStudentsRequired("10"))
    .toBe(true);

});

test("Zero students should fail", () => {

  expect(validateStudentsRequired("0"))
    .toBe(false);

});

test("More than 100 students should fail", () => {

  expect(validateStudentsRequired("101"))
    .toBe(false);

});

test("Students field with letters should fail", () => {

  expect(validateStudentsRequired("Ten"))
    .toBe(false);

});

test("Negative number of students should fail", () => {

  expect(validateStudentsRequired("-5"))
    .toBe(false);

});
test("Valid location should return true", () => {

  expect(validateLocation("Amman"))
    .toBe(true);

});

test("Location with numbers should fail", () => {

  expect(validateLocation("Amman123"))
    .toBe(false);

});

test("Location with symbols should fail", () => {

  expect(validateLocation("Amman@Jordan"))
    .toBe(false);

});

test("Empty location should fail", () => {

  expect(validateLocation(""))
    .toBe(false);

});

test("Location with spaces only should fail", () => {

  expect(validateLocation("      "))
    .toBe(false);

});
test("Valid training duration should return true", () => {

  expect(validateTrainingDuration("3"))
    .toBe(true);

});

test("Zero duration should fail", () => {

  expect(validateTrainingDuration("0"))
    .toBe(false);

});

test("Duration more than 4 months should fail", () => {

  expect(validateTrainingDuration("5"))
    .toBe(false);

});

test("Duration with letters should fail", () => {

  expect(validateTrainingDuration("Three"))
    .toBe(false);

});

test("Empty duration should fail", () => {

  expect(validateTrainingDuration(""))
    .toBe(false);

});
test("Valid category should return true", () => {

  expect(validateCategory("Software Engineering"))
    .toBe(true);

});

test("Category with numbers should fail", () => {

  expect(validateCategory("Software123"))
    .toBe(false);

});

test("Category with symbols should fail", () => {

  expect(validateCategory("Software@Engineering"))
    .toBe(false);

});

test("Empty category should fail", () => {

  expect(validateCategory(""))
    .toBe(false);

});

test("Category with spaces only should fail", () => {

  expect(validateCategory("      "))
    .toBe(false);

});
test("Valid company email should return true", () => {

  expect(validateCompanyEmail("hr@microsoft.com"))
    .toBe(true);

});

test("Gmail company email should fail", () => {

  expect(validateCompanyEmail("company@gmail.com"))
    .toBe(false);

});

test("Yahoo company email should fail", () => {

  expect(validateCompanyEmail("company@yahoo.com"))
    .toBe(false);

});

test("Empty company email should fail", () => {

  expect(validateCompanyEmail(""))
    .toBe(false);

});

test("Valid commercial number should return true", () => {

  expect(validateCommercialNumber("123456789"))
    .toBe(true);

});

test("Commercial number with letters should fail", () => {

  expect(validateCommercialNumber("123ABC"))
    .toBe(false);

});

test("Commercial number less than 5 digits should fail", () => {

  expect(validateCommercialNumber("1234"))
    .toBe(false);

});

test("Commercial number more than 15 digits should fail", () => {

  expect(validateCommercialNumber("1234567891234567"))
    .toBe(false);

});

test("Empty commercial number should fail", () => {

  expect(validateCommercialNumber(""))
    .toBe(false);

});

test("Valid specialization should return true", () => {

  expect(validateSpecialization("Software Engineering"))
    .toBe(true);

});

test("Specialization with numbers should fail", () => {

  expect(validateSpecialization("Software123"))
    .toBe(false);

});

test("Specialization with symbols should fail", () => {

  expect(validateSpecialization("Software@Engineering"))
    .toBe(false);

});

test("Empty specialization should fail", () => {

  expect(validateSpecialization(""))
    .toBe(false);

});

test("Valid supervisor email should return true", () => {

  expect(validateSupervisorEmail("doctor@just.edu.jo"))
    .toBe(true);

});

test("Supervisor gmail should fail", () => {

  expect(validateSupervisorEmail("doctor@gmail.com"))
    .toBe(false);

});

test("Supervisor email without JUST domain should fail", () => {

  expect(validateSupervisorEmail("doctor@yahoo.com"))
    .toBe(false);

});

test("Empty supervisor email should fail", () => {

  expect(validateSupervisorEmail(""))
    .toBe(false);

});

test("Valid start date should return true", () => {

  expect(validateStartDate("2026-06-01"))
    .toBe(true);

});

test("Past start date should fail", () => {

  expect(validateStartDate("2025-01-01"))
    .toBe(false);

});

test("Start date more than one month ahead should fail", () => {

  expect(validateStartDate("2027-01-01"))
    .toBe(false);

});

test("Valid end date should return true", () => {

  expect(validateEndDate("2026-06-01", "2026-08-01"))
    .toBe(true);

});

test("End date before start date should fail", () => {

  expect(validateEndDate("2026-06-01", "2026-05-01"))
    .toBe(false);

});

test("End date equal to start date should fail", () => {

  expect(validateEndDate("2026-06-01", "2026-06-01"))
    .toBe(false);

});

test("End date more than 4 months should fail", () => {

  expect(validateEndDate("2026-06-01", "2027-01-01"))
    .toBe(false);

});