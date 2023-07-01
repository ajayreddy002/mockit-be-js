const express = require('express');
const { getUsers, updateInterview } = require('../controllers/admin/admin-controller');
const authMiddleWare = require('../middleware/admin-auth');
const router = express.Router();
router.get('/users-list', authMiddleWare,getUsers);
router.put('/interview', authMiddleWare, updateInterview)
router.put('/reshedule', authMiddleWare, updateInterview)
module.exports = router;