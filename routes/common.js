var express = require('express');
var commonRouter = express.Router();
const { validate } = require('../validations/validate');
const { plansSchema } = require('../validations/plans-schema');
commonRouter.post('/plans', validate(plansSchema));
module.exports = commonRouter;