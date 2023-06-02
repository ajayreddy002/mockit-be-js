const { InterviewModel } = require('../../models/interview/interview-model');
const { getAllInterviews } = require('../../services/interview-service');

module.exports = {
  schedule: async (req, res) => {
    try {
      const { _id } = await InterviewModel.create(req.body);
      res
        .status(200)
        .send({ status: 'Success', message: 'Scheduled successfully' });
    } catch (error) {
      res
        .status(500)
        .send({ status: 'Error', message: `${error} Something went wrong.` });
    }
  },
  getAllMeetingSolts: async (req, res) => {
    try {
      const slots = await getAllInterviews()
      res.status(200).send({ status: 'Success', slots: slots });
    } catch (error) {
      res
        .status(500)
        .send({ status: 'Error', message: `${error} Something went wrong.` });
    }
  },
  getInterviewsByUserIdAndStatus: async (req, res) => {
    if (req.params.id) {
      try {
        const interviews = await InterviewModel.find({
          userId: req.params.id,
          status: req.params.status ? req.params.status : 'New',
        }, "-meetingId -participants").sort({ date: 1 });
        res.status(200).send({ status: 'Success', interviews: interviews });
      } catch (error) {
        res
          .status(500)
          .send({ status: 'Error', message: `${error} Something went wrong.` });
      }
    } else {
      res.status(400).send({ status: 'Error', message: `User id is missing` });
    }
  },
};
