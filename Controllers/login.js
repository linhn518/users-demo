var db = require('../db');
const shortid = require('shortid');
var requireLogin = require('../Middlewares/requireLogin');

module.exports.getRegister = function(req, res){
    res.render('register');
};

module.exports.postRegister = function(req, res){
    req.body.id = shortid.generate();
    var errors =[];
    if(!req.body.email){
        errors.push('Email is required!');
    }
    if(!req.body.password){
        errors.push('Password is required!');
    }
    if(errors.length){
        res.render('register',{
            errors: errors,
            values: req.body
        });
        return;
    }
    db.get('account').push(req.body).write();
    res.redirect('/auth/login');
};

module.exports.getLogin = function(req, res){
    res.render('login');
};

module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var account = db.get('account').find({email: email}).value();
    var errors = [];
    
    if(!account){
        errors.push('Email has not exist!');
        res.render('login',{
            errors: errors,
            values: req.body
        });
        return;
    }
    if(password !== account.password ){
        errors.push('Password wrong!');
        res.render('login',{
            errors: errors,
            values: req.body
        });
        return;
    }
    res.cookie('useId', account.id, {
        signed: true
    });
    res.redirect('/library');
};
