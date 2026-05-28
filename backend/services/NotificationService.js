
class NotificationService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    sendNotification(userId, message) {
        console.log("NotificationService.sendNotification called");
    }

    getNotifications(userId) {
        console.log("NotificationService.getNotifications called");
    }
}

module.exports = NotificationService;
