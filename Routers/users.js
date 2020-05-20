var express = require('express');
var router = express.Router();

var controllers = require('../Controllers/users');
var requireLogin = require('../Middlewares/requireLogin');

router.get('/', controllers.index );
  
router.get('/search', controllers.search );
  
router.get('/create', controllers.getCreate );

router.get('/:id', controllers.viewId );
  
router.post('/create', controllers.postCreate );

  
  
module.exports = router;