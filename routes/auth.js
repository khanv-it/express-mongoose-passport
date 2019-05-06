var express = require('express');
var router = express.Router();
var passport = require('passport');

var authContr = require('../controllers/auth.controller');

//passport-jwt router
router.post('/genJWTFromUsernamePass', authContr.genJWTFromUsernamePass);

//passport-local router
router.get('/login', authContr.getLogin);
router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login' }), authContr.postLogin);//NOTE: /auth/login
router.get('/logout', authContr.getLogout);

module.exports = router;