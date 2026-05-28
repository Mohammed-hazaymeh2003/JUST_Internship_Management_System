
class ReportService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    submitReport(reportData) {
        console.log("ReportService.submitReport called");
    }

    getReports(internshipId) {
        console.log("ReportService.getReports called");
    }
}

module.exports = ReportService;
