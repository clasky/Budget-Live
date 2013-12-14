var mysql = require('mysql');
var async = require('async');
var passgen = require('passgen');

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
            + 'userId INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(userId),'
			+ 'name VARCHAR(30),'
			+ 'email VARCHAR(60),'
            + 'username VARCHAR(30),'
			+ 'password VARCHAR(60),'
			+ 'timeframe VARCHAR(60),'
			+ 'budgetId INT,'
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
	linkUpPassword = passgen.create(6);
	connection.query('USE budgetlive', function (err)
	{	
		connection.query("INSERT INTO users VALUES(null,\"" + req.body.name + "\",\"" + req.body.email + "\",\"" + req.body.username 
						+ "\",\"" + req.body.password + "\",\"" + req.body.budget.timeframe + "\",null,\"" + linkUpPassword + "\");", function (err, info){
			if (err)
			{
				throw err;
			} 
			
			connection.query("UPDATE users SET budgetId = userId WHERE username = \"" +  req.body.username + "\";", function (err){
				if (err)
				{
					throw err;
				}
			});
			
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
							+ req.body.budget.categories[i].amountBudgeted + "," + req.body.budget.categories[i].amountSpent + ");", function (err){
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
	var username = req._parsedUrl.query;
	console.log(username);
	retrieveUserData(username, function(userData)
	{
		res.send(userData);
	});
};

exports.getBudgetData = function(req, res){
	console.log("GETTING BUDGET DATA");
	var username = req._parsedUrl.query;
	retrieveData("budget", username, function(budgetData)
	{
		res.send(budgetData);
	});
};

exports.getTransactionData = function(req, res){
	console.log("GETTING TRANSACTION DATA");
	var username = req._parsedUrl.query;
	retrieveData("transaction", username, function(transactionData)
	{
		res.send(transactionData);
	});
};

exports.validateAccount = function(req, res){
	var ownersEmail = req.body.owners_email;
	var linkCode = req.body.link_code;
	console.log("Owners Email = " + ownersEmail);
	console.log("Link Code = " + linkCode);
	
	validateOwnerAccount(req, ownersEmail, linkCode, function(exists){
		res.send(exists);
	});
}

function validateOwnerAccount(req, ownersEmail, linkCode, cb)
{
	var exists = false;

	console.log("Validating Owners Account");
	
	async.series([
		function(callback)
		{
			retrieveOwnerData(function(queryData){
				for(var i = 0; i < Object.keys(queryData).length; i++)
				{	
					if(queryData[i].email === ownersEmail && queryData[i].linkUpPassword === linkCode)
					{
						exists = true;

						console.log("LINKING TO BUDGET");
						connection.query("INSERT INTO users(name, email, username, password, timeframe, budgetId, linkUpPassword)" 
										+" VALUES('"+req.body.name+"','"+req.body.email+"','"+req.body.username+"','"+req.body.password+"','"
										+queryData[i].timeframe+"',"+queryData[i].budgetId+",'"+queryData[i].linkUpPassword+"');", function (err, result) 
						{
							if(err)
							{
								console.log("GOT HERE");
								throw err;
							}
						});
						
						break;
					}
				}
				callback();
			});
		}
	],
    function (err) 
	{
        console.log(exists);	
		cb(exists);
    });
}

function retrieveOwnerData(callback)
{	
	connection.query('USE budgetlive', function (err)
	{
		connection.query("SELECT email, linkUpPassword, timeframe, budgetId FROM users;", function (err, result)
		{
			if (err)
			{
				throw err;
			} 
			callback(result);
		});
	});
};

exports.validateUser = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	console.log("username = " + username);
	console.log("password = " + password);
	
	validateUser(username, password, function(valid){
		res.send(valid);
	});
};

exports.validateUniqueUser = function(req, res){
	var username = req.body.username;
	var email = req.body.email;
	console.log("username = " + username);
	console.log("email = " + email);
	
	validateUnique(username, email, function(unique){
		res.send(unique);
	});
};
	
function validateUnique(username, email, cb)
{
	var unique = true;

	console.log("Validating Unique User");
	
	async.series([
		function(callback)
		{
			retrieveUserUniqueData(function(queryData){
				for(var i = 0; i < Object.keys(queryData).length; i++)
				{	
					if(queryData[i].username === username && queryData[i].email === email)
					{
						unique = false;
						break;
					}
				}
				callback();
			});
		}
	],
    function (err) 
	{
        console.log(unique);
		cb(unique);
    });
}	
	
	
function validateUser(username, password, cb)
{
	var valid = false;

	console.log("Validating User Login");
	
	async.series([
		function(callback)
		{
			retrieveUserLoginData(function(queryData){
				for(var i = 0; i < Object.keys(queryData).length; i++)
				{	
					if(queryData[i].username === username && queryData[i].password === password)
					{
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

function retrieveUserData(username, callback)
{	
	connection.query('USE budgetlive', function (err)
	{
		connection.query("SELECT name, email, username, password, linkUpPassword FROM users WHERE username = \"" + username + "\";", function (err, result)
		{
			console.log(username);
			console.log(result);
			if (err)
			{
				throw err;
			} 
			callback(result);
		});
	});
};

function retrieveUserUniqueData(callback)
{	
	connection.query('USE budgetlive', function (err)
	{
		connection.query("SELECT username, email FROM users;", function (err, result)
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

function retrieveData(dataType, username, callback)
{	
	var query;
	
	if(dataType === "budget")
	{
		query = "SELECT name, email, username, timeframe, category, amountBudgeted, amountSpent, budget.budgetId " +  
				"FROM users INNER JOIN budget ON users.budgetId = budget.budgetId " +
				"WHERE username = " + "\"" + username + "\";";
	}
	else
	{
		query = "SELECT transactions.category, transactionAmount, date, transactions.name " +
				"FROM users INNER JOIN budget ON users.budgetId = budget.budgetId " +
				"INNER JOIN transactions ON budget.budgetId = transactions.budgetId AND budget.category = transactions.category " +
				"WHERE username = " + "\"" + username + "\";";
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
