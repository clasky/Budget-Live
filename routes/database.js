var mysql = require('mysql');

var connection = mysql.createConnection({

	user : 'adminXACDnCs',
	password : 'BSJxmUYgzAyS'
	
	});

exports.initDatabase = function(req, res)
{
connection.query('CREATE DATABASE IF NOT EXISTS budgetlive', function (err) {
    console.log("Creating Budget Live Database");
	if (err) throw err;
    connection.query('USE budgetLive', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'userId INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(userId),'
			+ 'name VARCHAR(30),'
			+ 'email VARCHAR(60),'
            + 'username VARCHAR(30),'
			+ 'password VARCHAR(60),'
			+ 'budgetId INT NOT NULL,'
			+ 'linked VARCHAR(30)'
            + ');',function (err) {
                if (err) throw err;
            });
		
		connection.query('CREATE TABLE IF NOT EXISTS budget('
			
			+ 'budgetId INT,'
            + 'category VARCHAR(60),'
			+ 'amountBudgeted INT,'
            + 'amountSpent INT'
			+ ');'
			, function (err) {
                if (err) throw err;
            });
			
			connection.query('CREATE TABLE IF NOT EXISTS transactions('
			+ 'budgetId INT,'
            + 'category VARCHAR(60),'
			+ 'transactionAmount INT,'
			+ 'date VARCHAR(30)'
			+ ');'
			, function (err) {
                if (err) throw err;
            });
    });
});
}

exports.updateDatabase = function(req, res)
{	
	connection.query('USE budgetlive', function (err)
	{
		connection.query("INSERT INTO transactions VALUES(" + req.body.budgetId + ",\"" + req.body.category + "\"," + req.body.amountSpent + ",\"" + req.body.date +"\");", function (err)
		{
			if (err)
			{
				throw err;
			} 
		});
	});
	
	connection.query('USE budgetlive', function (err)
	{
		console.log("UPDATE budget SET amountSpent = amountSpent + " + req.body.amountSpent + " WHERE budgetId = " + req.body.budgetId + " AND category = \"" + req.body.category + "\";");
		connection.query("UPDATE budget SET amountSpent = amountSpent + " + req.body.amountSpent + " WHERE budgetId = " + req.body.budgetId + " AND category = \"" + req.body.category + "\";", function (err)
		{
			if (err)
			{
				throw err;
			} 
		});
	});
}

exports.getConnection = function(req, res)
{
	return connection;
}
