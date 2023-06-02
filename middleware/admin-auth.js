const jwt = require("jsonwebtoken");
const { user } = require("../models/users/user-model");

const config = process.env;

const verifyIsAdmin = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["token"];

  if (!token) {
    return res.status(403).send("Not authorized to access");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    const userDetails = user.findOne({_id: decoded.id}, "name userRole")
    if(userDetails.userRole === decoded.role){
      next();
    } else {
      return res.status(403).send("Not authorized to access");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyIsAdmin;
