const mongoose = require('mongoose');
const InterviewerProfile = mongoose.Schema({
	interviewerId: {
		type: String,
		required: true
	},
	personalDetails: {
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String
		},
		email: {
			type: String,
			required: true
		},
		phoneNum: {
			type: String,
			required: true
		},
		dob: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
	},
	eduQualifications: [
		{
			qualification: { type: String },
			institution: { type: String },
			yearOfPass: { type: String },
			dur: { type: String },
		}
	],
	experience: [
		{
			jobTit: { type: String },
			organization: { type: String },
			yearsOfExpereince: { type: String },
			jobSummary: { type: String },
		}
	],
	linkedInUrl: {
		type: String,
		required: true
	},
	resume: {
		type: String,
		required: true
	},
	iterviewType: {
		type: String,
		required: true
	}
});
const InterviewerSlots = mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	slots: [
		{
			startTime: {
				type: String,
				required: true,
			},
			endTime: {
				type: String,
				required: true,
			},
		}
	],
	interviewerId: {
		type: String,
		required: true,
	},
	crDt: Date,
	upDt: Date,
});
const interviewerSlots = mongoose.model('intervieweSlots', InterviewerSlots);
const interviewerProfile = mongoose.model('intervieweProfile', InterviewerProfile);
module.exports = {
	interviewerSlots,
	interviewerProfile
}