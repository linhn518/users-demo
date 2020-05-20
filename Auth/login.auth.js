var express = require('express');
var router = express.Router();
var loginCotrollers = require('../Controllers/login');



router.get('/register', loginCotrollers.getRegister);

router.post('/register', loginCotrollers.postRegister);

router.get('/login', loginCotrollers.getLogin);

router.post('/login', loginCotrollers.postLogin);

module.exports= router;
