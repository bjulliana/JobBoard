let mongoose = require('mongoose');
let plm      = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username  : {type: String, required: [true, 'Username is Required']},
    first_name: {type: String, required: [true, 'First Name is Required']},
    last_name : {type: String, required: [true, 'Last Name is Required']},
    password  : {type: String, required: [true, 'Password is Required']}
});

var options = ({
    missingUserNameError: 'Wrong Username, try again',
    missingPasswordError: 'Wrong Password'
});

userSchema.plugin(plm, options);

module.exports = mongoose.model('User', userSchema);
