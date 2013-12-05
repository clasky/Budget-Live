


$(document).ready(function()
{
   
	$("#addSpent").click( function()
	{
		var currentdate = new Date(); 
		var datetime = "Added: " 
                + (currentdate.getMonth()+1)  + "/" 
				+ currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
		var line = $('#SpendingOverTime').highcharts()
		var x = (currentdate.getMonth()+1)  + "/" 
				+ currentdate.getDate();
		var y = parseInt($("#spent").val());
		line.series[0].addPoint([x, y]);
		//alert("Spending $"+ $("#spent").val() + " " + datetime);
		//updateCategorySpent();
		//alert($("h1").html());
		$("#spent").val("");
	});
	
	function updateCategorySpent()
	{
		for(var key in categories)
		{
			if ( key === $("h1").val())
			{
				alert(key);
				/*userOneBar = [];
				userTwoBar = [];
				userOneBar.push(categories[key][0]- categories[key][1]);
				userTwoBar.push(categories[key][1] );
				var bar = $('#barChart').highcharts();
				bar.destroy();
				createBarChart($('#barChart'));*/
			}
		}
	}
	
	var name;
	var email;
	var username;
	var categories = {};
	var dataString;
	var pieData = [];
	var userNames = [];
	var userOneBar = [];
	var userTwoBar = [];
	var timeFrameLine = [];
	var seqSpending = [];

	//This is the request to get the JSON object

	$.ajax(
	{
		type: "GET",
		url: '/loginData',
		dataType: 'json',
		success: function(data){
			handleData(data);
		},
		error: function(responseText){
			alert('Error: ' +  responseText.toString());
		}
	});
	
	function handleData(data)
	{
		//If successful we assign the global variables to the JSON object data
		name = data[0].name;
		alert(name);
		email = data[0].email;
		username = data[0].username
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
		userNames.push(username);
		for(var key in categories)
		{
			pieData.push([key, categories[key][0]]);
			//dataString += ("Category: " + key + "\nAmount Budgeted: " + categories[key][0] + "\nAmount Spent: "  + categories[key][1] + "\n\n");
		}
		
		//creating charts
		createPieChart($('#pieChart'));
		createBarChart($('#barChart'));
		createLineChart($('#SpendingOverTime'));
		var linegraph = $('#SpendingOverTime').highcharts();
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
												userOneBar = [];
												userTwoBar = [];
												userOneBar.push(categories[key][0]- categories[key][1]);
												userTwoBar.push(categories[key][1] );
												var bar = $('#barChart').highcharts();
												bar.destroy();
												createBarChart($('#barChart'));
											}
										}
										return;
									}
								}
								$("h1").html("<center>Overall Budget");
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
				data: userOneBar
			}, 
			{
				name: 'Spent',
				data: userTwoBar
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
				text: 'Spending over Time',
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
				data: seqSpending
			}]
		});
	}
	
});


    

