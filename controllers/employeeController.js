const Employee = require('../models/employeeModel.js');
const path = require('path');

new Employee({
    firstname: 'erfan',
    lastname: 'ghazimoradi',
    nationalNumber: '0250383848',
    gender: 'male',
    dateOfBirth: new Date('2000-05-18')
}).save();


const employeeControll = {
    getEmployees: (request, response) => {
        Employee.find({}, (err, employees) => {
            if (err) return console.log(err);

            response.render(path.join(__dirname, '../', 'views', 'employee.ejs'), {employees: employees});
        });
    }
}


module.exports = employeeControll;