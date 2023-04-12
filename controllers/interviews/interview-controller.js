const { InterviewModel } = require("../../models/interview/interview-model");

module.exports = {
  schedule: async (req, res) => {
    try {
      const { _id } = await InterviewModel.create(req.body);
      res
        .status(200)
        .send({ status: "Success", message: "Scheduled successfully" });
    } catch (error) {
      res
        .status(500)
        .send({ status: "Error", message: `${error} Something went wrong.` });
    }
  },
};
