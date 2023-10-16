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
        return new Promise(async (resolve, reject) => {
            const existingInterviews = await InterviewModel.find(
                {
                    date,
                    startTime,
                    endTime
                }
            );
            if (existingInterviews && existingInterviews.length > 0) {
                reject('Slot not avialable');
            } else {
                const res = await InterviewModel.findByIdAndUpdate(id, { $set: { startTime, endTime, date } });
                if(res && res._id){
                    resolve(res);
                } else {
                    reject('Interview not found');
                }
            }
        })
    },
}