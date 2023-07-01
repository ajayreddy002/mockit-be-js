const { interviewerProfile } = require("../../models/interviewers/interviewer-model");
const { getAllInterviews, updateInterviewById, rescheduleInterview } = require("../../services/interview-service");
const { getAllUsers } = require("../../services/user-service");

module.exports = {
    getAllLatestInterviews: async (req, res) => {
        try {
            const slots = await getAllInterviews()
            res.status(200).send({ status: 'Success', slots: slots });
        } catch (error) {
            res
                .status(500)
                .send({ status: 'Error', message: `${error} Something went wrong.` });
        }
    },
    getUsers: async (req, res) => {
        try {
            res.status(200).send({ users: await getAllUsers(req) })
        } catch (err) {
            console.log(err)
            res
                .status(500)
                .send({ status: 'Error', message: `${err} Something went wrong.` });
        }
    },
    getInterviewers: async () => {
        try {
            const interviewers = await interviewerProfile.find({}, "personalDetails interviewerId experience")
            console.log(interviewers);
        } catch (err) {
            res
                .status(500)
                .send({ status: 'Error', message: `${error} Something went wrong.` });
        }
    },
    updateInterview: async (req, res) => {
        try {
            if (req.params.id) {
                const updateIRes = await updateInterviewById(req.params.id, req.body);
                if (updateIRes) {
                    res.status(200).send({ status: 'Success', message: 'Updated successfully' })
                }
            } else {
                res
                    .status(400)
                    .send({ status: 'Error', message: 'Bad request' });
            }
        } catch (err) {
            res
                .status(500)
                .send({ status: 'Error', message: `${err} Something went wrong.` });
        }
    },
    reschedule: async (req, res) => {
        try {
            const { date, startTime, endTime } = req.body
            if (req.params.id) {
                const updateIRes = await rescheduleInterview(req.params.id, { date, startTime, endTime });
                if (updateIRes) {
                    res.status(200).send({ status: 'Success', message: 'Rescheduled successfully' })
                }
            } else {
                res
                    .status(400)
                    .send({ status: 'Error', message: 'Bad request' });
            }
        } catch (err) {
            res
                .status(500)
                .send({ status: 'Error', message: `${err} Something went wrong.` });
        }
    }
}