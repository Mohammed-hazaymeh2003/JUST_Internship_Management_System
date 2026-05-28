
class AuthService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    login(email, password) {
        console.log("AuthService.login called");
    }

    register(userData) {
        console.log("AuthService.register called");
    }
}

module.exports = AuthService;
