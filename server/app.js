let createError   = require('http-errors'),
    express       = require('express'),
    path          = require('path'),
    cookieParser  = require('cookie-parser'),
    logger        = require('morgan'),
    bodyParser    = require('body-parser'),
    indexRouter   = require('./routes/index'),
    usersRouter   = require('./routes/users'),
    mongoose      = require('mongoose'),
    cors          = require('cors'),
    http          = require('http'),
    app           = express(),
    server        = app.listen(3000),
    index         = require('./routes/index'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    res.render('error');
});

module.exports = app;
