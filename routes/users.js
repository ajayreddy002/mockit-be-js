var express = require("express");
const { create, login, changePassword, sendResetLink, verifyEmail, getAllInterviewsByUserId, getCountInfo } = require("../controllers/users/user-controller");
const {
  registrationSchema, loginSchema
} = require("../validations/user-registration-schema");
const { validate } = require('../validations/validate');
const verifyToken = require("../middleware/auth");
const { reschedule } = require("../controllers/admin/admin-controller");
var router = express.Router();

/* Prevent unautoruzed access */
router.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the user panel!' });
})
router.post("/create", validate(registrationSchema), create);
router.put("/change-password/:id", changePassword);
router.post("/login", validate(loginSchema), login);
router.put('/reshedule', verifyToken, reschedule);
router.post('/send-pwd-link', sendResetLink);
router.post('/verify-email', verifyEmail)
router.get('/interviews', verifyToken, getAllInterviewsByUserId);
router.get('/count', verifyToken, getCountInfo)
module.exports = router;
