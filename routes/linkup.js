var database = require('../routes/database');
var async = require('async');

function validateUser(budgetEmail, userEmail, username, cb)
{
	var budgetExists = false;
	var unique = true;
	var budgetId = -1;

	console.log("Validating User");
	
	async.series([
		function(callback)
		{
			retrieveData(function(queryData){
				console.log(queryData);
				for(var i = 0; i < Object.keys(queryData).length; i++)
				{	
					if(queryData[i].email === budgetEmail)
					{
						//The budget exists
						budgetExists = true;
						budgetId = queryData[i].budgetId;
					}
					
					if(queryData[i].username === username && queryData[i].email === userEmail)
					{
						//The username already exists for the email
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
        console.log(budgetExists + " " + unique + " " + budgetId);	
		cb(budgetExists, unique, budgetId);
    });
};

function retrieveData(callback)
{
	connection = database.getConnection();
	
	connection.query('USE budgetlive', function (err)
	{
		connection.query("SELECT email, username, budgetId FROM users;", function (err, result)
		{
			if (err)
			{
				throw err;
			} 
			callback(result);
		});
	});
};

function insertData(userEmail, username, password, budgetId)
{
	connection = database.getConnection();

	connection.query('USE budgetlive', function (err)
	{
		connection.query("INSERT INTO users(email, username, password, budgetId, linked) VALUES('"+userEmail+"','"+username+"','"+password+"','"+budgetId+"','pending');", 
        function (err, result) {
            if (err) throw err;
			console.log('User added to database with ID: ' + result.insertId);
        });
	});
}


exports.get = function(req, res){
	res.sendfile('views/createBudget.html');
};

exports.post = function(req, res){	
	var budgetEmail = req.param("budget_email");
	var userEmail = req.param("user_email");
	var username = req.param("username");
	var name = req.param("first_name");
	var password = req.param("password");
	var confirmedPass = req.param("confirm_password");
	
	console.log("Budget Email = " + budgetEmail);
	console.log("User Email = " + userEmail);
	console.log("First Name = " + name);
	console.log("Username = " + username);
	console.log("Password = " + password);
	console.log("Confirmed Password = " + confirmedPass);
	
	validateUser(budgetEmail, userEmail, username, function(budgetExists, unique, budgetId){
		if(budgetExists && unique)
		{
			insertData(userEmail, username, password, budgetId);
			res.sendfile('views/thankyou.html');
		}
		else if(!budgetExists)
		{	
			res.sendfile('views/invalidEmail.html');
		}
		else
		{
			res.sendfile('views/invalidEmail_Name.html');
		}
	});	
};

