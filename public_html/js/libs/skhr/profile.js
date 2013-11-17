/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    var skhr_id = 85;
    
    // getting INITIAL data from the server
    
    // get user info
    var promise_user = rest_caller.getUser({"skhr_id":skhr_id});

    promise_user.done(
            function(data)
            {
                template_generator.user = data.user;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                template_generator.displayUser("#user_info", template_generator.user);                
            });
           
    // get user fans
    var promise_user_follows = rest_caller.getUserFollows({"skhr_id":skhr_id});

    promise_user_follows.done(
            function(data)
            {
                template_generator.user_follows = data.user_follows;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                $(".statistics3 .fans").val( 'Fans('+template_generator.user_follows.length+')');                
            });
                
            
    // get user following
    var promise_user_followed = rest_caller.getUserFollowed({"skhr_id":skhr_id});

    promise_user_followed.done(
            function(data)
            {
                template_generator.user_followed = data.user_followed;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                $(".statistics3 .following").val( 'Following('+template_generator.user_followed.length+')');                
            });
         
    // get user tutorials
    var promise_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id});

    promise_tutorials.done(
            function(data)
            {
                template_generator.user_tutorials = data.tutorials;
                
                $('.user_tutorials').text(template_generator.user_tutorials.length);
                
            });
    
    // get user achievements gallery and scroll it 
    
    var slider_timer;

    var promise_user_achievements = rest_caller.getUserAchievements({"skhr_id":skhr_id});

    promise_user_achievements.done(
            function(data)
            {
                template_generator.user_achievements = data.user_achievements;  
                template_generator.displayAchievementsGallery(  '.achievements_window',
                                                                template_generator.user_achievements);
                                                                
                //alert("Achievements received");
                var window_width =  $(".achievements_gallery").parent().width();
                //alert(window_width);
                //alert(template_generator.user_achievements.length);
                var number_of_windows = Math.ceil(template_generator.user_achievements.length/5);
                //alert(number_of_windows);
                $('.achievements_gallery').css('width', window_width*number_of_windows);
                                                                
                // Autoslide
                slider_timer = setInterval(function()
                {
                    scrollRight( ".achievements_gallery", '5', 'slow', 'slow');
                } , 1000);  
               
   
                $(".achievements_scroller").mouseover(function() {
                    clearInterval(slider_timer);
                    //alert('over');
                    //$(this).unbind('mouseover');
                });

                $(".achievements_scroller").mouseleave(function() {
                    slider_timer = setInterval(function()
                    {
                        scrollRight( ".achievements_gallery", '5', 'slow', 'slow');
                    } , 1000);      
                    //alert('out');
                    //$(this).unbind('mouseover');
                });                                            
                
                
            });
           
    
    $( ".statistics3 .arrow_left img" ).click(
        function() {
            scrollLeft( ".achievements_gallery", "1", "slow");
        });
    
    $( ".statistics3 .arrow_right img" ).click(
        function() {
            scrollRight( ".achievements_gallery", "1", "slow", "fast");
        });

    /*
    */
   
   
   
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