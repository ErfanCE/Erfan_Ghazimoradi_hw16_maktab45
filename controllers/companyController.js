const Company = require('../models/companyModel');
const path = require('path');
const persianDate = require('persian-date');


// new Company ({
//     companyName: 'abrarvan',
//     phoneNumber: '09121345584',
//     state: 'fars',
//     city: 'shiraz',
//     registerNumber: '1223456789',
//     registerDate: '2017-06-08T18:08:14.021Z'
// }).save();

const companyControll = {
    getCompanies: (request, response) => {
        Company.find({}, (err, companies) => {
            if (err) return console.log(err);

            // format register date: persian
            companies.forEach(company => {
                company.persian = new persianDate(company.registerDate).format("LLLL");
            });

            response.render(path.join(__dirname, '../', 'views', 'company.ejs'), {companies: companies});
        });
    },
    lastYearRegisteration: (request, response) => {
        const thisYear = new Date();
        const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));

        Company.find({registerDate: {$lt: thisYear, $gt: lastYear}}, (err, companies) => {
            if (err) return console.log(err);

            companies.forEach(company => {
                company.persian = new persianDate(company.registerDate).format("LLLL");
            });

            response.render(path.join(__dirname, '../', 'views', 'query.ejs'), {lastYear: companies});
        });
    },
    stateCityTehran: (request, response) => {
        Company.updateMany({}, {$set: {state: 'tehran', city: 'tehran'}}, (err, result) => {
            if(err) return console.log(err);

            console.log(result);
        });
    }
}


module.exports = companyControll;