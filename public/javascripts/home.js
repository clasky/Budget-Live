/*(function($){
$.fn.snow=function(options)
{var $flake=$('<div id="flake" />').css(
{'position':'absolute','top':'-50px'}).html('&#10052;'),
documentHeight=$(document).height(),
documentWidth=$(document).width(),
defaults={minSize:10,maxSize:20,newOn:500,flakeColor:"#BDBDBD"},
options=$.extend({},defaults,options);
var interval=setInterval(function()
{
	var startPositionLeft=Math.random()*documentWidth-100,
	startOpacity=0.5+Math.random(),
	sizeFlake=options.minSize+Math.random()*options.maxSize,
	endPositionTop=documentHeight-40,
	endPositionLeft=startPositionLeft-100+Math.random()*200,
	durationFall=documentHeight*10+Math.random()*5000;
	$flake.clone().appendTo('body').css({left:startPositionLeft,
	opacity:startOpacity,
	'font-size':sizeFlake,color:options.flakeColor}).animate({
	top:endPositionTop,left:endPositionLeft,opacity:0.2},
	durationFall,'linear',function(){$(this).remove()});},options.newOn
	);
};
})(jQuery);
*/	
	//*************************Added snow flakes :) 
$(document).ready(function()
{
	//$.fn.snow();
    $("button").mouseenter(function()
    {
		$(this).animate({top:'+=10px'},200);
		$(this).animate({top:'-=10px'},200);
    });
    
    $("#startButton").click(function()
    {
		window.location.href = "createBudget";

	});
	
	$("#linkUpButton").click(function()
    {
		window.location.href = "linkUp";

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
							$("body").append("<div style='font-size: 15px;white-space: nowrap;font-family: \"Franklin Gothic Book\",Arial,sans-serif;color:red;position:absolute;top:510px;left:750px;'><center>Incorrect Username and/or Password.<br>Please try again.</div>");
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


