const { default: mongoose } = require("mongoose");
const plans = mongoose.Schema({
    interviewType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    skills: [
        {type: String, required: true}
    ],
    priceId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    crDt: Date,
    upDt: Date,
})
const PlansModel = mongoose.model('plans', plans);
module.exports = {
    PlansModel
}