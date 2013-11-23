var database = require('../routes/database');

exports.get = function(req, res){
	res.sendfile('views/createBudget.html');
};

exports.post = function(req, res){
	console.log(req);
	//var numberOfCategories = req.param("categories");//Modify to match Iris name.
	var email = req.param("email");
	var name = req.param("firstname");
	var username = req.param("username");
	var password = req.param("password");
	
	//var list = {};
	/*for(number)
	{
	//append number to param name
		list.push(req.param("");
	*/
	
	console.log("email = " + email);
	console.log("name = " + name);
	console.log("username = " + username);
	console.log("password = " + password);
	
	res.sendfile('views/login.html');
	
	connection = database.getConnection();
	
	//Add Data to the Database
	connection.query('USE budgetLive', function (err)
	{
		connection.query("INSERT INTO users(name,email,username,password) VALUES('"+name+"','"+email+"','"+username+"','"+password+"');", 
        function (err, result) {
            if (err) throw err;
			console.log('User added to database with ID: ' + result.insertId);
        });
	});
};