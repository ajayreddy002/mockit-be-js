const jwt = require("jsonwebtoken");
const { user } = require("../models/users/user-model");

const config = process.env;

const interviewerAuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.headers["token"];
      if (!authorization) {
          return res.status(401).send({
              message: 'Not authorized to do this action'
          });
      }
      const data = jwt.verify(token, config.TOKEN_KEY);

      const userDetails = await user.findOne({_id: data.id});
      if (!userDetails && userDetails.role !== 'interviewer') {
          return res.status(401).send({
              message: 'Not authorized to do this action'
          });
      }

      next();
  } catch (error) {
      return res.status(500).json({ message: `${JSON.stringify(error)}` });
  }
}
module.exports = interviewerAuthMiddleWare;
