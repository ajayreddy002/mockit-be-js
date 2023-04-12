const jwt = require("jsonwebtoken");
const { user } = require("../models/users/user-model");
module.exports = {
  create: async (req, res) => {
    try {
      await user.create(req.body);
      res
        .status(200)
        .send({ status: "Success", message: "Successfully registered." });
    } catch (err) {
      if (err && err.code === 11000) {
        res
          .status(500)
          .send({ status: "Error", message: "Email already registered." });
      }
    }
  },
  login: async (req, res) => {
    try {
      const loggedInUser = await user.find(
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
};