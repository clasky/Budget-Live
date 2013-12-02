var database = require('../routes/database');
var async = require('async');

function validateUser(email,cb)
{
var userExists = false;
	console.log("Validating User");
	
	async.series([
		function(callback)
		{
			retrieveData(function(queryData){
				console.log(queryData);
				for(var i = 0; i < Object.keys(queryData).length; i++)
				{	
					if(queryData[i].email === email)
					{
						userExists = true;
						break;
					}
				}
				callback();
			});
		}
	],
    function (err) 
	{
        console.log(userExists);	
		cb(userExists);
    });
};

function retrieveData(callback)
{
	connection = database.getConnection();
	
	connection.query('USE budgetLive', function (err)
	{
		connection.query("SELECT email FROM users;", function (err, result)
		{
			if (err)
			{
				throw err;
			} 
			callback(result);
		});
	});
};


exports.get = function(req, res){
	res.sendfile('views/createBudget.html');
};

exports.post = function(req, res){
	//var numberOfCategories = req.param("categories");//Modify to match Iris name.
	
	//******************************NOTE**************************** 
	//Now that the initial set up of validation is done make sure that I am validating the right info in the database.
	//**************************************************************
	var budgetEmail = req.param("budget_email");
	var userEmail = req.param("user_email");
	var name = req.param("first_name");
	var username = req.param("username");
	var password = req.param("password");
	var confirmedPass = req.param("confirm_password");
	
	//var list = {};
	/*for(number)
	{
	//append number to param name
		list.push(req.param("");
	*/
	
	console.log("Budget Email = " + budgetEmail);
	console.log("User Email = " + userEmail);
	console.log("First Name = " + name);
	console.log("Username = " + username);
	console.log("Password = " + password);
	console.log("Confirmed Password = " + confirmedPass);

	validateUser(userEmail, function(cb){
		if(cb)
		{
			res.sendfile('views/thankyou.html');
		}
		else
		{	
			res.sendfile('views/invalidEmail.html');
		}
	});
	
	/*connection = database.getConnection();
	
	//Add Data to the Database
	connection.query('USE budgetLive', function (err)
	{
		/*connection.query("INSERT INTO users(name,email,username,password) VALUES('"+name+"','"+email+"','"+username+"','"+password+"');", 
        function (err, result) {
            if (err) throw err;
			console.log('User added to database with ID: ' + result.insertId);
        });
	});*/
};