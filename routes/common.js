var express = require('express');
var commonRouter = express.Router();
const { validate } = require('../validations/validate');
const { plansSchema } = require('../validations/plans-schema');
const { getPlans, createPlan } = require('../controllers/common/plan-controller');
commonRouter.post('/plan', validate(plansSchema), createPlan);
commonRouter.get('/plan', getPlans)
module.exports = commonRouter;