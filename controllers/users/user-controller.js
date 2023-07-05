const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { user } = require("../../models/users/user-model");
const { resetPasswordMail, sendOtpToEmail } = require("../../services/email-service");

module.exports = {
  create: async (req, res) => {
    try {
      if (req.body.userRole.toLowerCase() === 'admin') {
        res
          .status(400)
          .send({ status: "Error", message: "Not allowed" });
      } else {
        const n = crypto.randomInt(0, 1000000);
        crypto.randomInt(0, 1000000, (err, n) => {
          if (err) throw err;
        });
        const verificationCode = n.toString().padStart(6, "0");
        const formData = { ...req.body, otp: verificationCode }
        await user.create(formData);
        await sendOtpToEmail(req.body.email, verificationCode)
        res
          .status(200)
          .send({ status: "Success", message: "Successfully registered." });
      }
    } catch (err) {
      if (err && err.code === 11000) {
        res
          .status(500)
          .send({ status: "Error", message: "User already registered." });
      }
    }
  },
  login: async (req, res) => {
    try {
      const loggedInUser = await user.findOne(
        { email: req.body.email, password: req.body.password },
        "name email phoneNumber userRole"
      );
      const token = jwt.sign(
        { user_id: loggedInUser._id, email: loggedInUser.email, role: loggedInUser.userRole },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).send({ token: token });
    } catch (error) {
      res.status(403).send({
        status: "Error",
        message: "Username and password are incorrect",
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      if (req.body.otp && req.body.email) {
        const userData = await user.findOne({ otp: req.body.otp, email: req.body.email });
        if (userData._id) {
          res.status(200).send({ status: 'Success', message: 'Email verified successfully' });
        } else {
          res.status(403).send({
            status: "Error",
            message: "Not authorized",
          });
        }
      } else {
        res.status(403).send({
          status: "Error",
          message: "Not authorized",
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ status: "Error", message: "User not found" });
    }
  },
  sendResetLink: async (req, res) => {
    try {
      if (req.body.email) {
        const userData = await user.findOne({ email: req.body.email });
        if (userData._id) {
          const token = jwt.sign
            ({ user_id: userData._id },
              process.env.TOKEN_KEY,
              {
                expiresIn: "30m",
              })
          await resetPasswordMail(req.body.email, token);
          res.status(200).send({ status: 'Success', message: 'Reset password link has sent to mail' })
        } else {
          res
            .status(204)
            .send({ status: "Error", message: "User not found" });
        }
      } else {
        res
          .status(400)
          .send({ status: "Error", message: "Email is required" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ status: "Error", message: "User not found" });
    }
  },
  changePassword: async (req, res) => {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      await user.findByIdAndUpdate(decoded.user_id, { password: req.body.password });
      res
        .status(200)
        .send({ status: "Success", message: "Password updated successfully" });
    } catch (err) {
      res
        .status(500)
        .send({ status: "Error", message: "User not found" });
    }
  }
};
