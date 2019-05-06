var express = require('express');
var router = express.Router();
const cel = require('connect-ensure-login');

/* GET home page. */
router.get('/', 
  function(req, res, next) {
    res.render('home', { title: 'Express', user: req.user });
  }
);

router.get('/profile',
  cel.ensureLoggedIn({ redirectTo: '/auth/login' }),
  function(req, res, next) {
    res.render('profile', { user: req.user });
  }
);

module.exports = router;
