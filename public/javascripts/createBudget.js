$(document).ready(function()
{
	var budget = new Budget();
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
		"width=\"595\" height=\"422\" ; style=\"position:absolute;left:420px;top:155px\">");
		$("#currentImage").hide().delay(500);
		$("#currentImage").fadeIn("fast");
		//$("body").append("<div id=\"budgetStyle\"><center><br>Click \"Next\" <br>When Your Amount<br>"+
		//	" Is Entered </br></br></br></center></div>");
		$("#budgetStyle").hide().delay(500);
		$("#budgetStyle").fadeIn("fast");
		$("body").append("<input id=\"budgetTotal\" type=\"text\" placeholder=\"budget amount $\"/> ");
		$("#budgetTotal").hide().delay(500);
		$("#budgetTotal").fadeIn("fast");
		$("body").append("<button id=\"enterAmount\">Next</button>");
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
				budget.total = $("#budgetTotal").val();
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
		$("body").append("<button id=\"next\">Next</button>");
		$("#next").hide().delay(500);
		$("#next").fadeIn("fast");
		buttonAnimation();
		$("body").append("<button id =\"addCategory\">add</button>");
		$("#addCategory").hide().delay(800);
		$("#addCategory").fadeIn("fast");
		categoryAddition();
		$("#next").click( function()
		{
			var list = budget.categories;
			if (list.length > 0 )
			{
				cleanCategories();
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
					
					var categ = new Category();
					categ.name = catName;
					budget.categories.push(categ);
				
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
		//chart.destroy();
		//createPieChart($("#pieChart"));
		registrationForm();
		//addCategoryAmounts();
	}
	
	/*
	function addCategoryAmounts()
	{
		
		$("body").append("<img id = \"currentImage\" src=\"../images/categoryAmountInst.png\""+
		"width=\"529\" height=\"548\" ; style=\"position:absolute;left:700px;top:100px\">");
		$("#currentImage").hide().delay(500);
		$("#currentImage").fadeIn("fast");
		//$("body").append("<div id=\"categoryAmount\"></div>");
		//$("#categoryAmount").hide().delay(500);
		//$("#categoryAmount").fadeIn("fast");
		$("body").append("<div><input id = \"categoryTextBox\" type=\"text\" placeholder=\"click on something\"/></div>");
		$("body").append("<button id =\"addAmountToCategory\">add</button>");
		$("#addAmountToCategory").hide().delay(500);
		$("#addAmountToCategory").fadeIn("fast");
		$("#categoryTextBox").hide().delay(500);
		$("#categoryTextBox").fadeIn("fast");
		$("body").append("<button id=\"next\">next</button>");
		$("#next").hide().delay(500);
		$("#next").fadeIn("fast");
		buttonAnimation();
		//$("body").append("<div id=\"progressBar\"><div></div></div>");
	}


	function layoutCategories()
	{
		basicCategoryLayout();
		var x = 340;
		var y = 220;
		var list = budget.categories;
		var layers = 1;
		for (var i = 0; i < list.length; i++) 
		{	
			var catName = list[i].name;
			$("body").append("<category title =\""+ catName 
			+"\"; style=\"position:absolute;left:"+x+"px;top:"
			+y+"px; opacity: 1; background: -webkit-gradient(linear, left bottom,"+
			" right top, color-stop(0%,rgba(169,3,41,1)),"+
			"color-stop(44%,rgba(143,2,34,1)), color-stop(100%,rgba(109,0,25,1)));\">"
			+catName+"</category>");
			$("category").hide().delay(1000);
			$("category").slideDown("slow");
			x = x +115;
			if ( x > 600)
			{
				x = 340;
				y = y + 110;
				if ( (i+1) < list.length)
				{
					layers = layers + 1;
				}
			}
		}
		
		$('#progressBar').height ((layers * 105) + 30);
			
		progress(0, $('#progressBar'));
		findClickedCategory();
	}
	
	function findClickedCategory()
	{	
		var t ="";
		$("category").click( function()
		{	
				t = $(this).attr('title')
				$("#categoryTextBox").attr("placeholder", $(this).attr('title'));
				
		});
		
		$("#addAmountToCategory").click( function()
		{
			var amount = $("#categoryTextBox").val();
			//alert("amount " + amount);
			addAmountToCategory( t, amount);
			$("#categoryTextBox").val("");
			var list = budget.categories;
			var sofar = 0;
			for (var i = 0; i < list.length; i++) 
			{	
				//alert("cate tot: " + list[i].total);
				var tot = parseInt(list[i].total,10);
				sofar = sofar + tot;
				//alert("so far: "+sofar);
			}
			var totBudget = parseInt(budget.total,10);
			var percent = sofar/ totBudget;
			if ( percent <= 1)
			{
				progress(percent*100, $('#progressBar'));
			}
			else
			{
				//$element.find('div').
				alert("We can't let you go over a 100%!");
			}
		});
		
		$("#next").click( function()
		{
			cleanCategoryPage();
		});
		
	}
	
	function cleanCategoryPage()
	{
		clean($("#categoryTextBox"), $("#next"));
		clean($("#categoryAmount"),$("#addAmountToCategory"));
		clean( $("#progressBar"), $("category"));
		registrationForm();
	}
	
	*/
	function registrationForm()
	{
		$("body").append("<img id = \"currentImage\" src=\"../images/signUp.jpg\""+
		"width=\"587\" height=\"516\" ; style=\"position:absolute;left:200px;top:65px\">");
		$("#currentImage").hide().delay(500);
		$("#currentImage").fadeIn("fast");
		$("body").append("<registration></registration>");
		
		$("body").append("<form method=\"POST\" action=\"/createBudget\" id=\"signUp\">"
		+"E-mail<br><input type=\"text\" name=\"user_email\"/><br><br><br>"
		+"First Name<br><input type=\"text\" name=\"first_name\"/><br><br><br>"
		+"Username<br><input type=\"text\" name=\"username\"/><br><br><br>"
		+"Password<br><input type=\"password\" name=\"password\"/><br><br><br>"
		+"Confirm Password<br><input type=\"password\" name=\"confirm_password\"/><br><br><br>"
		+"<input type=\"submit\" value=\"Sign Up\" id=\"signUpButton\"/></form>");
		
		//$("#signUp").validator();
		
		setUpUserInfo();
	}
	
	function setUpUserInfo()
	{
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

	
	function addAmountToCategory( t,  amount)
	{
		var list = budget.categories;
		for (var i = 0; i < list.length; i++) 
		{	
			if ( list[i].name === t)
			{
				list[i].total = amount;
				$('[title = "'+t+'"]').css("line-height","30px");
				$('[title = "'+t+'"]').html("<br>"+list[i].name + "<br>$"+list[i].total+"</br></br>");
				
			}
		}
		
	}
	
	function progress(percent, $element)
	{
		var progressBarWidth = percent * $element.width() / 100;
		$element.find('div').animate({ width: progressBarWidth }, 500).html(percent.toPrecision(2) + "%");
    }
	
	function deleteCategory()
	{	
		$("category").click( function()
		{	
			$(this).animate({height:'-=100px' ,width: '-=100px'},800);
			t = $(this).attr('title')
			var list = budget.categories;
			for (var i = 0; i < list.length; i++) 
			{	
				if ( list[i].name === t)
				{
					list.splice(i,1);
				}
			}
			
		});
	}
	
	function buttonAnimation()
	{
		$("button").mouseenter(function()
		{
			$(this).animate({top:'-=10px'},200);
			$(this).animate({top:'+=10px'},200);
		});
	}
	
	//------------------------------- objects
	
	function Category()
	{
		this.name = "[category name]";
		this.total = 0;
		this.amountSpent = 0;
		
	}

	function Budget()
	{
		this.total = 0
		this.timeframe = "[timeframe]";
		this.categories = [];
	}

	function User(name_,budget_) 
	{
		this.name = name_;
		this.username = username_;
		this.email = email_;
		this.password = password_;
		this.budget = budget_;
	}
	
    
});


