const mongoose = require('mongoose');

//create class schema
const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    children: [{
        id:{
            type: Number,
            ref: 'Child'
        }
    }]
});

module.exports = mongoose.model('Class', classSchema);