//var userId = window.location.search.slice(1);
var userId = "clasky";
var email;
var name;
var name2;
var username;
var categories = {};
var transactions = {};
var dataString;
var pieData = [];
var userNames = [];
var remaining = [];
var spent = [];
var lineSeries = [];
var lineSeries2 = [];
var timeFrameLine = [];
var transSize = 0;
var budgetId;
var totalSpending = 0;
var totalSpending1 = 0;
var totalSpending2 = 0;

$.ajax(
{	
	type: "GET",
	url: '/budgetData',
	data: userId,
	dataType: 'json',
	success: function(data){
		handleBudgetData(data);
	},
	error: function(responseText){
		alert('Error: ' +  responseText.toString());
	}
});

$.ajax(
{	
	type: "GET",
	url: '/transactionData',
	data: userId,
	dataType: 'json',
	success: function(data){
		handleTransactionData(data);
	},
	error: function(responseText){
		alert('Error: ' +  responseText.toString());
	}
});

function handleTransactionData(data)
{
	for(var key in data)
	{	
		var transaction = new Object();
		transaction.category = data[key].category;
		transaction.amountSpent = data[key].transactionAmount;
		transaction.date = data[key].date;
		transaction.name = data[key].name;
		transactions[key] = transaction;
		transSize = transSize + 1;
	}
		
	var transactionsByMonth = {};	
	
	for(var key in transactions)
	{
		var date = transactions[key].date;
		var parsedDate = date.split("/");
		
		if(transactionsByMonth.hasOwnProperty(parsedDate[0]))
		{	
			transactionsByMonth[parsedDate[0]].push(transactions[key]);
		}
		else
		{
			var tempArray = new Array();
			tempArray.push(transactions[key]);
			transactionsByMonth[parsedDate[0]] = tempArray;	
		}
		
	}
	
	for(var key in transactionsByMonth)
	{
		for(var i = 0; i < transactionsByMonth[key].length; i++)
		{
			alert(JSON.stringify(transactionsByMonth[key][i]));
		}
	}
}
	
function handleBudgetData(data)
{
	//If successful we assign the global variables to the JSON object data
	budgetId = data[0].budgetId;
	name = data[0].name;
	email = data[0].email;
	username = data[0].username;
	timeframe = data[0].timeframe;
	categories = {};
	
	//Look through the categories to get the amount budgeted and amount spent.  They are placed in a map
	//the key is the category and the values are an array which contains amount Budgeted in position 0 and amount Spent in position 1.
	for(var key in data)
	{	
		var budget_and_spending = new Array(data[key].amountBudgeted,data[key].amountSpent);
		categories[data[key].category] = budget_and_spending;
	}
		
	//For convenience in printing things out I then put everything into a string var so I could show all the data in one alert.
	//dataString = "Username: " + username + "\nEmail: " + email + "\n\n";
	
	//Adding information in graphs
	userNames.push(name);
	for(var key in categories)
	{
		pieData.push([key, categories[key][0]]);
		//dataString += ("Category: " + key + "\nAmount Budgeted: " + categories[key][0] + "\nAmount Spent: "  + categories[key][1] + "\n\n");
	}
	
	// setting up total summary for bar graph
	totalSummary();
	
	//creating charts
	createBarChart($('#barChart'));
}

function totalSummary()
{
	var total_ = 0;
	var spent_ = 0;
	for(var key in categories)
	{
		spent_ = spent_ + categories[key][1];
		total_ = total_ + categories[key][0];
	}
	//alert(spent_ + " " + total_);
	remaining.push(parseInt(total_ - spent_));
	spent.push(parseInt(spent_));
}

// creates Bar Chart
function createBarChart(bar)
{
	bar.highcharts(
	{
		chart: 
		{
			type: 'bar'
		},
		title: 
		{
			text: 'Spent vs Total'
		},
		xAxis:
		{
			categories: [$("h1").text()]
		},
		yAxis: 
		{
			min: 0,
			title: 
			{
				text: 'Total Category Amount'
			}
		},
		legend: 
		{
			backgroundColor: '#FFFFFF',
			reversed: true
		},
		plotOptions:
		{
			series: 
			{
				stacking: 'normal'
			}
		},
		series: 
		[{
			name: 'Remaining Amount',
			color: '#95E243',
			data: remaining
		}, 
		{
			name: 'Spent',
			color: '#9F0707',
			data: spent
		}]
	});
}