
class AccreditationService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    requestAccreditation(companyId, details) {
        console.log("AccreditationService.requestAccreditation called");
    }
    
    getAccreditationRequests() {
        console.log("AccreditationService.getAccreditationRequests called");
    }
}
module.exports = AccreditationService;
