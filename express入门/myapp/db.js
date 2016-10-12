// var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost/test1');//；连接数据库
// var Schema = mongoose.Schema;   //  创建模型
// var userScheMa = new Schema({
// 	name: String,
// 	password: String
// }); //  定义了一个新的模型，但是此模式还未和users集合有关联
// exports.user = db.model('users', userScheMa); //  与users集合关联

// var mongodb = require('mongodb');
// var server = new mongodb.Server("localhost",27017,{safe:true});
// new mongodb.Db('test',server,{}).open(function(error,client){
//     if(error) throw error;
//     var collection = new mongodb.Collection(client,'users');
//     collection.find(function(error,cursor){
//         cursor.each(function(error,doc){
//             if(doc){
//                 console.log("name:"+doc.name+" pw:"+doc.pw);
//             }
//         });
//     });
// });
var Db = require('mongodb').Db,
    Server = require('mongodb').Server;
var db = new Db('test', new Server('localhost', 27017));

db.open(function(err, db) {
	console.log('dbopen');
	// console.log(this.collection);
	db.collection('users',{safe:true},function(err,collection){
		if(err)throw err;
		collection.find().toArray(function(e,docs){
             if(e) throw e ;
             console.log(docs) ;
         }) ; 
	})
});