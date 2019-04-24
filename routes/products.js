var express = require('express');
var router = express.Router();

var prodContr = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', prodContr.test);

//RESTful
router.post('/create', prodContr.create);

router.get('/:id', prodContr.details);

router.put('/:id/update', prodContr.update);

router.delete('/:id/delete', prodContr.delete);

module.exports = router;
