const jwt = require("jsonwebtoken");
const { user } = require("../models/users/user-model");

const config = process.env;

const interviewerAuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.headers["token"];
      if (!token) {
          return res.status(401).send({
              message: 'Not authorized to do this action'
          });
      }
      const data = jwt.verify(token, config.TOKEN_KEY);
      const userDetails = await user.findOne({_id: data.user_id});
      if (!userDetails && userDetails.userRole !== 'interviewer') {
          return res.status(401).send({
              message: 'Not authorized to do this action'
          });
      }

      next();
  } catch (error) {
    console.log(error)
      return res.status(500).json({ message: `${JSON.stringify(error)}` });
  }
}
module.exports = interviewerAuthMiddleWare;
