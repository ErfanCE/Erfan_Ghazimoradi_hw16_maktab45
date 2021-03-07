const express = require('express');
const router = express.Router();
const employeeControll = require('../controllers/employeeController.js');


router.get('/employee', employeeControll.getEmployees);


module.exports = router;