const express = require('express');
const router = express.Router();
const employeeControll = require('../controllers/employeeController.js');


router.get('/employee', employeeControll.getEmployees);

router.get('/employee/age-20-30', employeeControll.employeeAgeFilter);

router.get('/employee/manager', employeeControll.getMangers);

// CRUD: Create employee
router.post('/employee/create', employeeControll.createEmployee);

// CRUD: Read employee
router.get('/employee/:employeeID', employeeControll.readEmployee);

// CRUD: Update employee
router.patch('/employee/update/:employeeID', employeeControll.updateEmployee);

// CRUD: Delete employee
router.delete('/employee/delete/:employeeID', employeeControll.deleteEmployee);


module.exports = router;