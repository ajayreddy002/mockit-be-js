const express = require('express');
const { slots } = require('../controllers/interviewer/interviewer-controller');
const verifyToken = require('../middleware/auth');
const interviewerRouter = express.Router();
interviewerRouter.post('/slots/:id', verifyToken, slots);
module.exports = interviewerRouter;