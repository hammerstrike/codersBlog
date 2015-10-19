var express   = require('express');
var mongoose  = require('mongoose');
var moment    = require('moment');
var Posts		  = require('../models/posts.js');
//var creds		  = require('creds.js');
var router    = express.Router();
var dbOptions = {server : {	socketOptions : {keepAlive:1}}};
var pageData  = {};
/*set page data */
pageData.title = "NodeJS Blog";

switch(express().get('env')){
	case 'development' : {
			//var connString = "mongodb://localhost:27017/nodeBlog";
			var connString = "mongodb://admin:admin@ds055872.mongolab.com:55872/codersblog";
			mongoose.connect(connString,dbOptions);
		}
		break;

	case 'production' : {
      var connString = "mongodb://admin:admin@ds055872.mongolab.com:55872/codersblog";
      mongoose.connect(connString,dbOptions);
		}
		break;

	default : {
		console.log('Unknown Environment'+ env);
	}
}


/* GET home page. */
router.get('/', function(req, res, next) {
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


});

module.exports = router;
