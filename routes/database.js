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
            + 'userId INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(userId),'
			+ 'email VARCHAR(60),'
            + 'username VARCHAR(30),'
			+ 'password VARCHAR(60),'
			+ 'budgetId INT,'
			+ 'linked VARCHAR(30)'
            + ');',function (err) {
                if (err) throw err;
            });
		
		connection.query('CREATE TABLE IF NOT EXISTS budget('
			+ 'budgetId INT NOT NULL,'
            + 'category VARCHAR(60),'
			+ 'ammountBudgeted INT,'
            + 'ammountSpent INT'
			+ ');'
			, function (err) {
                if (err) throw err;
            });
    });
});
}

exports.getConnection = function()
{
	return connection;
}
