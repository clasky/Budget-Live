var database = require('../routes/database');

function validateUser(user)
{	
	var userExists = false;
	connection = database.getConnection();
	console.log("Validating User");
	
	//Get all users in the database
	connection.query('USE budgetLive', function (err)
	{
		connection.query("SELECT username FROM users;", 
        function (err, result) {
            if (err)
			{						
				throw err;
			}
			else
			{
				for(dbUser in result.name)
				{
					console.log(dbUser);
					if(user === dbUser)
					{
						userExists = true;
					}
				}
			}
        });
	});
	
	console.log(userExists);
	return userExists;
}


exports.get = function(req, res){
	res.sendfile('views/createBudget.html');
};

exports.post = function(req, res){
	//var numberOfCategories = req.param("categories");//Modify to match Iris name.
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
	
	if(validateUser(name))
	{
		res.sendfile('views/thankyou.html');
	}
	else
	{	
		
	}
	
	connection = database.getConnection();
	
	//Add Data to the Database
	connection.query('USE budgetLive', function (err)
	{
		/*connection.query("INSERT INTO users(name,email,username,password) VALUES('"+name+"','"+email+"','"+username+"','"+password+"');", 
        function (err, result) {
            if (err) throw err;
			console.log('User added to database with ID: ' + result.insertId);
        });*/
	});
};