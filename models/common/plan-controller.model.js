const { default: mongoose } = require("mongoose");
const plans = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    objective: {
        type: Boolean,
        required: true 
    },
    programming: {
        type: Boolean,
        required: true 
    },
    skills: [
        {type: String, required: true}
    ],
    image: {
        type: String
    },
    crDt: Date,
	upDt: Date,
})
const PlansModel = mongoose.model('plans', plans);
module.exports = {
    PlansModel
}