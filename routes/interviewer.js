const express = require('express');
const { slots } = require('../controllers/interviewer/interviewer-controller');
const interviewerAuthMiddleWare = require('../middleware/interviewer-auth');
const interviewerRouter = express.Router();
interviewerRouter.post('/slots/:id', interviewerAuthMiddleWare, slots);
module.exports = interviewerRouter;