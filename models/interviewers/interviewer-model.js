const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InterviewerProfile = mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId, $ref: 'users',
		required: true
	},
	personalDetails: {
		firstName: {
			type: String,
		},
		lastName: {
			type: String
		},
		phoneNum: {
			type: String,
		},
		dob: {
			type: String,
		},
		address: {
			type: String,
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
			jobTitle: { type: String },
			organization: { type: String },
			duration: { type: String }
		}
	],
	linkedInUrl: {
		type: String,
	},
	resume: {
		type: String,
	},
	profileType: {
		type: String,
	},
	skills: [
		{type: String}
	],
	crDt: Date,
	upDt: Date,
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
const interviewerSlots = mongoose.model('interviewerSlots', InterviewerSlots);
const interviewerProfile = mongoose.model('interviewerProfile', InterviewerProfile);
module.exports = {
	interviewerSlots,
	interviewerProfile
}