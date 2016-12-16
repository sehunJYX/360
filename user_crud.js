function UserCRUD() {
	var sessionFactory = require("./SessionFactory");
	
	//用户注册 -- users表[实际应用]
	this.registerUser = function(usernameVal, passwordVal,telphoneVal,addressVal,time, callback) {
		//建立链接
		var conn = sessionFactory.getConnection();
		//插入数据
		var insertSQL = "insert into users(username,password,telphone,registertime) values('" + usernameVal + "','" + passwordVal +"','"+telphoneVal+"','"+time+ "')";
		console.log(insertSQL);
		
		conn.query(insertSQL, function(err, res) {
			if(err) throw err;
			var flag = false;
			if(res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}


	//查询所有
	this.findAll = function(callback) {
		var conn = sessionFactory.getConnection();
		var findAllSQL = "SELECT  userid,username,password from users";
		conn.query(findAllSQL, function(err, rows) {
			if(err) throw err;
			conn.end();
			//使用回调函数实现值的回传
			return callback(rows);
		});

	}
	//根据id查询
	this.findById = function(id, callback) {
		var conn = sessionFactory.getConnection();
		//条件查询
		var findByIdSQL = "SELECT  userid,username,password from users where userid=" + id;
		conn.query(findByIdSQL, function(err, rows) {
			if(err) throw err;
			conn.end();
			return callback(rows[0]); //使用回调函数异步传值,注意rows为数组
		});
	}
	//删除用户
	this.deleteUser = function(id, callback) {
		var conn = sessionFactory.getConnection();
		//插入数据
		var delSQL = "delete from users where userid=" + id;
		conn.query(delSQL, function(err, res) {
			if(err) throw err;
			var flag = false;
			if(res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}
	//更新用户信息
	this.updateUser = function(updateId, newUsernameVal, newPasswordVal, callback) {
		//修改数据
		var conn = sessionFactory.getConnection();
		var updateSQL = "update users set username='" + newUsernameVal + "',password='" + newPasswordVal + "' where userid=" + updateId;
		conn.query(updateSQL, function(err, res) {
			if(err) throw err;
			var flag = false;
			if(res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}
	//查询所有
	this.findAll = function(callback) {
		var conn = sessionFactory.getConnection();
		var findAllSQL = "SELECT  userid,username,password from users";
		conn.query(findAllSQL, function(err, rows) {
			if(err) throw err;
			conn.end();
			//使用回调函数实现值的回传
			return callback(rows);
		});

	}
	//新增用户[测试]
	this.insertUser = function(usernameVal, passwordVal,callback) {
		var conn = sessionFactory.getConnection();
		//插入数据
		var insertSQL = "insert into users(username,password) values('" + usernameVal + "','" + passwordVal + "')";
		console.log(insertSQL);
		conn.query(insertSQL, function(err, res) {
			if(err) throw err;
			var flag = false;
			if(res.affectedRows > 0) flag = true;
			conn.end();
			callback(flag);
		});
	}	

	//登录
	this.mylogin  = function(inputUsername,inputPassword,callback){
		var conn = sessionFactory.getConnection();
		var loginSQL = "select * from users where password ="+inputPassword+" and username="+inputUsername;
		conn.query(loginSQL, function(err, res) {
			if(err) throw err;
			var flag = false;
			if(res.affectedRows > 0){
				flag = true;
				}else{
					flag = false;
					}
			conn.end();
			callback(flag);
		});
	}
}

module.exports = new UserCRUD();