var express = require('express');
var router = express.Router();
// var user=require('d:/data/db').user;

var Db = require('mongodb').Db,
    Server = require('mongodb').Server;
var db = new Db('test', new Server('localhost', 27017));
var user = db.collection('users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res){
  res.render('login',{title:'login'});
})

router.post('/ucenter',function(req,res){
  var query={name:req.body.name,pw:req.body.password};
  (function(){
    user.count(query,function(err,doc){
      if(doc==1){
        console.log(query.name+':登录');
        res.render('ucenter',{title:'ucenter'});
      }else{
        console.log(query.name+':失败');
        res.redirect('/');
      }
    })
  })(query);
})

module.exports = router;
