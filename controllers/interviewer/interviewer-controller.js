const { interviewerSlots } = require("../../models/interviewers/interviewer-model");
const jwt = require("jsonwebtoken");

const config = process.env;

module.exports = {
    buildProfile: (req, res) => {

    },
    slots: async (req, res) => {
        try {
            const token = req.headers["x-access-token"] || req.headers["token"];
            const decoded = jwt.verify(token, config.TOKEN_KEY);
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