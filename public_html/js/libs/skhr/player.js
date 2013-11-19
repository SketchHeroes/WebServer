/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    var content_id = 22;
    
    // getting INITIAL data from the server
    
    //var video_id = "24";	
    //var load_url = 'http://www.sketchheroes.com/video/get?artwork_id=24';
    var video_id = "22";	
    var load_url = 'http://elasticbeanstalk-us-east-1-593694239023.s3.amazonaws.com/uploads/tutorial_metadatas/85/528b227b8d9d1iyr862c67_1313574147.txt';	
    var flash ="SHPlayer139.swf"; 

    var flashvars = {
        artwork_id:video_id,
        load_url:load_url

            };
    var params = {
            menu: "false",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            autoplay: "true",
            wmode:"transparent",
            bgcolor: "#FFFFFF"
    };
    var attributes = {
                  id:"flash_video_player",
                  name:"flash_video_player"
          };

    swfobject.embedSWF(flash, "altContent", "675", "452", "10.0.0", "expressInstall.swf", flashvars, params, attributes);

    
    
    
// -----------------------TUTORIAL DATA-----------------------------------------

    var promise_tutorial = rest_caller.getTutorial({"content_id":content_id});
    
    promise_tutorial.done(
            function(data)
            {
                template_generator.user_tutorial = data.tutorial; 
                
                //alert($(".player object param[name=flashvars]").val());
                //alert(template_generator.user_tutorial.tutorial_path);
                
                $(".player object param[name=flashvars]").val("artwork_id=24&amp;load_url="+template_generator.user_tutorial.tutorial_path)
            }); 
   
//------------------------USER TUTORIAL-----------------------------------------

    var promise_user_tutorials;
    var tutorial_filter = $( "#user_tutorials_gallery .active" ).attr('id');
    
    //alert(tutorial_filter);

    switch (tutorial_filter)
    {
        case "most_recent":
                promise_user_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"tutorial_order_by":{"order_by_content_id":"DESC"}});
            break;
        case "top_rated":
                promise_user_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"tutorial_count":{"count_likes_skhr":"DESC"}});
            break;
        case "most_viewed":
                promise_user_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"tutorial_count":{"count_views_skhr":"DESC"}});
            break;
    } 
    
    promise_user_tutorials.done(
            function(data)
            {
                template_generator.user_tutorials = data.tutorials; 
                
                var length = template_generator.user_tutorials.length;
                template_generator.removeGallery("#user_tutorials_gallery");
                template_generator.addGallery("#user_tutorials_gallery", length);
                template_generator.displayTutorialGallery("#user_tutorials_gallery", template_generator.user_tutorials);
                
            }); 
    
    // user tutorials period buttons

    $( "#user_tutorials_gallery .period" ).click(function(event) {
        
        $("#user_tutorials_gallery .gallery").fadeOut();
        //alert("clicked");
        //alert(event.target.id);
        $( "#user_tutorials_gallery #most_recent" ).attr("src","images/most_recent_unselected.png").removeClass("active");
        $( "#user_tutorials_gallery #top_rated" ).attr("src","images/top_rated_unselected.png").removeClass("active");
        $( "#user_tutorials_gallery #most_viewed" ).attr("src","images/most_viewed_unselected.png").removeClass("active");
        $( "#user_tutorials_gallery #"+event.target.id ).attr("src","images/"+event.target.id+"_selected.png").addClass("active");
        //alert( "id = "+$(this).id );
        
        var tutorial_filter = $( "#user_tutorials_gallery .active" ).attr('id');
    
        //alert(tutorial_filter);

        switch (tutorial_filter)
        {
            case "most_recent":
                    promise_user_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"tutorial_order_by":{"order_by_content_id":"DESC"}});
                break;
            case "top_rated":
                    promise_user_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"tutorial_count":{"count_likes_skhr":"DESC"}});
                break;
            case "most_viewed":
                    promise_user_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"tutorial_count":{"count_views_skhr":"DESC"}});
                break;
        } 

        promise_user_tutorials.done(
                function(data)
                {
                    template_generator.user_tutorials = data.tutorials; 

                    var length = template_generator.user_tutorials.length;
                    template_generator.removeGallery("#user_tutorials_gallery");
                    template_generator.addGallery("#user_tutorials_gallery", length);
                    template_generator.displayTutorialGallery("#user_tutorials_gallery", template_generator.user_tutorials);

                }); 
    });

  

//==============================================================================
    
});  
   
/* ------------------------------FUNCTIONS----------------------------------- */
   
function scrollLeft( target, scrollsPerWindow, speedForward)
{
    var scrollAmount = $(target).width() - $(target).parent().width();     

    var currentPos = Math.abs(parseInt($(target).css('left')));

    // Scroll half-a-screen by default
    var nextScroll = $(target).parent().width()/scrollsPerWindow;

    // But if there isn’t a FULL scroll left,
    // only scroll the remaining amount.
    if (currentPos < nextScroll) 
    {
        nextScroll = currentPos;
    }

    if (currentPos > 0) 
    {
        // Scroll left
        $(target).animate({'left':'+=' + nextScroll}, speedForward);
    }
}
   
function scrollRight( target, scrollsPerWindow, speedForward, speedBack)
{
    var scrollAmount = $(target).width() - $(target).parent().width();

    var currentPos = Math.abs(parseInt($(target).css('left')));

    var remainingScroll = scrollAmount - currentPos;

    // Scroll half-a-screen by default
    var nextScroll = $(target).parent().width()/scrollsPerWindow;

    if (remainingScroll < nextScroll) 
    {
        nextScroll = remainingScroll;
    }

    if (currentPos < scrollAmount) 
    {
        // Scroll left
        $(target).animate({'left':'-=' + nextScroll}, speedForward);
    }
    else
    {
        // Scroll right
        $(target).animate({'left':'0'}, speedBack);
    }
}