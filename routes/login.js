var database = require('../routes/database');
var async = require('async');
var user;

exports.get = function(req, res){
	res.sendfile('views/user.html');
};

exports.getData = function(req, res){
	console.log("GETTING DATA");
	retrieveBudgetData(function(budgetData)
	{
		console.log(budgetData);
		res.send(budgetData);
	});
};

exports.post = function(req, res){
	var username = req.param("username");
	var password = req.param("password")
	console.log("username = "+username);
	console.log("password = "+password);
	
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
			retrieveUserData(function(queryData){
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

function retrieveUserData(callback)
{
	connection = database.getConnection();
	
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

function retrieveBudgetData(callback)
{
	connection = database.getConnection();
	
	connection.query('USE budgetlive', function (err)
	{
		var query = "SELECT email, username, category, ammountBudgeted, ammountSpent " +  
					"FROM users INNER JOIN budget ON users.budgetId = budget.budgetId "+
					"WHERE username = " + "\"" + user + "\";";
					
		console.log(query);
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