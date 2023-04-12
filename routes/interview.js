const express = require("express");
const { schedule } = require("../controllers/interviews/interview-controller");
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
module.exports = router;