var express   = require('express');
var mongoose  = require('mongoose');
var moment    = require('moment');
var Posts		  = require('../models/posts.js');
var creds		  = require('../creds.js');
var router    = express.Router();
var dbOptions = {server : {	socketOptions : {keepAlive:1}}};
var pageData  = {};

/*set page data */
pageData.title = "NodeJS Blog";

switch(express().get('env')){
	case 'development' : {
					mongoose.connect(creds.connConfig.development.connStr,dbOptions);
		}
		break;

	case 'production' : {
      mongoose.connect(creds.connConfig.development.connStr,dbOptions);
		}
		break;

	default : {
		console.log('Unknown Environment'+ env);
	}
}


/* GET home page. */
router.get('/', function(req, res, next) {
	sess = req.session;
	//sess.username = "amardeep";
	pageData.username = sess.username;
	if(!sess.username){
		res.render('log-reg', {pageData:pageData});
	}else{
		/* GET all posts */
		Posts.find(function(err,posts){
		  if(posts.length){
		  	//console.log('posts found');
		  	//console.log(posts);
		    pageData.posts = posts;
				res.render('home', {pageData:pageData});
		  	return;
		  }else{
		     //console.log('no posts found');
				 res.render('home', {pageData:pageData});
		  }
		});
	}
});

module.exports = router;
