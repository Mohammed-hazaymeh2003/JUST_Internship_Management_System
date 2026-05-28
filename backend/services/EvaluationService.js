
class EvaluationService {
    constructor(dbControl) {
        this.dbControl = dbControl;
    }

    submitEvaluation(evalData) {
        console.log("EvaluationService.submitEvaluation called");
    }

    getEvaluation(studentId) {
        console.log("EvaluationService.getEvaluation called");
    }
}

module.exports = EvaluationService;
