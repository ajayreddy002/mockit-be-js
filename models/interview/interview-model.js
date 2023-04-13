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
  skills: Array,
  interviewer: String,
  resume: {
    type: String,
    required: true,
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
    type: Boolean
  },
  selectedPlan: {
    type: String
  }
});
const InterviewModel = mongoose.model("interviews", interviewModel);
module.exports = {
  InterviewModel,
};
