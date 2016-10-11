var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var db=require('./db.js');

var app = express();


// var db = require('mongoskin').db('localhost:27017/animals');
// var db = require('mongodb').Db('localhost:27017/test');

// db.collection('users').find().toArray(function(err, result) {
//   if (err) throw err;
//   console.log(result);
// });


app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  // res.send('Hello World!');
  // res.render('index',{title:'Hey',message:'Hello there!'});
  console.log();
  res.send('hello');
  // res.render('index',{title:req.query.t,message:req.query.m});
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.get('/user', function (req, res) {
  res.send('Got a GET request at /user');
});

app.get('/next', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
// app.engine('.html',require('ejs').__express);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static',express.static('public'));
app.use('/static',express.static('static'));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
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
    message: err.message,
    error: {}
  });
});


module.exports = app;


var server=app.listen(3000,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('listening '+host+':'+port);
})