const Employee = require('../models/employeeModel.js');
const path = require('path');
const persianDate = require('persian-date');

const thisYear = new Date().getFullYear();


const employeeControll = {
    getEmployees: (request, response) => {
        Employee.find({}, (err, employees) => {
            if (err) return response.status(500).json({
                msg: "500: Server internal Error!",
                err: err.message
            });

            // format date of birth (persian), calc age
            employees.forEach(employee => {                
                let age = thisYear - new Date(employee.dateOfBirth).getFullYear();

                employee.age = age;

                employee.persian = new persianDate(employee.dateOfBirth).toLocale('en').format('ddd, DD MMMM YYYY');
            });

            response.render(path.join(__dirname, '../', 'views', 'employeeHome.ejs'), {employees});
        });
    },
    createEmployee: (request, response) => {
        // check validation
        if (employeeValidation(request.body) !== 'valid') return response.send(employeeValidation(request.body));

        Employee.findOne({ nationalNumber: request.body.nationalNumber }, (err, employee) => {
            if (err) return response.status(500).json({
                msg: "nothing found!",
                err: err.message
            });

            // duplicate check: national number
            if (employee && employee.nationalNumber === request.body.nationalNumber) return response.send('duplicate-nationalNumber');


            new Employee({
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                nationalNumber: request.body.nationalNumber,
                gender: request.body.gender,
                dateOfBirth: request.body.dateOfBirth,
                isManager: request.body.isManager
            }).save((err, employee) => {
                if (err)
                    return response.status(500).json({
                        msg: "Server Error :)",
                        err: err.message
                    });

                return response.send('create');
            });
        });
    },
    readEmployee: (request, response) => {
        Employee.findOne({_id: request.params.employeeID}, (err, employee) => {
            if (err) return response.status(500).json({
                msg: "500: Server internal Error!",
                err: err.message
            });

            // format date of birth
            let age = thisYear - new Date(employee.dateOfBirth).getFullYear();

            employee.age = age;
            
            employee.persian = new persianDate(employee.dateOfBirth).toLocale('en').format('YYYY-MM-DD');

            response.render(path.join(__dirname, '../', 'views', 'employeeDetail.ejs'), {employee});
        });
    },
    updateEmployee: (request, response) => {
        // company validation
        if (employeeValidation(request.body) !== 'valid') return response.send(employeeValidation(request.body));

        Employee.findOne({ _id: { $ne:  request.params.employeeID}, nationalNumber: request.body.nationalNumber}, (err, employee) => {
            if (err) return response.status(500).json({
                msg: "nothing found!",
                err: err.message
            });

            // duplicate check
            if (employee && employee.nationalNumber === request.body.nationalNumber) return response.send('duplicate-nationalNumber');


            Employee.findByIdAndUpdate(request.params.employeeID, request.body, (err, employee) => {
                if (err) return response.status(500).json({
                    msg: "500: Server internal Error!",
                    err: err.message
                });

                return response.send('update');
            });
        });
    },
    deleteEmployee: (request, response) => {
        Employee.findByIdAndDelete(request.params.employeeID, (err, employee) => {
            if (err) return response.status(500).json({
                msg: "500: Server internal Error!",
                err: err.message
            });

            return response.send('delete');
        });
    },
    employeeAgeFilter: (request, response) => {
        let twentyYear = new Date(new Date().setFullYear(thisYear - 20));
        let thirtyYear = new Date(new Date().setFullYear(thisYear - 30));

        Employee.find({dateOfBirth: {$lte: twentyYear,$gte: thirtyYear}}, {_id: 0}, (err, employees) => {
            if (err) return response.status(500).json({
                msg: "500: Server internal Error!",
                err: err.message
            });

            employees.forEach(employee => {
                let age = thisYear - new Date(employee.dateOfBirth).getFullYear();
                employee.age = age;
            });

            response.render(path.join(__dirname, '../', 'views', 'employeeHome.ejs'), {employees});
        });
    },
    getMangers: (request, response) => {
        Employee.find({isManager: true}, (err, employees) => {
            if (err) return response.status(500).json({
                msg: "500: Server internal Error!",
                err: err.message
            });

            response.render(path.join(__dirname, '../', 'views', 'employeeHome.ejs'), {employees});
        });
    }
}


// company validation
function employeeValidation(employee) {
    const firstname = employee.firstname;
    const lastname = employee.lastname;
    const gender = employee.gender;
    const nationalNumber = employee.nationalNumber;
    const dateOfBirth = employee.dateOfBirth;
    const isManager = employee.isManager;

    if (firstname === '' || lastname === '' || gender === '' || nationalNumber === '' || dateOfBirth === '' || isManager === '') return 'empty';

    if (firstname.length < 2) return 'firstname-length';

    if (lastname.length < 2) return 'lastname-length';

    if (nationalNumber.length !== 10) return 'nationalNumber-length';

    if (isNaN(+nationalNumber)) return 'nationalNumber-type';

    return 'valid';
}


module.exports = employeeControll;