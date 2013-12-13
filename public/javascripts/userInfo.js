$(document).ready(function()
{
var email;
	var name;
	var username;
	var categories = {};
	var transactions = {};
	var dataString;
	var pieData = [];
	var userNames = [];
	var remaining = [];
	var spent = [];
	var lineSeries = [];
	var timeFrameLine = [];
	var transSize = 0;
	var budgetId;
	var totalSpending = 0;
	
	$.ajax(
	{
		type: "GET",
		url: '/userData',
		dataType: 'json',
		success: function(data){
			handleBudgetData(data);
		},
		error: function(responseText){
			alert('Error: ' +  responseText.toString());
		}
	});
	
	function handleBudgetData(data)
	{
		//If successful we assign the global variables to the JSON object data
		//budgetId = data[0].budgetId;
		name = data[0].name;
		email = data[0].email;
		username = data[0].username;
		linkUpPassword = data[0].linkUpPassword;
		alert( name + " " + email + " " + username + " " + linkUpPassword );
		
	}
	
	
});