var express = require("express");
const { create, login, changePassword } = require("../controllers/users/user-controller");
const {
  registrationSchema,loginSchema
} = require("../validations/user-registration-schema");
const {validate} = require('../validations/validate');
const verifyToken = require("../middleware/auth");
const { reschedule } = require("../controllers/admin/admin-controller");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/create", validate(registrationSchema), create);
router.put("/change-password/:id", changePassword);
router.post("/login", validate(loginSchema), login);
router.put('/reshedule', verifyToken, reschedule)
// router.get("/userById/:id", usrerDetailsById);
module.exports = router;
