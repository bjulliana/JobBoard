let createError    = require('http-errors'),
    express        = require('express'),
    path           = require('path'),
    cookieParser   = require('cookie-parser'),
    cookieSession  = require('cookie-session'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    indexRouter    = require('./routes/index'),
    usersRouter    = require('./routes/users'),
    User           = require('./models/User.js'),
    mongoose       = require('mongoose'),
    cors           = require('cors'),
    http           = require('http'),
    app            = express(),
    server         = app.listen(3000),
    index          = require('./routes/index'),
    expressSession = require('express-session'),
    passport       = require('passport'),
    flash          = require('connect-flash'),
    LocalStrategy  = require('passport-local').Strategy;

mongoose.connect('mongodb://jobuser:job1q2w@ds115963.mlab.com:15963/job_board', {useNewUrlParser: true},
    () => {
        console.log('Database connection is successful');
    },
    err => {
        console.log('Error when connecting to the database' + err);
    }
);

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({secret: 'PurpleElephantSecret', resave: false, saveUninitialized: false, key: 'sid'}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//passport.use(new LocalStrategy(User.authenticate()));

passport.use(new LocalStrategy(
    //{
    //    usernameField: 'email',
    //    passwordField: 'password'
    //},
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (user.password !== password) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error  : err
    });
});

module.exports = app;
