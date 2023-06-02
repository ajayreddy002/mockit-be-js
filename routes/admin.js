const express = require('express');
const { getAllUsers } = require('../controllers/admin/admin-controller');
const verifyIsAdmin = require('../middleware/admin-auth');
const router = express.Router();
router.get('/users-list', verifyIsAdmin,getAllUsers);
module.exports = router;