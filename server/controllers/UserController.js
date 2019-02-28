var User         = require('../models/User.js');
var passport     = require('passport');
let cookieParser = require('cookie-parser');

module.exports.addUser = function (req, res, next) {
    let data    = req.body;
    let newUser = new User({
        username  : data.username,
        password  : data.password,
        first_name: data.first_name,
        last_name : data.last_name
    });
    newUser.save(function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).send(err);
            }
            req.login(user, err => {
                res.send({
                    login  : true,
                    session: req.session,
                    cookie : req.cookies,
                    user   : user
                });
            });
        })(req, res, next);
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
