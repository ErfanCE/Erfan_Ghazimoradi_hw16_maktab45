const mongoose = require('mongoose');


const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 11,
        maxlength: 11,
        trim: true
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    registerNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    registerDate: {
        type: Date,
        default: Date.now,
        trim: true
    }
});


module.exports = mongoose.model('companies', CompanySchema);