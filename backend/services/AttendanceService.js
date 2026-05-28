
class AttendanceService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    recordAttendance(studentId, date, status) {
        console.log("AttendanceService.recordAttendance called");
    }

    getAttendance(studentId) {
        console.log("AttendanceService.getAttendance called");
    }
}

module.exports = AttendanceService;
