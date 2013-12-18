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
	remaining.push(budget.budgeted - budget.spent);
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