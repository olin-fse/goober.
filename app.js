const express = require('express');
const app = express();

// npm dependencies
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// Database
const db = require('./db_wrapper');

// Parsing
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser());

// Session
app.use(expressSession({secret: 'mySecretKey',
                        saveUninitialized:false,
                        resave:false}));
// Passport
app.use(passport.initialize());
app.use(passport.session());

const initPassport = require('./passport/init');
initPassport(passport);


// Routes
const isAuthenticated = function (req, res, next) {
        // if user is authenticated in the session, call the next() to call the next request handler
        // Passport adds this method to request object. A middleware is allowed to add properties to
        // request and response objects
        if (req.isAuthenticated())
            return next();
        // if the user is not authenticated then redirect him to the login page
        console.log("not logged in");
        res.redirect('/');
}

const auth = require('./routes/auth')(db, passport);
app.use('/', auth);
const api = require('./routes/api')(db, isAuthenticated);
app.use('/', api);

// Static dir
const DIST_DIR = path.join(__dirname, 'frontend/public');
app.use(express.static(DIST_DIR));
// app.get('/') will mess up react-router settings
app.get('*', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});


app.db = db;
module.exports = app;
