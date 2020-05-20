var db = require('../db');

module.exports.require = function(req, res, next){
    
    if(!req.signedCookies.useId){
        res.redirect('/auth/login');
        return;
    }
    
    var account = db.get('account').find({id: req.signedCookies.useId}).value();
    
    if(!account){
        res.redirect('auth/login');
        return;
    }

    res.locals.account = account;
    next();
};