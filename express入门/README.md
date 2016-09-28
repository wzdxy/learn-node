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

### 4、 基本路由

```js
app.get('/',function(req,res){
    res.send('Hello Express');
})
```

### 5、 托管静态文件

```js
app.use('/static',express.static('public'));   //'第一个参数可选'
```