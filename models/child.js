const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection('mongodb://localhost:27017/nursery');
autoIncrement.initialize(connection);

const childSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    level: {
        type: String,
        required: true,
        enum: ["PrKG", "KG1", "KG2"],
        default: "KG1"
    },
    address: {
        city: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        street: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        building: {
            type: Number,
            required: true,
            minlength: 3,
            maxlength: 50
        }
    },
});

childSchema.plugin(autoIncrement.plugin, {
    model: 'Child',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('Child', childSchema);
