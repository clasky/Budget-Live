exports.post = function(req, res){
	console.log("Sending File");
	res.sendfile('views/user.html');
};