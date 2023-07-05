const mongoose = require("mongoose");

const userSchema = new mongoose.default.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  userRole: {
    type: String,
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: Number,
    required: true
  },
  crDt: Date,
	upDt: Date,
});
const UserSchema = mongoose.model('users',userSchema);
module.exports = {
  user: UserSchema,
};
