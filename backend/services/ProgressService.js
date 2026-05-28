
class ProgressService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    updateProgress(studentId, progressData) {
        console.log("ProgressService.updateProgress called");
    }

    getProgress(studentId) {
        console.log("ProgressService.getProgress called");
    }
}

module.exports = ProgressService;
