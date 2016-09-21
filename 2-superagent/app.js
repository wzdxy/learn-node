var superagent=require('superagent');
var express=require('express');
var cheerio=require('cheerio');

var app=express();

app.get('/',function(req,res,next){
    superagent.get('https://cnodejs.org/')
    .end(function(err,sres){
        if(err){
            return next(err);
        }
        var $=cheerio.load(sres.text);
        var items=[];
        $('#topic_list .topic_title').each(function(idx,element){
            var $element=$(element);
            items.push({
                title:$element.attr('title'),
                href:$element.attr('href')
            });
        });

        $('#topic_list .user_avatar img').each(function(idx,element){
                var $element=$(element);
                items[idx].author=$element.attr('title');
        });

        var r="";
        for(let i=0;i<items.length;i++){
            r+="<p>"+items[i].title+"<b> BY: </b>"+items[i].author+"</p><p><a href='https://cnodejs.org"+items[i].href+"'>https://cnodejs.org"+items[i].href+"</a></p></p>-------------------------------------------------------<p>";            
        }
        res.send(r);
        
    });
});

app.listen(3000,function(){
    console.log('listenning:3000');
});