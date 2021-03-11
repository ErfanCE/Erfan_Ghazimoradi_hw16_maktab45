const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    nationalNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    isManager: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('employees', EmployeeSchema);