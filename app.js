const express = require('express');
const app = express();
const path = require('path');
const db = require('./db_wrapper');
const bodyParser = require('body-parser');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const port = process.env.PORT || 8080;
const FacebookCallbackURL = 'http://localhost:' + port + '/auth/facebook/callback'

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: FacebookCallbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// serialize and deserilize
passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user){
        done(err, obj);
    })
});


const DIST_DIR = path.join(__dirname, 'frontend/public');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())

const api = require('./routes/api')(db);
app.use('/', api);

app.use(express.static(DIST_DIR));

// app.get('/') will mess up react-router settings
app.get('*', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});


app.db = db;
module.exports = app;
