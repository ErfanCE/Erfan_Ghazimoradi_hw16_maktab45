const express = require('express');
const router = express.Router();
const companyRoute = require('./companyRoute.js');
const employeeRoute = require('./employeeRoute.js');


router.use('/', companyRoute);

router.use('/', employeeRoute);


module.exports = router;