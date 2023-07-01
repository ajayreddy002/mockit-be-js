const { InterviewModel } = require("../models/interview/interview-model");

module.exports = {
    getAllInterviews: async () => await InterviewModel.find(
        {
            date: {
                $gte: new Date().setHours(0, 0, 0),
            },
        },
        'date startTime endTime'
    ),
    updateInterviewById: async (id, body) => {
        return await InterviewModel.findByIdAndUpdate(id, body);
    },
    rescheduleInterview: async (id, date, startTime, endTime) => {
        return await InterviewModel.findByIdAndUpdate(id, { $set: { startTime, endTime, date } });
    },
}