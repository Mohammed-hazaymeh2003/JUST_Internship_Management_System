
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