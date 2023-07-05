const express = require('express');
const {
  schedule,
  getAllMeetingSolts,
  getInterviewsByUserIdAndStatus,
  createPayment,
  getPaymentSessionDetails,
} = require('../controllers/interviews/interview-controller');
const sendMail = require('../helpers/email-service');
const verifyToken = require('../middleware/auth');
const {
  interviewScheduleSchema,
} = require('../validations/interview-schedule-schema');
const { validate } = require('../validations/validate');
const { sendOtpToEmail } = require('../services/email-service');
const router = express.Router();

router.post(
  '/schedule',
  verifyToken,
  validate(interviewScheduleSchema),
  schedule
);
router.get('/get-slots', verifyToken, getAllMeetingSolts);
router.get(
  '/interviews/:id/:status',
  verifyToken,
  getInterviewsByUserIdAndStatus
);
router.post('/checkout', verifyToken, createPayment);
router.get('/payment-status', verifyToken, getPaymentSessionDetails)
module.exports = router;
