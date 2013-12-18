var express = require('express');
var database = require('./routes/database');
var budgetCreator = require('./routes/createBudget');
var linkCreator = require('./routes/linkup');
var login = require('./routes/login');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();

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
app.post('/user', database.restrict);
app.get('/user', function(req, res){res.redirect('home');});
app.get('/createBudget', budgetCreator.get);
app.post('/createBudget', budgetCreator.post);
app.get('/login', login.get);
app.post('/validateUser', database.validateUser);
app.post('/validateUniqueUser', database.validateUniqueUser);
app.post('/validateOwnerAccount', database.validateAccount);
app.get('/budgetData', database.getBudgetData);
app.get('/transactionData', database.getTransactionData);
app.post('/updateBudget', database.updateDatabase);
app.post('/addNewUser', database.addNewUser);
app.post('/userInfo', database.validateUserInfoLogin);
app.get('/userInfo', function(req, res){res.redirect('home');});
app.get('/userData', database.getUserData);
app.post('/budgetOverview', database.validateBudgetOverviewLogin);
app.get('/budgetOverview', function(req, res){res.redirect('home');});
app.get('/annualBudgetData', database.getAnnualBudgetData);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
	  //Reset budget amounts every month. 
	  setInterval(function(){
	  var startingYear = 2013;
	  var today = new Date();
	  var day = today.getDate();
	  var month = today.getMonth() + 1;
	  var year = today.getFullYear();
	  console.log("Date: " + month + "/" + day + "/" + year);
	  if(day === 1)
	  {
		console.log("Resetting Monthly Budgets");
		console.log("Saving Annual Budget Data");
		database.storeAnualBudgetAmounts(month);
		database.resetBudgetAmounts();
	  }  
	  
	  if(year != startingYear)
	  {
		console.log("Deleting Annual Budget Data");
		database.deleteAnualBudgetAmounts();
	  }
  },86400000);
});
