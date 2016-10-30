var express = require('express');
var router = express.Router();
var db=require('../db.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',function(req,res){
  let blogId=req.query.blogId;
  let collection = db.collection('blogs');
  let query={uid:blogId};
  collection.find(query).toArray(function(err,result){
    console.dir(result);
    res.render('blog',{title:result[0].title,text:result[0].text,blogId:blogId});
  })
})

router.post('/comment',function(req,res){
    console.log('comment require');
    let username=req.body.name;
    let text=req.body.text;
    let email=req.body.email;
    let postid=req.body.postid;
    let time=new Date().getTime().toString();
    let collection=db.collection('comment');
    collection.insert({
        postid:postid,
        username:username,
        text:text,
        email:email,
        time:time,
    },function(){
        console.log('new comment['+username+':'+text+']');
        res.render('blog')
    });


})

module.exports = router;
