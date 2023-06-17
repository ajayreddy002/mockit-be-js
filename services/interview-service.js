const { InterviewModel } = require("../models/interview/interview-model");

module.exports = {
    getAllInterviews: async () => {
        return await InterviewModel.find(
            {
                date: {
                    $gte: new Date().setHours(00, 00, 00),
                },
            },
            'date startTime endTime'
        );
    },
    updateInterviewById: async (id, body) => {
        return await InterviewModel.findByIdAndUpdate(id, body);
    }
}