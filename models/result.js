const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
    pass: {
        type: Boolean,
        required: true,
    },

    totalQuestions: {
        type: Number,
        required: true,
    },

    rightAnswer: {
        type: Number,
        required: true,
    },

    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;