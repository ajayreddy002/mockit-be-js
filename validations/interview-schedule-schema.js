const yup = require("yup");
const interviewScheduleSchema = yup.object({
  body: yup.object({
    date: yup
      .date()
      .typeError("The value must be a date (YYYY-MM-DD)")
      .required("This field is required"),
    startTime: yup.string().required("Please select start time"),
    endTime: yup.string().required("Please select end time"),
    skills: yup.array(),
    resume: yup.string().required("Please upload resume"),
    userId: yup.string().required("User id is required"),
    meetingId: yup.string().required("Meeting id is required"),
    participants: yup.array().min(1, "Atleaset one particpant is required"),
  }),
});
module.exports = {
  interviewScheduleSchema,
};
