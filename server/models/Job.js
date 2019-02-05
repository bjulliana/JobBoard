var mongoose  = require('mongoose');
var JobSchema = new mongoose.Schema({
    title      : {type: String, required: ['Job Title is Required']},
    category   : {type: String, required: ['Job Category is Required']},
    type       : {type: String, required: ['Job Type is Required']},
    city       : {type: String, required: ['Job City is Required']},
    province   : {type: String, required: ['Job Province is Required']},
    description: {type: String, required: ['Job Description is Required']}
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);
