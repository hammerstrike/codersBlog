var express   = require('express');
var mongoose  = require('mongoose');
var Users		  = require('../models/user.js');
var creds		  = require('../creds.js');
var crypto    = require('crypto');
var session   = require('express-session');
var sess;
// create hahs
var hash = crypto.createHmac('sha512', creds.cryptoConfig.key);
    hash.update("Amardeep");
var value = hash.digest('hex');

// print result
console.log(value);
var router = express.Router();
var postData  = {};

/* GET users listing. */
router
.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
.post('/login',function(req,res){
  var postData = req.body;
  Users.find({username:postData.username,password:postData.password},function(err,users){
      //console.log(postData.username);
      //console.log(postData.password);
      //console.log(users.length);
      if(users.length){
        sess = req.session;
        sess.username = postData.username;
        console.log(sess);
        res.send({success:true});

      }else{
        res.send({success:false});
      }
  });
})
.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
      res.redirect('/something-wrong');
    }
    else{
      res.redirect('/');
    }
  })
})
.post('/register',function(req,res){
  var postData = req.body;
  Users.find({email:postData.email},function(err,users){
      if(users.length){
        res.send({success:true,msg:'User already exists.'});
      }else{
        new Users({
            email    : postData.email,
            password : postData.password,
    		}).save(function(err){
  				if(err){
  					res.send({success:false,msg:'Something wrong while registring.'});
  				}else{
  					res.send({success:false,msg:'User registered.'});
  				}
  			});
      }
  });
});

module.exports = router;
