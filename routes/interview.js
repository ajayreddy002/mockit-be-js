const express = require('express');
const {
  schedule,
  getAllMeetingSolts,
  getInterviewsByUserIdAndStatus,
} = require('../controllers/interviews/interview-controller');
const sendMail = require('../helpers/email-service');
const verifyToken = require('../middleware/auth');
const {
  interviewScheduleSchema,
} = require('../validations/interview-schedule-schema');
const { validate } = require('../validations/validate');
const router = express.Router();

router.post(
  '/schedule',
  verifyToken,
  validate(interviewScheduleSchema),
  schedule
);
router.get('/get-slots', verifyToken, getAllMeetingSolts);
router.post('/send', sendMail);
router.get(
  '/interviews/:id/:status',
  verifyToken,
  getInterviewsByUserIdAndStatus
);
module.exports = router;
