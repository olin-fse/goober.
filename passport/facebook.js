const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const FacebookCallbackURL = 'http://localhost:8080/login/facebook/callback'

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: FacebookCallbackURL,
        profileFields:['id','name', 'displayName','emails']
    },
    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

        console.log('profile', profile);

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({
                'fb.id': profile.id
            }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.fb.id = profile.id; // set the users facebook id
                    newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user
                    newUser.fb.firstName  = profile.name.givenName;
	                newUser.fb.lastName = profile.name.familyName;
                    newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
};
