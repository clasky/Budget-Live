var mysql = require('mysql');
var async = require('async');
var passgen = require('passgen');
var user;

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'default'
	});

exports.initDatabase = function(req, res)
{
connection.query('CREATE DATABASE IF NOT EXISTS budgetlive', function (err) {
    console.log("Creating Budget Live Database");
	if (err) throw err;
    connection.query('USE budgetLive', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'budgetId INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(budgetId),'
			+ 'name VARCHAR(30),'
			+ 'email VARCHAR(60),'
            + 'username VARCHAR(30),'
			+ 'password VARCHAR(60),'
			+ 'timeframe VARCHAR(60),'
			+ 'linkUpPassword VARCHAR(12)'
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
			+ 'date VARCHAR(30),'
			+ 'name VARCHAR(30)'
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
		connection.query("INSERT INTO transactions VALUES(" + req.body.transaction.budgetId + ",\"" + req.body.transaction.category + "\"," 
						+ req.body.transaction.amountSpent + ",\"" + req.body.transaction.date + "\",\"" + req.body.name +"\");", function (err)
		{
			if (err)
			{
				throw err;
			} 
		});
	});
	
	connection.query('USE budgetlive', function (err)
	{
		connection.query("UPDATE budget SET amountSpent = amountSpent + " + req.body.transaction.amountSpent + " WHERE budgetId = " 
						+ req.body.transaction.budgetId + " AND category = \"" + req.body.transaction.category + "\";", function (err)
		{
			if (err)
			{
				throw err;
			} 
		});
	});
}

exports.addNewUser = function(req, res)
{
	async.series([
		function(callback)
		{
			addUser(req, function(info){
				addUserBudget(req, info.insertId);
				callback();
			});
		}
	],
    function (err) 
	{
        console.log("New User Added");	
    });
}

function addUser(req, callback)
{
	user = req.body.username;
	linkUpPassword = passgen.create(6);
	connection.query('USE budgetlive', function (err)
	{	
		connection.query("INSERT INTO users VALUES(null,\"" + req.body.name + "\",\"" + req.body.email + "\",\"" + req.body.username 
						+ "\",\"" + req.body.password + "\",\"" + req.body.budget.timeframe + "\",\"" + linkUpPassword + "\");", function (err, info)
		{
			if (err)
			{
				throw err;
			} 
			callback(info);
		});
	});
};

function addUserBudget(req, budgetId)
{
	connection.query('USE budgetlive', function (err)
	{	
		for(var i = 0; i < req.body.budget.categories.length; i++)
		{	
			
			connection.query("INSERT INTO budget VALUES(\"" + budgetId + "\",\"" + req.body.budget.categories[i].name + "\"," 
							+ req.body.budget.categories[i].amountBudgeted + "," + req.body.budget.categories[i].amountSpent + ");", function (err)
			{
				if (err)
				{
					throw err;
				} 
			});
		}
	});
};

exports.getConnection = function(req, res){
	return connection;
}

exports.getUserData = function(req, res){
	console.log("GETTING USER DATA");
	retrieveUserData(function(req, userData)
	{
		res.send(userData);
	});
}

exports.getBudgetData = function(req, res){
	console.log("GETTING BUDGET DATA");
	retrieveData("budget", function(budgetData)
	{
		res.send(budgetData);
	});
};

exports.getTransactionData = function(req, res){
	console.log("GETTING TRANSACTION DATA");
	retrieveData("transaction", function(transactionData)
	{
		res.send(transactionData);
	});
};

exports.post = function(req, res){
	var username = req.param("username");
	var password = req.param("password")
	console.log("username = " + username);
	console.log("password = " + password);
	
	validateUser(username, password, function(valid){
		if(valid)
		{
			user = username;
			res.sendfile('views/user.html');
		}
		else
		{
			res.sendfile('views/invalidPassword.html');
		}
	});
};
	
	
function validateUser(username, password, cb)
{
	var valid = false;

	console.log("Validating User");
	
	async.series([
		function(callback)
		{
			retrieveUserLoginData(function(queryData){
				console.log(queryData);
				for(var i = 0; i < Object.keys(queryData).length; i++)
				{	
					if(queryData[i].username === username && queryData[i].password === password)
					{
						//The username already exists for the email
						valid = true;
						break;
					}
				}
				callback();
			});
		}
	],
    function (err) 
	{
        console.log(valid);	
		cb(valid);
    });
};

function retrieveUserData(userData callback)
{	
	connection.query('USE budgetlive', function (err)
	{
		connection.query("SELECT name, email, username, password, linkUpPassword FROM users WHERE username = "\"" + user + "\";", function (err, result)
		{
			if (err)
			{
				throw err;
			} 
			callback(result);
		});
	});
};

function retrieveUserLoginData(callback)
{	
	connection.query('USE budgetlive', function (err)
	{
		connection.query("SELECT username, password FROM users;", function (err, result)
		{
			if (err)
			{
				throw err;
			} 
			callback(result);
		});
	});
};

function retrieveData(dataType, callback)
{	
	var query;
	
	if(dataType === "budget")
	{
		query = "SELECT name, email, username, timeframe, category, amountBudgeted, amountSpent, budget.budgetId " +  
				"FROM users INNER JOIN budget ON users.budgetId = budget.budgetId " +
				"WHERE username = " + "\"" + user + "\";";
	}
	else
	{
		query = "SELECT transactions.category, transactionAmount, date, transactions.name " +
				"FROM users INNER JOIN budget ON users.budgetId = budget.budgetId " +
				"INNER JOIN transactions ON budget.budgetId = transactions.budgetId AND budget.category = transactions.category " +
				"WHERE username = " + "\"" + user + "\";";
	}
		
	connection.query('USE budgetlive', function (err)
	{	
		connection.query(query, function (err, result)
		{
			if (err)
			{
				throw err;
			} 
			callback(result);
		});
	});
};
