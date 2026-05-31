function validatePassword(password) {

  const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  return passwordRegex.test(password);

}

function confirmPassword(password, confirmPassword) {

  return password === confirmPassword;

}

function validateStudentEmail(email) {

  return email.endsWith("@cit.just.edu.jo");

}

function validateStudentId(id) {

  return /^\d{3,7}$/.test(id);

}

function validatePhone(phone) {

  return /^\d+$/.test(phone);

}

function validateFullName(name) {

  return name.trim().split(/\s+/).length === 4;

}

function validateRegister(data) {

  return (

    validatePassword(data.password) &&
    confirmPassword(data.password, data.confirmPassword) &&
    validateStudentEmail(data.email) &&
    validateStudentId(data.id) &&
    validatePhone(data.phone) &&
    validateFullName(data.name)

  );

}



function validateLogin(data) {

  return (

    data.email !== "" &&
    data.password !== ""

  );


}
function validateInternshipTitle(title) {

  return /^[a-zA-Z\s]+$/.test(title) &&
         title.trim() !== "";

}
function validateInternshipDescription(description) {

  return /[a-zA-Z]/.test(description) &&
         description.length >= 50;

}
function validateStudentsRequired(number) {

  const num = parseInt(number);

  return !isNaN(num) &&
         num >= 1 &&
         num <= 100;

}
function validateLocation(location) {

  return /^[a-zA-Z\s,]+$/.test(location) &&
         location.trim() !== "";

}
function validateTrainingDuration(duration) {

  const num = parseInt(duration);

  return !isNaN(num) &&
         num >= 1 &&
         num <= 4;

}
function validateCategory(category) {

  return /^[a-zA-Z\s]+$/.test(category) &&
         category.trim() !== "";

}
function validateCompanyEmail(email) {

  if (email.trim() === "") {
    return false;
  }

  const personalDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com"
  ];

  return !personalDomains.some(domain =>
    email.endsWith(domain)
  );

}

function validateCommercialNumber(number) {

  return /^\d{5,15}$/.test(number);

}

function validateSpecialization(field) {

  return /^[a-zA-Z\s]+$/.test(field) &&
         field.trim() !== "";

}

function validateSupervisorEmail(email) {

  return email.endsWith("@just.edu.jo");

}

function validateStartDate(startDate) {

  const today = new Date();
  today.setHours(0,0,0,0);

  const start = new Date(startDate);
  start.setHours(0,0,0,0);

  const oneMonthAhead = new Date(today);
  oneMonthAhead.setMonth(today.getMonth() + 1);

  return start >= today &&
         start <= oneMonthAhead;

}

function validateEndDate(startDate, endDate) {

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end <= start) {
    return false;
  }

  const maxEnd = new Date(start);
  maxEnd.setMonth(start.getMonth() + 4);

  return end <= maxEnd;

}
module.exports = {

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

};