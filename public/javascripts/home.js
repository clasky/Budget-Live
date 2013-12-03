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
		$("body").append("<form method=\"POST\" action=\"/login\" id=\"signUp\">"+
						"Username<br><input type=\"text\" name=\"username\" id=\"username\"><br><br><br>"+
						"Password<br><input type=\"password\" name=\"password\" id=\"password\"/><br><br><br>"+
						"<input type=\"submit\" value=\"Login\" id=\"signInButton\"/>"+
						"</form>");
		$("body").append("<img id=\"welcomeMessage\" src=\"../public/images/welcome.png\">");
		$("#welcomeMessage").hide().delay(500);
		$("#welcomeMessage").fadeIn("fast");
		goToUserProfile();
	}
	
	function goToUserProfile()
	{
		$("#signIn").click(function()
		{
			window.location.href = "user";
		});
	}
    
    
});


