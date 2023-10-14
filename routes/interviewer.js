const express = require('express');
const { slots, buildProfile } = require('../controllers/interviewer/interviewer-controller');
const interviewerAuthMiddleWare = require('../middleware/interviewer-auth');
const interviewerRouter = express.Router();

/* Prevent unautoruzed access */
interviewerRouter.get('/', interviewerAuthMiddleWare, (req, res) => {
    res.json({ message: 'Welcome to the interviewer panel!' });
})
interviewerRouter.post('/profile/:type', interviewerAuthMiddleWare, buildProfile)
interviewerRouter.post('/slots/:id', interviewerAuthMiddleWare, slots);
module.exports = interviewerRouter;