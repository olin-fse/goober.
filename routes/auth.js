const path = require('path');
const express = require('express');
var router = express.Router();

module.exports = function(db, passport) {
    router.route('/login/facebook')
        .get(passport.authenticate('facebook', {scope:"email"}));
    router.route('/login/facebook/callback')
        .get(passport.authenticate('facebook', {successRedirect:'/', failureRedirect:'/login'}));
    router.route('/logout')
        .get(logout);

    function logout(req, res){
        console.log("logged out")
        req.logout();
        res.redirect('/');
    }
    return router;
}
