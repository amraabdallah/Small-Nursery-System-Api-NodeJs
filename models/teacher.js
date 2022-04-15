const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50
    },
    image: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});


module.exports = mongoose.model('Teacher', teacherSchema);
