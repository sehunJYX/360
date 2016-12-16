var sessionFactory = require("./SessionFactory");

var conn = sessionFactory.getConnection();

//查询所有
var findAllSQL = "SELECT  id,username,password from t_user";
conn.query(findAllSQL, function(err, rows) {
    if (err) throw err;
    console.log("******************findAll*******************");
    for(i in rows){
    var row = rows[i];
    console.log(row.id+":"+row.username+":"+row.password);
    }
});

conn.end();