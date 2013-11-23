$(document).ready(function()
{
  
	var s1 = [['Sony',7], ['Samsumg',13.3], ['LG',14.7], ['Vizio',5.2], ['Insignia', 1.2]];
         
    var categories = $.jqplot('categories', [s1], 
	{
	
		seriesColors: [ "#DD1E2F", "#EBB035", "#06A2CB", "#218559","#D0C6B1" ,"192823",
		                "#90CA77","#81C6DD","#E9B64D"],
		
        grid: 
		{
            drawBorder: false, 
            drawGridlines: false,
            background: '#ffffff',
            shadow:false
        },
		
        axesDefaults: 
		{
             
        },
		
        seriesDefaults:
		{
            renderer:$.jqplot.PieRenderer,
            rendererOptions: 
			{
                showDataLabels: true
            }
        },
        legend:
		{
            show: true,
            rendererOptions: 
			{
                numberRows: 1
            },
            location: "s",
			xoffset: 0,        // pixel offset of the legend box from the x (or x2) axis.
			yoffset: 160,        // pixel offset of the legend box from the y (or y2) axis.
        },
		
		title: 
		{
			text: 'Categories',  
			show: true,
		}
		
    }); 
});