$(document).ready(function()
{
	alert("here");
});
	/*var email;
	var name;
	var username;
	var categories = {};
	var transactions = {};
	var timeframe;
	var linkUpPassword;
	alert("here");
	
	$.ajax(
	{
		type: "GET",
		url: '/budgetData',
		dataType: 'json',
		success: function(data){
			handleBudgetData(data);
		},
		error: function(responseText){
			alert('Error: ' +  responseText.toString());
		}
	});*/
	
	/*$.ajax(
	{
		type: "GET",
		url: '/transactionData',
		dataType: 'json',
		success: function(data){
			//handleTransactionData(data);
		},
		error: function(responseText){
			alert('Error: ' +  responseText.toString());
		}
	});
	*/
	/*function handleBudgetData(data)
	{
		
		var budgetId = data[0].budgetId;
		name = data[0].name;
		email = data[0].email;
		username = data[0].username;
		timeframe = data[0].timeframe;
		linkUpPassword = data[0].linkUpPassword;
		categories = {};
		
		for(var key in data)
		{	
			var budget_and_spending = new Array(data[key].amountBudgeted,data[key].amountSpent);
			categories[data[key].category] = budget_and_spending;
		}
		
		
		//Adding information in graphs
		userNames.push(name);
		var dataString = "";
		for(var key in categories)
		{
			pieData.push([key, categories[key][0]]);
			dataString += ("Category: " + key + "\nAmount Budgeted: " + categories[key][0] + "\nAmount Spent: "  + categories[key][1] + "\n\n");
		}
		alert(dataString);
		
	}*/

//});