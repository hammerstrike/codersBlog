var express           = require('express');
var path              = require('path');
var favicon           = require('serve-favicon');
var logger            = require('morgan');
var expressValidator  = require('express-validator');
var cookieParser      = require('cookie-parser');
var session           = require('express-session');
var creds		          = require('./creds.js');
var bodyParser        = require('body-parser');
var handlebar         = require('express3-handlebars').create({defaultLayout:'master'});
//var mongo           = require('mongodb');
//var db              = require('monk')('localhost/nodeBlog');
//var db              = require('monk')('mongodb://localhost:27017/nodeBlog');
//var mongoOp         = require("./models/mongo");
var multer            = require('multer');
var moment            = require('moment');
var uploads           = multer({dest:'./public/img/uploads'});
var flash             = require('connect-flash');
var routes            = require('./routes/index');
var users             = require('./routes/users');
var post              = require('./routes/post');

var app               = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('handlebar',handlebar.engine);
app.set('view engine','handlebar');

//handle file upload and multipart data
//app.use();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(creds.cookieConfig.secret));

//express session
app.use(session(creds.sessionConfig));

//express validator
app.use(expressValidator({
  errorFormatter : function(param,msg,value){
    var namespace = param.split('.'),
        root      = namespace.shift(),
        formParam = root;

        while (namespace.length) {
          formParam += '['+namespace.shift()+']';
        }
        return {
          param : formParam,
          msg   : msg,
          value : value
        };
  }
}));

app.use(express.static(path.join(__dirname, 'public')));
//connect flash
app.use(flash());
app.use(function(req,res,next){
  res.locals.messages = require('express-messages')(req,res);
  next();
});
//make db accessible to routes
/*app.use(function(req,res,next){
  req.db = db;
  next();
});*/

app.use('/', routes);
app.use('/users', users);
app.use('/post',post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404',{pageData:err});
  next(err);
});

// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    error:err,
    message: err.message
  });
});


module.exports = app;
