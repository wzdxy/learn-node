var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
// var users = require('./routes/users');
var blog = require('./routes/blog');
var ucenter = require('./routes/ucenter');

var db=require('./db.js');

var app = express();



app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// 对网站首页的访问返回 "Hello World!" 字样
// app.get('/', function (req, res) {
//   console.log('GET request index');
//   let collection=db.collection('blogs');
//   let array=collection.find({}).toArray(function(err,result){
//     console.dir(result);
//   })
//   res.render('index');
// });

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// // /user 节点接受 PUT 请求
// app.put('/user', function (req, res) {
//   res.send('Got a PUT request at /user');
// });

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
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);
// app.set('view engine', 'jade');

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
// app.use('/users', users);
app.use('/blog', blog);
app.use('/ucenter', ucenter);

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
    console.log('listening :'+port);
})