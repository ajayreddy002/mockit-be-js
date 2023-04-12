var express = require("express");
const { create, login } = require("../controllers/user-controller");
const {
  registrationSchema,loginSchema
} = require("../validations/user-registration-schema");
const {validate} = require('../validations/validate')
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/create", validate(registrationSchema), create);
router.post("/login", validate(loginSchema), login);
module.exports = router;
