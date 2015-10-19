var express = require('express');
var mongoose  = require('mongoose');
var Posts		  = require('../models/posts.js');
var Categories= require('../models/categories.js');
var postData  = {};
/*set page data */
postData.pagetitle = "NodeJS Blog | Post";
var router = express.Router();

/* GET users listing. */
router
.get('/addPost', function(req, res) {  
  Categories.find(function(err,cats){
      //console.log(cats);
      res.render('addPost',{categories:cats});
  });
})
.post('/addPost',function(req,res){
    var postData = req.body;

    Posts.find({},function(err,post){

        len = post.length;
        var newId = (len==0) ? 1 : (post[len-1]).id + 1;
        new Posts({
            id          : newId,
            title       : postData.postTitle,
            author      : postData.postAuthor,
            shortle     : postData.postShortle,
            description : postData.postDesc,
      			category    : postData.postCat,
            date        : new Date()
    		}).save(function(err){
  				if(err){
  					res.send({success:false});
  				}else{
  					console.log('New post added');
  					res.send({success:true});
  				}
  			});
    });

    /*new Posts({
        id          : newId,
        title       : postData.postTitle,
        author      : postData.postAuthor,
        shortle     : postData.postShortle,
        description : postData.postDesc,
  			category    : postData.postCat,
        date        : new Date()
		}).save();*/


})
.get('/:id',function(req,res){
  /* GET all posts */
  Posts.find({"id":req.params.id},function(err,post){
    if(post.length){
    	//console.log('post found');
    	//console.log(post);
      postData.post = post[0];
      res.render('post',{postData:postData.post});
    }else{
       //console.log('no posts found');
       res.render('no-post');
    }
  });
});

module.exports = router;
