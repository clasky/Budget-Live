var database = require('../routes/database');
var async = require('async');


exports.get = function(req, res){
	res.sendfile('views/user.html');
};