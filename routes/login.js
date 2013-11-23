var config = require('./database');

exports.get = function(req, res){
	res.render('login', { title: 'Login' });
};

exports.post = function(req, res){
	var username = req.param("user");
	var password = req.param("pass")
	console.log("user="+user);
	console.log("pass="+pass);
	res.render('thank_you', { title: 'Thank You'});
	
	connection = config.getConnection();
	
	//Add Data to the Database
	connection.query('USE test', function (err)
	{
		connection.query("INSERT INTO users(name) VALUES('"+pass+"','"+user+"');", 
        function (err, result) {
            if (err) throw err;
			console.log('User added to database with ID: ' + result.insertId);
        });
	});
};