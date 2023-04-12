const express = require("express");
const { schedule, getAllMeetingSolts } = require("../controllers/interviews/interview-controller");
const verifyToken = require("../middleware/auth");
const {
  interviewScheduleSchema,
} = require("../validations/interview-schedule-schema");
const { validate } = require("../validations/validate");
const router = express.Router();

router.post(
  "/schedule",
  verifyToken,
  validate(interviewScheduleSchema),
  schedule
);
router.get('/get-slots', verifyToken, getAllMeetingSolts)
module.exports = router;