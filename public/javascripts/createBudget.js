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
		$(".words").fadeOut("fast");
		$(".words").remove();
		obj2.remove();
	}
	
	function timeFrame()
	{
		clean($(".words"),$("#ready"));
		//$("body").append("<img id = \"currentImage\" src=\"../images/timeFrame.png\""+
		//"width=\"542\" height=\"326\" ; style=\"position:absolute;left:270px;top:170px\">");
		/*$("body").append("<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 240px; left: 350px; color: #017890;font-size: 40px;font-family: Blue Highway'>"+
		"Choose your</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 280px; left: 350px;font-family: Blue Highway;font-size: 40px;'>TIME FRAME</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 310px; left: 350px; color: #992424; font-family: Blue Highway;font-size: 55px;'>IT'S IMPORTANT </div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 360px; left: 350px; color: #992424; font-family: Blue Highway;font-size: 55px;'>WE HOW LONG YOUR</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 410px; left: 350px;font-family: Blue Highway;font-size: 30px;'>MONEY IS SUPPOSE TO LAST</div>");
		$("#currentImage").hide().delay(500);
		$("#currentImage").fadeIn("fast");
		$("body").append("<button id=\"twoWeek\">2 Week </button><button id=\"oneMonth\">1 Month"+
			"</button>");
		$("#twoWeek").hide().delay(500);
		$("#oneMonth").hide().delay(500);
		$("#twoWeek").fadeIn("fast");
		$("#oneMonth").fadeIn("fast");*/
		timeFrameAnimation();
	}
	
	function timeFrameAnimation()
	{   
		/*buttonAnimation();
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
		*/
			budgetAmount();
		
		//});
	}
	
	function budgetAmount()
	{
		$("body").append("<div id = 'backgroundTotal'></div>");
		$("body").append("<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 150px; left: 457px; color: #017890;font-size: 30px;font-family:Verdana,sans-serif;'>"+
		"<strong>Enter your</strong></div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: relative;top: 140px; left: 450px;font-family: Verdana,sans-serif;font-size: 30px;'>TOTAL</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: relative;top: 135px; left: 450px; color: #FFBF00; font-family: Verdana,sans-serif;font-size: 40px;'>BUDGET AMOUNT</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: relative;top: 135px; left: 450px;font-family: Verdana,sans-serif;font-size: 30px;'>THIS IS THE AMOUNT YOU WILL</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: relative;top: 135px; left: 450px;font-family:Verdana,sans-serif;font-size: 20px;'>GAIN IN YOUR BUDGET EVERY 1st OF THE MONTH</div>");
		$("#budgetStyle").hide().delay(500);
		$("#budgetStyle").fadeIn("fast");
		$("body").append("<div style=\"font-family: Blue Highway D Type;position:absolute;left:490px;top:370px; font-size: 50px;\">$<input id=\"budgetTotal\" type=\"text\" placeholder=\"Budget Amount\"/></div> ");
		$("#budgetTotal").hide().delay(500);
		$("#budgetTotal").fadeIn("fast");
		$("body").append("<button id=\"enterAmount\">add</button>");
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
				clean($("#backgroundTotal"), $("#enterAmount"));
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
		//$("body").append("<img id = \"currentImage\" src=\"../images/budgetCategories.png\""+
		//"width=\"694\" height=\"509\" ; style=\"position:absolute;left:600px;top:140px\">");
		//$("#currentImage").hide().delay(500);
		//$("#currentImage").fadeIn("fast");
		$("body").append("<div id = 'backgroundCateg'></div>");
		$("body").append(
		"<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 140px; left: 730px;font-family: Verdana,sans-serif ;font-size: 40px; color: #FFBF00;'><strong>ADD CATEGORIES</strong></div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 195px; left: 780px; color: #992424; font-family: Verdana,sans-serif;font-size: 30px;'>to YOUR BUDGET</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 240px; left: 760px;font-family: Verdana,sans-serif;font-size: 20px;'>THIS IS THE AMOUNT YOU WILL</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 270px; left: 730px;font-family: Verdana,sans-serif;font-size: 20px;color: #017890;'>GAIN IN YOUR BUDGET EVERY MONTH</div>");
		$("body").append("<input id=\"categoryChoice\" type=\"text\" placeholder=\"Category\"/> ");
		$("#categoryChoice").hide().delay(800);
		$("#categoryChoice").fadeIn("fast");
		$("body").append("<div><input id = \"categoryTextBox\" type=\"text\" placeholder=\"Amount\"/></div>");
		$("#categoryTextBox").hide().delay(800);
		$("#categoryTextBox").fadeIn("fast");
		$("body").append("<input type=\"submit\" value=\"Add\" id=\"addCategory\"/>");
		$("body").append("<button id=\"next\">Finish</button>");
		$("#next").hide().delay(500);
		$("#next").fadeIn("fast");
		buttonAnimation();
		//$("body").append("<button id =\"addCategory\">add</button>");
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
			if ( catName !="" )
			{
				if ( amount > 0)
				{
					var totBudget = parseInt(budget.totalBudget,10);
					if (amount <= left)
					{
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
						alert("You don't have THAT much!");
					}
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
			$("#categoryChoice").val("");
			$("#categoryTextBox").val("");
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
		clean($("#backgroundCateg"), $("#next"));
		clean($("div"), $("#next"));
		//$("#deletionInstr").fadeOut("fast");
		$("category").fadeOut("fast");
		$("#addCategory").fadeOut("fast");
		$("#categoryChoice").fadeOut("fast");
		$("#categoryTextBox").fadeOut("fast");
		$("category").remove();
		var chart = $('#pieChart').highcharts();
		$('#pieChart').fadeOut("fast");
		chart.destroy();
		createPieChart($("#pieChart"));
		$("#amountLeft").html("");
		registrationForm();
	}
	
	function registrationForm()
	{
		$("body").append("<img src=\"../public/images/BudgetLiveLogo_new.jpg\" width=\"598\" height=\"120\" ; style=\"position:absolute;left:180px;top:350px\">");
		$("body").append("<div class= 'words'; style= 'white-space: nowrap;position: absolute;top: 170px; left: 190px; color: #017890;font-size: 50px;font-family:Verdana,sans-serif;'>"+
		"<strong>Loved how YOU</strong></div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: relative;top: 230px; left: 185px;font-family: Verdana,sans-serif;font-size: 30px;'>SET UP YOUR BUDGET?</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: relative;top: 235px; left: 185px; color: #FFBF00; font-family: Verdana,sans-serif;font-size: 40px;'>SIGN UP TODAY</div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: relative;top: 235px; left: 185px;font-family: Verdana,sans-serif;font-size: 30px;'> </div>"
		+"<div class= 'words'; style= 'white-space: nowrap;position: relative;top: 240px; left: 185px;font-family:Verdana,sans-serif;font-size: 20px;'>It's so easy, you'll love it!</div>");
		
		$("body").append("<registration></registration>");
		
		
		$("body").append("<form id=\"signUp\">"
		+"E-mail<br><input type=\"text\" id=\"user_email\" required=\"required\"/><br><br><br>"
		+"First Name<br><input type=\"text\" id=\"first_name\" required=\"required\"/><br><br><br>"
		+"Username<br><input type=\"text\" id=\"username\" required=\"required\"/><br><br><br>"
		+"Password<br><input type=\"password\" id=\"password\" required=\"required\"/><br><br><br>"
		+"Confirm Password<br><input type=\"password\" id=\"confirm_password\" required=\"required\"/><br><br><br>"
		+"<input type=\"submit\" value=\"Sign Up\" id=\"signUpButton\"/></form>");
		
		$("#signUpButton").on('click', function(e) {
			if(document.getElementById('user_email').checkValidity() && document.getElementById('first_name').checkValidity()
			   && document.getElementById('username').checkValidity() && document.getElementById('password').checkValidity()
			   && document.getElementById('confirm_password').checkValidity())
			{
				e.preventDefault();
				if(document.getElementById("password").value === document.getElementById("confirm_password").value)
				{
					var user = new Object();
					user.name = document.getElementById("first_name").value;
					user.username = document.getElementById("username").value;
					user.email = document.getElementById("user_email").value;
					user.password = document.getElementById("password").value;
					user.budget = budget;
					
					$.ajax({
						url: '/validateUniqueUser',
						type: 'POST',
						data: user,
						dataType: "json",
						success: function(data){
							if(data)
							{
								 $.ajax({
									url: '/addNewUser',
									type: 'POST',
									data: user,
									dataType: "json"
								});
								
								createFormAndSubmit(user.username, "user?");
							
							}
							else
							{
								alert('A budget with your username and email already exist.');
							}
						},
						error: function() {
							alert('An error occured while validating your credentials.');
						}
					});
				}
				else
				{
					alert('Your password and confirmed password don\'t match');
				}
			}
		});
	}
	
		//helper function to create the form
	 function getNewSubmitForm(){
		 var submitForm = document.createElement("FORM");
		 document.body.appendChild(submitForm);
		 submitForm.method = "POST";
		 return submitForm;
	 }

	 //helper function to add elements to the form
	 function createNewFormElement(inputForm, inputType, elementName, elementValue) {
		 var inputElement = document.createElement("INPUT");
		 inputElement.name = elementName;
		 inputElement.type = inputType;
		 try {
			inputElement.value = elementValue;
		 } catch(err) {
			alert(err.description);
		 }
		 inputForm.appendChild(inputElement);
		 return inputElement;
	 }

	 //function that creates the form, adds some elements
	 //and then submits it
	 function createFormAndSubmit(username, action){
		 var submitForm = getNewSubmitForm();
		 createNewFormElement(submitForm, "HIDDEN", "loggedIn", true);
		 submitForm.action= action + username;
		 submitForm.submit();
	 }
	
	function buttonAnimation()
	{
		$("button").mouseenter(function()
		{
			$(this).animate({top:'-=10px'},200);
			$(this).animate({top:'+=10px'},200);
		});
	}
	
    
});

