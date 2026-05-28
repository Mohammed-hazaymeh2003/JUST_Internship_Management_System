
class VisitService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    scheduleVisit(supervisorId, companyId, date) {
        console.log("VisitService.scheduleVisit called");
    }

    getVisits(supervisorId) {
        console.log("VisitService.getVisits called");
    }
}

module.exports = VisitService;
