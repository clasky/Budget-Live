var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'MauriK1ribatI'
	});

exports.initDatabase = function()
{
connection.query('CREATE DATABASE IF NOT EXISTS budgetlive', function (err) {
    console.log("Creating Budget Live Database");
	if (err) throw err;
    connection.query('USE budgetLive', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'name VARCHAR(30),'
			+ 'email VARCHAR(60),'
			+ 'username VARCHAR(60),'
			+ 'password VARCHAR(60)'
            +  ')', function (err) {
                if (err) throw err;
            });
    });
});
}

exports.getConnection = function()
{
	return connection;
}
