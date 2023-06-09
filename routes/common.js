var express = require('express');
var commonRouter = express.Router();
const { validate } = require('../validations/validate');
const { plansSchema } = require('../validations/plans-schema');
const { getPlans, createPlan, deletePlan, updatePlan } = require('../controllers/common/plan-controller');
const authMiddleWare = require('../middleware/admin-auth');
const verifyToken = require('../middleware/auth');
commonRouter.post('/plan', validate(plansSchema),authMiddleWare,createPlan);
commonRouter.get('/plan', verifyToken,getPlans);
commonRouter.delete('/plan/:id', authMiddleWare,deletePlan);
commonRouter.put('/plan/:id', validate(plansSchema),authMiddleWare,updatePlan);
module.exports = commonRouter;