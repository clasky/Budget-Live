$(document).ready(function()
{
    /*$('#left-menu').sidr(
	{
      name: 'sidr-left',
      side: 'left'
    });*/
	
//=======================================================================================
//		Iris here is where we are getting the database data from the back end.
//		Feel free to change how this works if you want.  I made some "global"? variables
//		email, username, and a map of arrays for categories.  The arrays hold the 
//		amount budgeted data and the amount spend data. Enjoy!
//
//		The database schema is email, username, category, ammountBudgeted, ammountSpent.
//=======================================================================================

	//Global? variables for user data
	var email;
	var username;
	var categories = {};

	//This is the request to get the JSON object
	$.ajax({
	type: "GET",
	url: '/loginData',
	dataType: 'json',
	success: function(data){
		
		//If successful we assign the global variables to the JSON object data
		email = data[0].email;
		username = data[0].username
		categories = {};
		
		//Look through the categories to get the amount budgeted and amount spent.  They are placed in a map
		//the key is the category and the values are an array which contains amount Budgeted in position 0 and amount Spent in position 1.
		for(var key in data)
		{	
			var budget_and_spending = new Array(data[key].ammountBudgeted,data[key].ammountSpent);
			categories[data[key].category] = budget_and_spending;
		}
			
		//For convenience in printing things out I then put everything into a string var so I could show all the data in one alert.
		var dataString = "Username: " + username + "\nEmail: " + email + "\n\n";
		for(var key in categories)
		{
			dataString += ("Category: " + key + "\nAmmount Budgeted: " + categories[key][0] + "\nAmmount Spent: "  + categories[key][1] + "\n\n");
		}
		
		alert(dataString);
	},
	error: function(responseText){
		alert('Error: ' +  responseText.toString());
	}
	});
//=======================================================================================
//=======================================================================================
	
	
	var pieData = [
		['Groceries', 45.0],
		['Utilites',  26.8],
		{
			name: 'Car Payment', 
			y: 12.8, // value
			sliced: true,
			selected: true
		}
    ];
	
	var userNames = ["Eric","Iris"];
	var userOneBar = [70, 50];
	var userTwoBar = [30, 50];
	var timeFrameLine = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
	
	
	//creating charts
	
    createPieChart($('#pieChart'));
	createBarChart($('#barChart'));
	createLineChart($('#SpendingOverTime'));
	var linegraph = $('#SpendingOverTime').highcharts();

	
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
				data: [20,10,15,5]
			}]
		});
	}
	
	
});


    

