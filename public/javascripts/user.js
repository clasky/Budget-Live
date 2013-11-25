$(document).ready(function()
{
    /*$('#left-menu').sidr(
	{
      name: 'sidr-left',
      side: 'left'
    });*/
});

$(function () 
{
    $('#pieChart').highcharts(
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
            data: 
			[
                ['Groceries',   45.0],
                ['Utilites',       26.8],
                {
                    name: 'Car Payment',
                    y: 12.8,
                    sliced: true,
                    selected: true
                }
            ]
        }]
    });
    
    var chart = $('#pieChart').highcharts();

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
    
});

$(function () 
{
	$('#bar').highcharts(
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
			categories: ['Eric', 'Iris']
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
			data: [70, 50]
		}, 
		{
			name: 'Spent',
			data: [30, 50]
		}]
	});
});

$(function () 
 {
	$('#SpendingOverTime').highcharts(
	{
		title: 
		{
			text: 'Spending Over Time Frame',
			x: -20 //center
		},
		xAxis: 
		{
			categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
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
			name: 'Eric',
			data: [20,10,15,5]
		},
		{
			name: 'Iris',
			data: [10,30,10,20]
		}]
	});
	});
    

