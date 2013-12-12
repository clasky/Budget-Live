$(document).ready(function()
{
	var budget = new Object();
	var pieData = [];
	
	buttonAnimation();
	$("#ready").click(function()
	{	
		timeFrame();
	});
	
	function clean(obj1, obj2)
	{   
		obj2.fadeOut("fast");
		obj1.fadeOut("fast");
		$("#currentImage").fadeOut("fast");
		$("#currentImage").remove();
		obj2.remove();
	}
	
	function timeFrame()
	{
		clean($("#currentImage"),$("#ready"));
		$("body").append("<img id = \"currentImage\" src=\"../images/timeFrame.png\""+
		"width=\"542\" height=\"326\" ; style=\"position:absolute;left:270px;top:170px\">");
		$("#currentImage").hide().delay(500);
		$("#currentImage").fadeIn("fast");
		$("body").append("<button id=\"twoWeek\">2-Week </button><button id=\"oneMonth\">1-Month"+
			"</button>");
		$("#twoWeek").hide().delay(500);
		$("#oneMonth").hide().delay(500);
		$("#twoWeek").fadeIn("fast");
		$("#oneMonth").fadeIn("fast");
		timeFrameAnimation();
	}
	
	function timeFrameAnimation()
	{   
		buttonAnimation();
		$("button").click( function()
		{
			if(this.id === "twoWeek")
			{
				budget.timeframe = "two week";
				clean($(this),$("#oneMonth"));
			}
			else if ( this.id === "oneMonth")
			{
				budget.timeframe = "one month";
				clean($(this),$("#twoWeek"));
			}
			budgetAmount();
		
		});
	}
	
	function budgetAmount()
	{
		$("body").append("<img id = \"currentImage\" src=\"../images/budgetAmount.png\""+
		"width=\"595\" height=\"513\" ; style=\"position:absolute;left:420px;top:100px\">");
		$("#currentImage").hide().delay(500);
		$("#currentImage").fadeIn("fast");
		//$("body").append("<div id=\"budgetStyle\"><center><br>Click \"Next\" <br>When Your Amount<br>"+
		//	" Is Entered </br></br></br></center></div>");
		$("#budgetStyle").hide().delay(500);
		$("#budgetStyle").fadeIn("fast");
		$("body").append("<input id=\"budgetTotal\" type=\"text\" placeholder=\"budget amount $\"/> ");
		$("#budgetTotal").hide().delay(500);
		$("#budgetTotal").fadeIn("fast");
		$("body").append("<button id=\"enterAmount\">Add</button>");
		$("#enterAmount").hide().delay(500);
		$("#enterAmount").fadeIn("fast");
		
		budgetAmountAnimation();	
	}
	
	function budgetAmountAnimation()
	{
		buttonAnimation();
		$("#enterAmount").click( function()
		{
			if ( $("#budgetTotal").val() > 0)
			{
				clean($("currentImage"), $("#enterAmount"));
				$("#budgetTotal").fadeOut("fast");
				$("#budgetStyle").fadeOut("fast");
				budget.totalBudget = $("#budgetTotal").val();
				budgetCategories();
				$("body").append("<div id=\"pieChart\"</div>");
				createPieChart($("#pieChart"));
			}
			else
			{
				alert("A budget needs some real money in there!");
			}
			
		});
	}
	
	function budgetCategories()
	{	
		budget.categories = [];
	   // $("body").append("<div class=\"container\"><div class=\"progressbar\"></div></div>");
		//progress(0, $('#progressBar'));
		$("body").append("<img id = \"currentImage\" src=\"../images/budgetCategories.png\""+
		"width=\"694\" height=\"509\" ; style=\"position:absolute;left:600px;top:140px\">");
		$("#currentImage").hide().delay(500);
		$("#currentImage").fadeIn("fast");
		$("body").append("<input id=\"categoryChoice\" type=\"text\" placeholder=\"Category\"/> ");
		$("#categoryChoice").hide().delay(800);
		$("#categoryChoice").fadeIn("fast");
		$("body").append("<div><input id = \"categoryTextBox\" type=\"text\" placeholder=\"$Amount\"/></div>");
		$("#categoryTextBox").hide().delay(800);
		$("#categoryTextBox").fadeIn("fast");
		$("body").append("<button id=\"next\">Finish</button>");
		$("#next").hide().delay(500);
		$("#next").fadeIn("fast");
		buttonAnimation();
		//$("body").append("<button id =\"addCategory\">add</button>");
		$("body").append("<input type=\"submit\" value=\"Add\" id=\"addCategory\"/>");
		$("body").append("<div id= \"amountLeft\">$"+ budget.totalBudget + "</div>");
		$("#addCategory").hide().delay(800);
		$("#addCategory").fadeIn("fast");
		
		categoryAddition();
		$("#next").click( function()
		{
			var list = budget.categories;
			if (list.length > 0 )
			{
				if ( $("#amountLeft").html() === "$0")
				{
					cleanCategories();
				}
				else
				{
					alert("Make sure to use all your money \n You have "+ $("#amountLeft").html() + " left!");
				}
			}
			else
			{
				alert("Hold on buddy! Make sure to add at least one category.");
			}
		});
		
		
	}
	
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
				formatter: function() 
				{
					return '<b>Category:'+ this.point.name +'</b><br>Amount: $'+ this.point.y
					+ '<br><b>'+this.point.percentage.toPrecision(3)  + '%</b>';
				}
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
									if (chart.series[0].data[i] === this)
									{
										var list = budget.categories;
										list.splice(i,1);
										updateProgress();
										pieData.splice(i,1);
										chart.destroy();
										createPieChart($("#pieChart"));
										
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
	
	function categoryAddition()
	{
		$("#addCategory").click( function()
		{
			var catName = $("#categoryChoice").val();
			var amount = $("#categoryTextBox").val();
			if ( catName !="" )
			{
				if ( amount > 0)
				{
					$("#categoryChoice").val("");
					$("#categoryTextBox").val("");
					pieData.push([catName,parseInt(amount)]);
					var chart = $('#pieChart').highcharts();
					chart.destroy();
					createPieChart($("#pieChart"));
					
					var categ = new Object();
					categ.name = catName;
					categ.amountBudgeted = amount;
					categ.amountSpent = 0;
					budget.categories.push(categ);
					updateProgress();
				}
				else
				{
					alert("Hey don't forget to add an amount greater than 0 \n Make sure you add NUMBERS!");
				}
			}
			else
			{
				alert("You need to name the category!\n i.e. Groceries,Games,Bills");
			}
		});
				
	}
	
	
	
	function updateProgress()
	{
		var list = budget.categories;
		var sofar = 0;
		for (var i = 0; i < list.length; i++) 
		{	
			//alert("cate tot: " + list[i].total);
			var tot = parseInt(list[i].amountBudgeted,10);
			sofar = sofar + tot;
			//alert("so far: "+sofar);
		}
		var totBudget = parseInt(budget.totalBudget,10);
		var left = totBudget - sofar;
		$("#amountLeft").html("$"+left);
	}
	
	

	function cleanCategories()
	{
		clean($("#currentImage"), $("#next"));
		//$("#deletionInstr").fadeOut("fast");
		$("category").fadeOut("fast");
		$("#addCategory").fadeOut("fast");
		$("#categoryChoice").fadeOut("fast");
		$("#categoryTextBox").fadeOut("fast");
		$("category").remove();
		var chart = $('#pieChart').highcharts();
		$('#pieChart').fadeOut("fast");
		$("#amountLeft").html("");
		registrationForm();
	}
	
	function registrationForm()
	{
		$("body").append("<img id = \"currentImage\" src=\"../images/signUp.jpg\""+
		"width=\"587\" height=\"516\" ; style=\"position:absolute;left:200px;top:65px\">");
		$("#currentImage").hide().delay(500);
		$("#currentImage").fadeIn("fast");
		$("body").append("<registration></registration>");
		
		$("body").append("<form id=\"signUp\">"
		+"E-mail<br><input type=\"text\" id=\"user_email\"/><br><br><br>"
		+"First Name<br><input type=\"text\" id=\"first_name\"/><br><br><br>"
		+"Username<br><input type=\"text\" id=\"username\"/><br><br><br>"
		+"Password<br><input type=\"password\" id=\"password\"/><br><br><br>"
		+"Confirm Password<br><input type=\"password\" id=\"confirm_password\"/><br><br><br>"
		+"<input type=\"button\" value=\"Sign Up\" id=\"signUpButton\"/></form>");
		
		$("#signUpButton").click(function()
		{
			var user = new Object();
			user.name = document.getElementById("first_name").value;
			user.username = document.getElementById("username").value;
			user.email = document.getElementById("user_email").value;
			user.password = document.getElementById("password").value;
			user.budget = budget;
			
			$.ajax({
				url: '/addNewUser',
				type: 'POST',
				data: user,
				dataType: "json"
			});
			
			window.location.href = "user";
		});
		
		//setUpUserInfo();
	}
	
	function setUpUserInfo()
	{	
		alert("Got Here");
		var list = budget.categories;
		var formStr = "id = \"additionalInfo\"><br>budget total: "+ budget.total
		+"<br>timeframe: "+ budget.timeframe + "<br>categories amount: "
		+ list.length;
		
		for (var i = 0; i < list.length; i++) 
		{
			formStr = formStr + "<br>category name: "+ list[i].name
			+ "<br>cateogry total: " + list[i].total;
		}
		
		$("body").append("<form "+formStr+"</form>");
		// line 315 is the information hidden. 
		//Comment out to make visible. 
		$("#additionalInfo").hide();
		//Function for the click handler
		signUp();
			
	}
	
	function signUp()
	{
		// Put the javascript to call your GET on the page.
		$("#signUpButton").click(function()
		{
			window.location.href = "user";
			sendData();
		});
	}
	
	function sendData() {
    $.ajax({
            url: '/createBudget',
            type: 'POST',
            contentType: 'application/json',
            data: {json: JSON.stringify({name:"Bob"})},
            dataType: 'json'
        });
        alert("Json Posted!");
    };
	
	
	function buttonAnimation()
	{
		$("button").mouseenter(function()
		{
			$(this).animate({top:'-=10px'},200);
			$(this).animate({top:'+=10px'},200);
		});
	}
	
	//------------------------------- objects
	
	/*function Category()
	{
		this.name = "[category name]";
		this.budgetAmount = 0;
		this.amountSpent = 0;
		
	}

	function Budget()
	{
		this.budgetTotal = 0
		this.timeframe = "[timeframe]";
		this.categories = [];
	}

	function User(name_,username_,email_,password_,budget_) 
	{
		this.name = name_;
		this.username = username_;
		this.email = email_;
		this.password = password_;
		this.budget = budget_;
	}*/
	
    
});


