var db = require('../db');
const shortid = require('shortid');


module.exports.index = function(req, res){
    res.render('index',{
      users: db.get('users').value()
    });
  };

module.exports.search = function(req, res){
    var q= req.query.q;
    var resultSearch = db.get('users').value().filter(function(user){
      return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1 
    });
    res.render('index', {
      users: resultSearch
    });
};

module.exports.getCreate = function(req, res){
  res.render('create');
};

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    var errors = [];
    if(!req.body.name){
        errors.push('Name is require!');
    }
    if(!req.body.age){
        errors.push('Age is requied!');
    }
    if(!req.body.phone){
        errors.push('Phone is requied!s');
    }
    if(errors.length){
      res.render('create', {
        errors: errors,
        values: req.body
      });
      return;
    }
    db.get('users').push(req.body).write();
    res.redirect('/library');
};

module.exports.viewId = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();
    res.render('view',{
      user: user 
    });  
};
  