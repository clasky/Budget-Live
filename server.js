var express = require('express');
var database = require('./routes/database');
var budgetCreator = require('./routes/createBudget');
var linkCreator = require('./routes/linkup');
var login = require('./routes/login');
var http = require('http');
var path = require('path');
var app = express();

//USE PASSPORT
//URL for Website
//http://budgetlive.nodejitsu.com
// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.html', require('jade').__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use("/public", express.static(__dirname + '/public'));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Create Database if it doesn't exist
database.initDatabase();

app.get('/', function(req, res){res.sendfile('views/index.html');});
app.get('/home', function(req, res){res.sendfile('views/index.html');});
app.get('/aboutus', function(req, res){res.sendfile('views/aboutus.html');});
app.get('/services', function(req, res){res.sendfile('views/services.html');});
app.get('/contactus', function(req, res){res.sendfile('views/contactus.html');});
app.get('/linkUp', function(req, res){res.sendfile('views/linkUp.html');});
app.get('/user', function(req, res){res.sendfile('views/user.html');});
app.get('/createBudget', budgetCreator.get);
app.post('/createBudget', budgetCreator.post);
app.get('/link', linkCreator.get);
app.post('/link', linkCreator.post);
app.get('/login', login.get);
app.post('/login', login.post);
app.get('/budgetData', login.getBudgetData);
app.get('/transactionData', login.getTransactionData);
app.post('/updateBudget', database.updateDatabase);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
