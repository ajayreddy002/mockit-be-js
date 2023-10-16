const { interviewerSlots, interviewerProfile } = require("../../models/interviewers/interviewer-model");
const { getUserInfoByToken } = require("../../services/token.service");

module.exports = {
    buildProfile: async (req, res) => {
        try {
            const decoded = getUserInfoByToken(req.headers["x-access-token"] || req.headers["token"])
            console.log(decoded)
            let interviewer = await interviewerProfile.findOne({ userId: decoded.user_id });
            console.log(interviewer)
            if (req.params.type === 'personalDetails') {
                const { body } = req;
                interviewer.personalDetails = { ...interviewer.personalDetails, ...body }
                interviewer.upDt = new Date();
            } 
            if (req.params.type === 'eduQualifications') {
                const { body } = req;
                console.log(body)
                interviewer.eduQualifications = body
                interviewer.upDt = new Date();
            }
            if (req.params.type === 'experience') {
                const { body } = req;
                interviewer.experience = body.experience;
                interviewer.skills = body.skills;
                interviewer.upDt = new Date();
            }
            await interviewer.save();
            res.status(200).send({message: 'Details added successfully', res: interviewer})
        } catch (err) {
            res
                .status(500)
                .send({ status: 'Error', message: `${err} Something went wrong.` });
        }
    },
    slots: async (req, res) => {
        try {
            const decoded = getUserInfoByToken(req.headers["x-access-token"] || req.headers["token"]);
            if (decoded.role === 'interviewer') {
                let slotsInfo = req.body;
                console.log(slotsInfo)
                slotsInfo = {
                    ...slotsInfo, interviewerId: req.params.id, crDt: new Date(),
                    upDt: new Date(),
                }
                const { _id } = await interviewerSlots.create(slotsInfo);
                res
                    .status(200)
                    .send({ status: 'Success', message: 'Scheduled successfully' });
            } else {
                res
                    .status(401)
                    .send({ status: 'Error', message: `You are not authorized.` });
            }
        } catch (error) {
            res
                .status(500)
                .send({ status: 'Error', message: `${error} Something went wrong.` });
        }
    }
}