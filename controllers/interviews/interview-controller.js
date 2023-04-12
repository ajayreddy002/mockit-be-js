const { InterviewModel } = require('../../models/interview/interview-model');

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
      const slots = await InterviewModel.find(
        {
          date: {
            $gte: new Date().setHours(00, 00, 00),
            // $lt: new Date().setHours(23, 59, 59),
          },
        },
        'date startTime endTime'
      );
      res.status(200).send({ status: 'Success', slots: slots });
    } catch (error) {
      res
        .status(500)
        .send({ status: 'Error', message: `${error} Something went wrong.` });
    }
  },
};
