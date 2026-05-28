
class InternshipService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    postInternship(data) {
        console.log("InternshipService.postInternship called");
    }

    getInternships() {
        console.log("InternshipService.getInternships called");
    }

    searchInternships(category) {
        console.log("InternshipService.searchInternships called");
    }
}

module.exports = InternshipService;
