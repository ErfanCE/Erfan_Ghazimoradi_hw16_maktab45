const express = require('express');
const router = express.Router();
const companyControll = require('../controllers/companyController.js');


// root
router.get('/', companyControll.getCompanies);

router.get('/company', companyControll.getCompanies);

// query: find companies where registered last year 
router.get('/company/last-year', companyControll.lastYearRegisteration);

// query: update satate and city => 'tehran'
router.get('/company/update-state-city-tehran', companyControll.stateCityTehran);

// CRUD: Create company
router.post('/company/create', companyControll.createCompany);

// CRUD: Read company
router.get('/company/:companyID', companyControll.readCompany);

// CRUD: Update company
router.patch('/company/update/:companyID', companyControll.updateCompany);

// CRUD: Delete company
router.delete('/company/delete/:companyID', companyControll.deleteCompany);


module.exports = router;