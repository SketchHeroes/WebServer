/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function mycarousel_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};


 


jQuery(document).ready(function(){

	//general 	
	
	
	jQuery(".replacethumb").each(function(){
		var l  =jQuery(this).attr("src");
		jQuery(this).html("<img src='"+l+"' class='thumb'> ");
	});

$("img").error(function () {
  $(this).unbind("error").attr("src", "/images/no_image.gif");
});
 
$("input[name='search']").attr("autocomplete","off");

$('a[rel*=facebox]').click(function(){
	var hrefs = jQuery(this).attr("href");
	$.fancybox.open({
		href : hrefs,
		type : 'iframe',
		padding : 5
	});
	return false;
	
});

// LIKED Video Click 
 $(".ilikeit").click(function(){
 	$(this).text("Liked");
 	$(this).addClass("liked"); 

	$.get("/video/like/id/"+$(this).attr("rel")); 

 });
 




// Change Password Click Function  
$(".changepassword").click(function(){
	var rele = $(this).attr("rel");
	$.fancybox.open({
		href : "/account/changepassword/id/"+rele,
		 'type'          :   'ajax',
		padding : 5
	});
	return false ;
	
});







// HEre we gonna Show Popup stuff 
jQuery('a.join').click(function(){
	var returns = false; 
	var href= jQuery(this).attr("href");
   jQuery.get("/account/getloginform",function(data){ 

   if(data!="0"){ 
   		jQuery(".tempcontent").html(data);
   		jQuery(".tempcontainer").show(); 
   	}else{
  		window.location =href; 
   			  returns = true; 
        	         }

   });
 
return returns; 
});
 // End Showing Popup 
jQuery('.options a.register').click(function(){
	var returns = false; 
	var href= jQuery(this).attr("href");
   jQuery.get("/account/getregisterform",function(data){
        if(data!="0"){ 
        			jQuery(".tempcontent").html(data);
   		jQuery(".tempcontainer").show();  
   		jQuery("#terms").show();
        }else{
        	window.location =href; 
        	returns = true; 
        }
   	
   });

return returns; 
}); 


 	jQuery(".top_users .topvideoswitch a").click(function(){
 			var rel = jQuery(this).attr("rel"); 
 				     jQuery(" .top_users .top_video ").hide(); 
 				     jQuery(".top_users .topvideoswitch li").removeClass("active"); 
 				     jQuery(this).parent().addClass("active");
 					 jQuery(".top_users .top_video_"+rel).show();
	});


	jQuery(".mid_part .topvideoswitch a").click(function(){
 			var rel = jQuery(this).attr("rel"); 
 				     jQuery(" .mid_part .top_video ").hide(); 
 				     jQuery(".mid_part .topvideoswitch li").removeClass("active"); 
 				     jQuery(this).parent().addClass("active");
 					 jQuery(".mid_part .top_video_"+rel).show();
	});

	

	jQuery("#remind").submit(function(){
				jQuery("#remind input[type='submit']").attr("disabled","disabled");
					
		return true; 
	});
	
	// Show SubCategories  
	jQuery(".dropdown-toggle").mouseenter(function(){
		 jQuery(this).parent().find("ul").show();
		
	});

	jQuery(".dropdown-menu").mouseleave(function(){
		 jQuery(this).hide();
		
	});

	//tabs on index page
	var max = 4 ; 
	var current = 1; 
	var interval  = setInterval(function(){
		if(current>=max) 
			current =1 ; 
		var tab_id=current;
		jQuery(".tabs li a").removeClass("active");
		jQuery(".tabs li a:eq("+(current-1)+")").addClass("active");
		jQuery(".tabs .content div").stop(false,false).hide();
		jQuery(".tab"+tab_id).stop(false,false).show();
		current ++; 
	},3000); 
	
	
	jQuery(".tabs li a").each(function (i) {
		jQuery(".tabs li a:eq("+i+")").click(function(){
			var tab_id=i+1;
			jQuery(".tabs li a").removeClass("active");
			jQuery(this).addClass("active");
			jQuery(".tabs .content div").stop(false,false).hide();
			jQuery(".tab"+tab_id).stop(false,false).show();
			clearInterval(interval);
			return false;
		})
	}); 
 // End Tabs 
	
	
	
	//carousel
	
	
	jQuery('.carousel ul').jcarousel({
        auto: 4,
        wrap: 'last',
		scroll: 1,
		animation: "slow",
        initCallback: mycarousel_initCallback
    });
	
	//placeholder
	
	jQuery('input[placeholder], textarea[placeholder]').placeholder();
	
})

jQuery(window).load(function() {

	//slider
	jQuery('#slider').nivoSlider({
		effect: 'fade', // Specify sets like: 'fold,fade,sliceDown'
        slices: 15, // For slice animations
        boxCols: 8, // For box animations
        boxRows: 4, // For box animations
        animSpeed: 500, // Slide transition speed
        pauseTime: 3000, // How long each slide will show
        startSlide: 0, // Set starting Slide (0 index)
        directionNav: true, // Next & Prev navigation
        controlNav: true, // 1,2,3... navigation
        pauseOnHover: true // Stop animation while hovering
	});
	
	//scrollbar 
	
	jQuery('.blog .content').jScrollPane();
});