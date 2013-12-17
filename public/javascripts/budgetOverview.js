$.ajax(
{	
	type: "GET",
	url: '/annualBudgetData',
	data: window.location.search.slice(1),
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
	var monthlyBudgets = {};
	
	for(key in data)
	{	
		var index = data[key].month;
		if(monthlyBudgets.hasOwnProperty(index))
		{
			monthlyBudgets[index].budgeted += data[key].amountBudgeted;
			monthlyBudgets[index].spent += data[key].amountSpent;
		}
		else
		{
			var tempBudget = new Object();
			tempBudget.budgeted = data[key].amountBudgeted;
			tempBudget.spent = data[key].amountSpent;
			monthlyBudgets[index] = tempBudget;
		}
	}
	
	var containerId = 0;
	for(key in monthlyBudgets)
	{
		createBarChart(monthlyBudgets[key], key, containerId);
		containerId++;
	}
}

function createBarChart(budget, month, containerId) 
{
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var remaining = [];
	remaining.push(budget.budgeted);
	var spent = [];
	spent.push(budget.spent);

	$('#containerChart' + containerId).highcharts({
		chart: 
		{
			type: 'bar'
		},
		title: 
		{
			text: 'Total Spending ' + months[month - 1]
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
				text: null
			}
		},
		tooltip:
		{
			formatter: function() {
				return 'Overall Budget <br>' + this.series.name + ': <b>' + this.y + '</b>';
			}
		},
		legend: 
		{
			backgroundColor: '#FFFFFF',
			reversed: true
		},
		exporting: 
		{
			enabled: false 
		},
		plotOptions:
		{
			series: 
			{
				stacking: 'normal'
			}
		},
		series: [{
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
};

/*var userId = "clasky"
var email;
var name;
var name2;
var username;
var categories = {};

var dataString;
var pieData = [];
var userNames = [];
var remaining = [];
var spent = [];
var lineSeries = [];
var lineSeries2 = [];
var timeFrameLine = [];

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
}*/