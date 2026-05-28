const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, 'database');
const servicesDir = path.join(__dirname, 'services');

if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });

const dbControlContent = `/**
 * Class Diagram Component: DatabaseControl
 * Handles direct database operations and provides an abstraction layer for services.
 */
class DatabaseControl {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    verifyUser() { console.log("DatabaseControl.verifyUser called"); }
    saveInternship() { console.log("DatabaseControl.saveInternship called"); }
    getInternship() { console.log("DatabaseControl.getInternship called"); }
    saveApplication() { console.log("DatabaseControl.saveApplication called"); }
    getApplication() { console.log("DatabaseControl.getApplication called"); }
    saveReport() { console.log("DatabaseControl.saveReport called"); }
    getReport() { console.log("DatabaseControl.getReport called"); }
    saveEvaluation() { console.log("DatabaseControl.saveEvaluation called"); }
    getEvaluation() { console.log("DatabaseControl.getEvaluation called"); }
    saveAttendance() { console.log("DatabaseControl.saveAttendance called"); }
    getAttendance() { console.log("DatabaseControl.getAttendance called"); }
    saveProgress() { console.log("DatabaseControl.saveProgress called"); }
    getProgress() { console.log("DatabaseControl.getProgress called"); }
    saveNotification() { console.log("DatabaseControl.saveNotification called"); }
    getNotification() { console.log("DatabaseControl.getNotification called"); }
    saveAccreditationRequest() { console.log("DatabaseControl.saveAccreditationRequest called"); }
    getAccreditationRequest() { console.log("DatabaseControl.getAccreditationRequest called"); }
    saveVisitRecord() { console.log("DatabaseControl.saveVisitRecord called"); }
    getVisitRecord() { console.log("DatabaseControl.getVisitRecord called"); }
}

module.exports = DatabaseControl;
`;

fs.writeFileSync(path.join(dbDir, 'DatabaseControl.js'), dbControlContent);

const services = [
    { name: 'AuthService', methods: ['login(email, password)', 'register(userData)'] },
    { name: 'InternshipService', methods: ['postInternship(data)', 'getInternships()', 'searchInternships(category)'] },
    { name: 'ApplicationService', methods: ['applyForInternship(studentId, internshipId)', 'getApplications(studentId)'] },
    { name: 'ReportService', methods: ['submitReport(reportData)', 'getReports(internshipId)'] },
    { name: 'EvaluationService', methods: ['submitEvaluation(evalData)', 'getEvaluation(studentId)'] },
    { name: 'AttendanceService', methods: ['recordAttendance(studentId, date, status)', 'getAttendance(studentId)'] },
    { name: 'ProgressService', methods: ['updateProgress(studentId, progressData)', 'getProgress(studentId)'] },
    { name: 'NotificationService', methods: ['sendNotification(userId, message)', 'getNotifications(userId)'] },
    { name: 'AccreditationService', methods: ['requestAccreditation(companyId, details)', 'getAccreditationRequests()'] },
    { name: 'VisitService', methods: ['scheduleVisit(supervisorId, companyId, date)', 'getVisits(supervisorId)'] }
];

services.forEach(svc => {
    const methodsStr = svc.methods.map(m => {
        return `    ${m} {
        console.log("${svc.name}.${m.split('(')[0]} called");
        // TODO: Implement using this.dbControl
    }`;
    }).join('\n\n');

    const content = `/**
 * Class Diagram Component: ${svc.name}
 * Simulates an interface/service for ${svc.name.replace('Service', '')} operations.
 */
class ${svc.name} {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

${methodsStr}
}

module.exports = ${svc.name};
`;
    fs.writeFileSync(path.join(servicesDir, `${svc.name}.js`), content);
});

console.log("Files created successfully.");
