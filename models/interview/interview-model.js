const { default: mongoose } = require("mongoose");

const interviewModel = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  interviewer: String,
  resume: {
    type: String,
    required: true,
    default: 'to be uploaded'
  },
  userId: String,
  status: { type: String, default: "new" },
  meetingId: {
    type: String,
    required: true
  },
  participants: {
    type: Array,
    required: true
  },
  isHost: {
    type: Boolean,
    default: false
  },
  selectedPlan: {
    type: String
  },
  paymentSessionId: {
    type: String,
    required: true
  },
  crDt: Date,
	upDt: Date,
});
const InterviewModel = mongoose.model("interviews", interviewModel);
module.exports = {
  InterviewModel,
};
