const { interviewerProfile } = require("../../models/interviewers/interviewer-model");
const { user } = require("../../models/users/user-model");
const { getAllInterviews } = require("../../services/interview-service")

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
    getAllUsers: async (req, res) => {
        try {
            const users = await user.find({}, '-password')
            console.log(users);
        } catch (err) {
            res
                .status(500)
                .send({ status: 'Error', message: `${error} Something went wrong.` });
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
    }
}