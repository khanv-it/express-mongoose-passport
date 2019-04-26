var express = require('express');
var router = express.Router();

var authContr = require('../controllers/auth.controller');

//RESTful
router.post('/genJWTFromUsernamePass', authContr.genJWTFromUsernamePass);

module.exports = router;