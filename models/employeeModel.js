const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    nationalNumber: {
        type: Number,
        required: true,
        unique: true,
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