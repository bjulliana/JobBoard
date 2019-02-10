var User         = require('../models/User.js');
var passport     = require('passport');
let cookieParser = require('cookie-parser');

module.exports.addUser = function (req, res) {
    let data   = req.body;
    let newJob = new User({
        email     : data.email,
        password  : data.password,
        first_name: data.first_name,
        last_name : data.last_name
    });
    newJob.save(function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(user);
    });
};

module.exports.loginUser = function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, 'Cannot log in', info]);
        }

        req.login(user, err => {
            res.send({
                message: 'Logged in',
                login  : true,
                session: req.session,
                cookie : req.cookies,
                user   : user
            });
        });
    })(req, res, next);
};

module.exports.logoutUser = function (req, res) {
    req.logout();
    console.log('logged out');
    return res.send();
};

module.exports.getCurrentUser = function (req, res) {
    User.find(function (err, user) {
        if (err) {
            return res.json(err);
        }
        return res.json(user);
    });
};

module.exports.getUser = function (req, res) {
    var data = req.params.id;
    User.findOne({_id: data}, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(404).send(err);
        }
        return res.json(user);
    });
};
