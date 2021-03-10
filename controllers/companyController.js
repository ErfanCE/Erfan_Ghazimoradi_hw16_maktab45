const Company = require('../models/companyModel');
const path = require('path');
const persianDate = require('persian-date');


const companyControll = {
    getCompanies: (request, response) => {
        Company.find({}, (err, companies) => {
            if (err) return console.log(err);

            // format register date: persian
            companies.forEach(company => {
                company.persian = new persianDate(company.registerDate).format("LLLL");
            });

            response.render(path.join(__dirname, '../', 'views', 'company.ejs'), {companies});
        });
    },
    createCompany: (request, response) => {
        // check validation
        if (companyValidation(request.body) !== 'valid') return response.send(companyValidation(request.body));

        Company.findOne({ $or: [ { registerNumber: request.body.registerNumber}, { phoneNumber: request.body.phoneNumber }, { companyName: request.body.companyName } ] }, (err, company) => {
            // duplicate check: register number
            if (company && company.registerNumber === request.body.registerNumber) return response.send('duplicate-registerNumber');

            // duplicate check: phone number
            if (company && company.phoneNumber === request.body.phoneNumber) return response.send('duplicate-phoneNumber');

            // duplicate check: company name
            if (company && company.companyName === request.body.companyName) return response.send('duplicate-companyName');


            new Company({
                companyName: request.body.companyName,
                phoneNumber: request.body.phoneNumber,
                state: request.body.state,
                city: request.body.city,
                registerNumber: request.body.registerNumber
            }).save((err, company) => {
                if (err)
                    return response.status(500).json({
                        msg: "Server Error :)",
                        err: err.message
                    });

                return response.send('create');
            });
        });
    },
    readCompany: (request, response) => {
        Company.findOne({_id: request.params.companyID}, (err, company) => {
            if (err) return console.log(err);

            // format register date
            company.persian = new persianDate(company.registerDate).format("LLLL");

            response.render(path.join(__dirname, '../', 'views', 'oneCompany.ejs'), {company: company});
        });
    },
    updateCompany: (request, response) => {
        // company validation
        if (companyValidation(request.body) !== 'valid') return response.send(companyValidation(request.body));

        Company.findOne({ _id: { $ne:  request.params.companyID}, $or: [ { registerNumber: request.body.registerNumber}, { phoneNumber: request.body.phoneNumber }, { companyName: request.body.companyName } ] }, (err, company) => {
            // duplicate check
            if (company && company.registerNumber === request.body.registerNumber) return response.send('duplicate-registerNumber');

            if (company && company.phoneNumber === request.body.phoneNumber) return response.send('duplicate-phoneNumber');

            if (company && company.companyName === request.body.companyName) return response.send('duplicate-companyName');


            Company.findByIdAndUpdate(request.params.companyID, request.body, (err, company) => {
                if (err) return console.log(err);

                return response.send('update');
            });
        });
    },
    deleteCompany: (request, response) => {
        Company.findByIdAndDelete(request.params.companyID, (err, company) => {
            if (err) return console.log(err);

            return response.send('delete');
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

// company validation
function companyValidation(company) {
    const companyName = company.companyName;
    const state = company.state;
    const city = company.city;
    const phoneNumber = company.phoneNumber;
    const registerNumber = company.registerNumber;

    if (companyName === '' || state === '' || city === '' || phoneNumber === '' || registerNumber === '') return 'empty';

    if (companyName.length < 2) return 'companyName-length';

    if (state.length < 2) return 'state-length';

    if (city.length < 2) return 'city-length';

    if (phoneNumber.length !== 11) return 'phoneNumber-length';

    if (registerNumber.length !== 10) return 'registerNumber-length';

    if (isNaN(+phoneNumber)) return 'phoneNumber-type';

    if (isNaN(+registerNumber)) return 'registerNumber-type';

    return 'valid';
}


module.exports = companyControll;