var express = require('express');
var router = express.Router();
var db=require('../db.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/',function(req,res){
  res.render('index',{title:'ERROR'});
})

router.post('/',function(req,res){
  var query={name:req.body.name,pw:req.body.password};
  var collection = db.collection('users');
  collection.find(query).toArray(function(err,result){
    if(result.length==1){
      console.dir(result);
      res.render('usercenter',{title:'UserCenter',name:query.name});
    }else{
      res.redirect('/')
    }
  })
});

router.post('/postblog',function(req,res){
    let text=req.body.text;
    let title=req.body.title;
    let date=new Date();
    let uid=date.getTime().toString();
    console.log(title);
    console.log(text);
    console.log(uid);
    var collection = db.collection('blogs');
    collection.insert({
      uid:uid,
      title:title,
      text:text      
    },function(){
      console.log('数据库写入完成');
    })
    res.render('postsuccess',{text:text});
});


module.exports = router;
