const express = require('express');
const router = express.Router();
const companyControll = require('../controllers/companyController.js');


router.get('/', companyControll.getCompanies);

router.get('/company', companyControll.getCompanies);

router.get('/company/last-year', companyControll.lastYearRegisteration);

router.get('/company/update-state-city-tehran', companyControll.stateCityTehran);


module.exports = router;