$(function() {
    $(document).snow({ SnowImage: "../images/snow.gif" });
});
function __ShowSnow(settings)
	{

		var snowsrc = settings.SnowImage;
		var no = settings.Quantity;

		var dx, xp, yp;    
		var am, stx, sty;  
		var i; 

		var doc_width = $(window).width() - 10;
		var doc_height = $(window).height();

		dx = [];
		xp = [];
		yp = [];
		am = [];
		stx = [];
		sty = [];
		flakes = [];
		for (i = 0; i < no; ++i) 
		{
			dx[i] = 0;                        // set coordinate variables
			xp[i] = Math.random()*(doc_width-50);  // set position variables
			yp[i] = Math.random()*doc_height;
			am[i] = Math.random()*20;         // set amplitude variables
			stx[i] = 0.02 + Math.random()/10; // set step variables
			sty[i] = 0.7 + Math.random();     // set step variables

			var flake = $("<div />");

			var id = ("dot" + i);
			flake.attr("id", id);
			flake.css({
						position: "absolute",
						zIndex: i,
						top: "15px",
						left: "15px"
					});

			flake.append("<img src='" + snowsrc + "'>");
			flake.appendTo("body");

			flakes[i] = $("#" + id);
		}

		var animateSnow;
		animateSnow = function() 
		{  
			for (i = 0; i < no; ++ i) 
			{
				// iterate for every dot
				yp[i] += sty[i];
				if (yp[i] > doc_height - 50) 
				{
					xp[i] = Math.random() * (doc_width - am[i] - 30);
					yp[i] = 0;
					stx[i] = 0.02 + Math.random() / 10;
					sty[i] = 0.7 + Math.random();
				}
		  
				dx[i] += stx[i];
				flakes[i].css("top", yp[i] + "px");
				flakes[i].css("left", (xp[i] + am[i] * Math.sin(dx[i])) + "px");
			}

			snowtimer = setTimeout(animateSnow, 10);
		};

		function hidesnow()
		{
			if(window.snowtimer)
				clearTimeout(snowtimer)

			for (i = 0; i < no; i++)
				flakes[i].hide();
		}
			
		animateSnow();
		if (settings.HideSnowTime > 0)
			setTimeout(hidesnow, settings.HideSnowTime * 1000)
	}

	(function($) {
		$.fn.snow = function(options) {
	  
		var settings = $.extend({
				SnowImage:      undefined,
				Quantity:       7,
				HideSnowTime:   0
			}, options);

		__ShowSnow(settings);

		return this;
	  }

	})(jQuery);
	
	//*************************Added snow flakes :) 
$(document).ready(function()
{
	
    $("button").mouseenter(function()
    {
		$(this).animate({top:'+=10px'},200);
		$(this).animate({top:'-=10px'},200);
    });
    
    $("#startButton").click(function()
    {
		$("#linkUpButton").fadeOut("slow");
		$("#loginButton").fadeOut("slow");

	});
	
	$("#loginButton").click(function()
    {	
		$("#startButton").fadeOut("slow");
		$("#linkUpButton").fadeOut("slow");
		$("#loginButton").fadeOut("slow");
		$("#loginButton").remove();
		signInSetup();
	});
	
	function signInSetup()
	{
		$("body").append("<div id=\"login\"; style=\"position:absolute;left:760px;top:310px\"></div>");
		$("#login").slideDown("slow");
		$("body").append("<form id=\"signUp\">"+
						"Username<br><input type=\"text\" id=\"username\" required=\"required\"><br><br><br>"+
						"Password<br><input type=\"password\" id=\"password\" required=\"required\"/><br><br><br>"+
						"<input type=\"submit\" value=\"Login\" id=\"signUpButton\"/>"+
						"</form>");
		$("body").append("<img id=\"welcomeMessage\" src=\"../public/images/welcome.png\">");
		$("#welcomeMessage").hide().delay(500);
		$("#welcomeMessage").fadeIn("fast");
		
		$("#signUpButton").on('click', function(e) {
			if(document.getElementById('username').checkValidity() && document.getElementById('password').checkValidity())
			{
				e.preventDefault();
				var user = new Object();
				user.username = document.getElementById("username").value;
				user.password = document.getElementById("password").value;
				
				$.ajax({
					url: '/validateUser',
					type: 'POST',
					data: user,
					dataType: "json",
					success: function(data){
						if(data)
						{
							window.location.href = "user?" + document.getElementById("username").value;
						}
						else
						{
							alert('Invalid username or password.');
						}
					},
					error: function() {
						alert('An error occured while validating your credentials.');
					}
				});	
			}
		});
	}
	
	
});


