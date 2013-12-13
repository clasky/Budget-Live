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
		url: '/budgetData',
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
		dataType: 'json',
		success: function(data){
			handleTransactionData(data);
		},
		error: function(responseText){
			alert('Error: ' +  responseText.toString());
		}
	});
	
	$("#addSpent").click( function()
	{
		var value = parseFloat($("#spent").val());
		var chosen = false;
		for(var key in categories)
		{
			if ( key === $("h1").text())
			{
				chosen = true;
				var total = categories[key][0];
				var spent = categories[key][1];
				var left = total - spent - value;
				if ( left >= 0 )
				{
					addTransaction();
					$("#spent").val("");
				}
				else
				{
					alert("You'll go over your budget buddy.");
				}
			}
		}
		if ( !chosen)
		{
			alert("WOAH! Make sure you pick a category.");
		}
		$("#spent").val("");
	});
	
	function addTransaction()
	{
		var currentdate = new Date(); 
		var line = $('#SpendingOverTime').highcharts()
		var x = (currentdate.getMonth()+1)  + "/" 
				+ currentdate.getDate() + "/"
                + currentdate.getFullYear();
		var y = parseInt($("#spent").val());
		totalSpending = totalSpending + y;
		line.series[0].addPoint([x, totalSpending]);
		updatebBar(y);
		
		var transaction = new Object();
		transaction.budgetId = budgetId;
		transaction.category = $("h1").text();
		transaction.amountSpent = y;
		transaction.date = x;
		transactions[transSize] = transaction;
		transSize = transSize + 1;
		
		var user = new Object();
		user.name = name;
		user.transaction = transaction;
		
		$.ajax({
            url: '/updateBudget',
            type: 'POST',
            data: user,
			dataType: "json"
		});
		/***************************************************************
		Cameron, this is where you would want to send over 'transaction'
		back to the DB. 
		
		
		****************************************************************/
		
	}
	
	function updatebBar(spent_)
	{
		for(var key in categories)
		{
			if ( key === $("h1").text())
			{
				remaining = [];
				spent = [];
				categories[key][1] = categories[key][1] +spent_;
				remaining.push(categories[key][0]- categories[key][1]);
				spent.push(categories[key][1] );
				var bar = $('#barChart').highcharts();
				bar.destroy();
				createBarChart($('#barChart'));
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
		createPieChart($('#pieChart'));
		createBarChart($('#barChart'));
		createLineChart($('#SpendingOverTime'));
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
	
	function handleTransactionData(data)
	{
		for(var key in data)
		{	
			//alert ("key: " + key);
			var transaction = new Object();
			transaction.category = data[key].category;
			transaction.amountSpent = data[key].transactionAmount;
			transaction.date = data[key].date;
			transactions[key] = transaction;
			transSize = transSize + 1;
		}
		
		updateLine();
	}
	
	function updateLine()
	{
		for(var key in transactions)
		{
			var line = $('#SpendingOverTime').highcharts()
			var x = transactions[key].date;
			var y = transactions[key].amountSpent;
			totalSpending = totalSpending + y;
			line.series[0].addPoint([x, totalSpending]);
			
		}
		
	}

	// pie chart animation
    $.each(chart.series[0].data, function( index, value ) 
	{
        $('#extra-data').append('<li id="extra-item-'+index+'" class="more" data-id="'
		+index+'">'+value.name+'  '+value.y+' click here <div id="hidden-content-'+index
		+'" style="display:none" class="hiddenable">more data</div></li>');
    });
    
    $(".more").click(function()
	{
        toggleElement($(this).attr('data-id'));
    });
	
    $(".hiddenable").click(function(event)
	{
		event.stopPropagation();
		toggleElement($(this).parent().attr('data-id'));
    });   
    
    function toggleElement(index)
	{
		toggleLI(index);
        chart.series[0].data[index].select();
           
    }
    
    function toggleLI(index)
	{
		$(".hiddenable").not(
		$(("#hidden-content-"+index))).hide("slow",function()
	    {
			   
	    });
	    $(("#hidden-content-"+index)).toggle( "slow" );
    }
	
	// creates Pie Chart
	function createPieChart(pie)
	{
		$(pie).highcharts(
		{
			chart: 
			{
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: 
			{
				text: 'Budget Cateogories',
				//y: 100
			},
			tooltip:
			{
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: 
			{
				pie: 
				{
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: 
					{
					   enabled: false
					},
					showInLegend: true
				},
				series:
				{
					cursor: 'pointer',
					point: 
					{
						events: 
						{
							click: function() 
							{
								var chart = $('#pieChart').highcharts();
								for (var i = 0; i <  chart.series[0].data.length; i++)
								{
									if (chart.series[0].data[i] == this)
									{
										toggleLI(i);
										$("h1").html("<center>"+chart.series[0].data[i].name);
										
										for(var key in categories)
										{
											if ( key === chart.series[0].data[i].name)
											{
												remaining = [];
												spent = [];
												remaining.push(categories[key][0]- categories[key][1]);
												spent.push(categories[key][1] );
												var bar = $('#barChart').highcharts();
												bar.destroy();
												createBarChart($('#barChart'));
											}
										}
										return;
									}
								}
							}
						}
					}
				}
			},
			series: 
			[{
				type: 'pie',
				name: 'Categories',
				data: pieData
			}]
		});
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
				categories: userNames
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
	
	// creates line chart
	function createLineChart(line)
	{
		line.highcharts(
		{
			title: 
			{
				text: 'Total Spending over Time',
				x: -20 //center
			},
			xAxis: 
			{
				categories: timeFrameLine
			},
			yAxis: 
			{
				title: 
				{
					text: 'Spending (Dollars)'
				},
				plotLines: 
				[{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: 
			{
				valuePrefix: '$'
			},
			legend:
			{
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: 
			[{
				name: userNames[0],
				color: '#283175',
				data: lineSeries
			}]
		});
	}
	
});