const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema ({
    name : {
        type: String, 
        required: true, 
        trim: true,
        minlength: 1
    },
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }, 
    done: {
        type: Boolean,
        default: false,
        required: true
    }
});

const TODO = mongoose.model('TODO', todoSchema);

module.exports = TODO;