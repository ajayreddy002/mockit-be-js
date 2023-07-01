const mongoose = require('mongoose');
const Payments = mongoose.Schema({
    trnasactionId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})