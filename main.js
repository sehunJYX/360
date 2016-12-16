var userCRUD = require("./user_crud");
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//静态文件使用static
app.use(express.static('public'));

//创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get('/index.html', function (req, res) {
	   res.sendFile( __dirname + "/" + "index.html" );
	});

app.get('/show.html', function (req, res) {
	   res.sendFile( __dirname + "/" + "show.html" );
	});

//跳转注册页面index04.html[实际应用]
app.get('/index04.html', function (req, res) {
	   res.sendFile( __dirname + "/" + "index04.html" );
	});

//跳转注册页面registry[实际应用]
app.get('/registry.html', function (req, res) {
	   res.sendFile( __dirname + "/" + "registry.html" );
	});
	
//跳转登录页面login	[实际应用]
app.get('/login.html', function (req, res) {
	   res.sendFile( __dirname + "/" + "login.html" );
	});

//跳转历史订单页面orderHistory页面[实际应用]
app.get('/orderHistory.html', function (req, res) {
	   res.sendFile( __dirname + "/" + "orderHistory.html" );
	});
	
//插入数据库 [测试]
app.post('/insert_post',urlencodedParser,function(req,res){
	 response = {
		       username:req.body.username,
		       password:req.body.password
		   };
	 console.log(response);
	res.end(JSON.stringify(response));
	var usernameVal = response.username;
	var passwordVal = response.password;
	//调用insert方法
	userCRUD.insertUser(usernameVal, passwordVal, function(flag) {
		res.write(flag ? "insert success!" : "insert error!");
		res.end(JSON.stringify(response));
	});
});


//注册[实际应用]
//app.post("/XXXXXX",urlencodedParser,function(){});
app.post('/registry_post',urlencodedParser,function(req,res){
	 //request 请求  data ---> request
	 
	 	telphoneVal = req.body.telphone,
		passwordVal = req.body.password,
		usernameVal = req.body.username,
		addressVal = req.body.address
	
	var time = new Date();
	//调用insert方法
//	userCRUD.registerUser();
	userCRUD.registerUser(usernameVal, passwordVal, telphoneVal,addressVal,time,function(flag) {

		if(flag){
			res.write(flag ? "true" : "false");
			res.end();
		}else{
			
		}
	});
});


//登录[实际应用].接受到页面返回值 -- data:{username,password}
app.post('/login_post',urlencodedParser,function(req,res){
		
	 usernameVal = req.body.username,
	 passwordVal = req.body.password

	userCRUD.mylogin(usernameVal,passwordVal,function(flag){
		
		if(flag){
			res.write(flag ? "true" : "false");			
			res.end();
		}else{
			
		}
	});	
});


//查询 ?未完成
app.post('/show_post',urlencodedParser,function(req,res){
	
	var usernameVal = req.body.username;
	var passwordVal = req.body.password;
	
	userCRUD.findAll(function(resultSet) {
		console.log("********findAll User in main.js********")
		for(i in resultSet) {
			var result = resultSet[i];
			console.log(result.id + ":" + result.username + ":" + result.password);
			res.end(result.id + ":" + result.username + ":" + result.password);
		}
	});
	
});


var server = app.listen(8000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log("server 8000 is on...")

});
