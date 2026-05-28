
class ApplicationService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    applyForInternship(studentId, internshipId) {
        console.log("ApplicationService.applyForInternship called");
    }

    getApplications(studentId) {
        console.log("ApplicationService.getApplications called");
    }
}

module.exports = ApplicationService;
