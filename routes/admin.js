const express = require('express');
const { getUsers } = require('../controllers/admin/admin-controller');
const authMiddleWare = require('../middleware/admin-auth');
const router = express.Router();
router.get('/users-list', authMiddleWare,getUsers);
router.put('/interview', authMiddleWare, )
module.exports = router;