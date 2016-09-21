var express=require('express');
var utility=require('utility');

var app=express();

app.get('/',function(req,res){
    // res.send('Hello Node');
    var q=req.query.q;
    var md5Value=utility.md5(q);
    res.send(md5Value);
})

app.listen(3000,function(){
    console.log('listening:3000');
})