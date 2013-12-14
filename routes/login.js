var database = require('../routes/database');
var async = require('async');


exports.get = function(req, res){
	console.log(req.name);
	res.sendfile('views/user.html');
};