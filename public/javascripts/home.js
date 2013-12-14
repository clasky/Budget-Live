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


