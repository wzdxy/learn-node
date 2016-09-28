# Express入门

### 1、 新建Express项目

`npm init`

`npm install express --save`

### 2、 使用Express应用生成器快速创建

`npm install express-generator -g` 安装

`express -myapp`生成myapp项目

`npm install`安装依赖

### 3、 运行项目

`DEBUG=myapp npm start`

### 4、 托管静态文件
```js
app.use('/static',express.static('public'));   //'第一个参数可选'
```

### 5、 基本路由
- 用法：

```js
app.METHOD(path, [callback...], callback)
```
```js
app.get('/',function(req,res){
    res.send('Hello Express');
})
```
- 路径可以采用 **字符串模式** 或 **正则表达式** ，如：

```js
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
```
```js
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

- 路由句柄：多种处理路由的方式：**多个回调函数**、**回调函数数组**

```js
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

```

### 6、路由响应

```js
res.download() 	        //提示下载文件。
res.end() 	            //终结响应处理流程。
res.json() 	            //发送一个 JSON 格式的响应。
res.jsonp() 	        //发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect() 	        //重定向请求。
res.render() 	        //渲染视图模板。
res.send() 	            //发送各种类型的响应。
res.sendFile 	        //以八位字节流的形式发送文件。
res.sendStatus()        //设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。
```

### 7、链式路由句柄 **`express.Router`**

```js
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  });
```

### 8、模块化路由句柄 **`express.Router`**

```js

```

[书签:Express路由](http://www.expressjs.com.cn/guide/routing.html)