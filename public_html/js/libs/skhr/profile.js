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
    
    var promise_user = rest_caller.getUser({"skhr_id":skhr_id});

    promise_user.done(
            function(data)
            {
                template_generator.user = data.user;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                template_generator.displayUser("#user_info", template_generator.user);                
            });
            
    var promise_user_follows = rest_caller.getUserFollows({"skhr_id":skhr_id});

    promise_user_follows.done(
            function(data)
            {
                template_generator.user_follows = data.user_follows;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                $(".statistics3 .fans").val( 'Fans('+template_generator.user_follows.length+')');                
            });
                
            
    var promise_user_followed = rest_caller.getUserFollowed({"skhr_id":skhr_id});

    promise_user_followed.done(
            function(data)
            {
                template_generator.user_followed = data.user_followed;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                $(".statistics3 .following").val( 'Following('+template_generator.user_followed.length+')');                
            });
                

    var promise_user_achievements = rest_caller.getUserAchievements({"skhr_id":skhr_id});

    promise_user_achievements.done(
            function(data)
            {
                template_generator.user_achievements = data.user_achievements;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                //$(".statistics3 .following").val( 'Following('+template_generator.user_badges.length+')');   
                template_generator.displayAchievementsGallery(  '.achievements_window',
                                                                template_generator.user_achievements);
                
            });


                   
         
    var promise_top = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"start":"0","how_many":"50"});

    promise_top.done(
            function(data)
            {
                template_generator.user_tutorials = data.tutorials;
                var length = template_generator.user_tutorials.length;
                template_generator.addGallery("#user_tutorials_gallery", length);
                template_generator.displayTutorialGallery("#user_tutorials_gallery", template_generator.user_tutorials);
                
            });
  
    
    
    // top tutorials period buttons
    
    $( "#top_tutorials_gallery .period" ).click(function(event) {
        
        $("#top_tutorials_gallery .gallery").fadeOut();
        //alert("clicked");
        //alert(event.target.id);
        $( "#top_tutorials_gallery #week" ).attr("src","images/week_unselected.png").removeClass("active");
        $( "#top_tutorials_gallery #month" ).attr("src","images/month_unselected.png").removeClass("active");
        $( "#top_tutorials_gallery #year" ).attr("src","images/year_unselected.png").removeClass("active");
        $( "#top_tutorials_gallery #"+event.target.id ).attr("src","images/"+event.target.id+"_selected.png").addClass("active");
        //alert( "id = "+$(this).id );
        
        var promise_top   = rest_caller.getTopTutorials(0,top_tutorials_length,$( "#"+event.target.id ).attr('id'));
        
        promise_top.done(
            function(data)
            {
                template_generator.top_tutorials = data.tutorials;
                template_generator.displayTutorialGallery("#top_tutorials_gallery",template_generator.top_tutorials);
                $("#top_tutorials_gallery .gallery").fadeIn();
            });
    });
    
    var nextScroll=0;
    
    $( ".statistics3 .arrow_left img" ).click(
        function() {
            var scrollAmount = $(".achievements_gallery").width() - $(".achievements_gallery").parent().width();
            //alert('scrollAmount: '+scrollAmount);
            
            var currentPos = Math.abs(parseInt($(".achievements_gallery").css('left')));
            //alert('currentPos: '+currentPos);
            
            var remainingScroll = scrollAmount - currentPos;
            //alert('remainingScroll: '+remainingScroll);
            
            // Scroll half-a-screen by default
            //var nextScroll = Math.floor($(".achievements_gallery").parent().width() / 2);
            nextScroll = $(".achievements_gallery").parent().width();
            //alert('nextScroll: '+nextScroll);
            
            // But if there isn’t a FULL scroll left,
            // only scroll the remaining amount.
            if (remainingScroll < nextScroll) 
            {
                nextScroll = remainingScroll;
            }
            
            if (currentPos < scrollAmount) 
            {
                // Scroll left
                $(".achievements_gallery").animate({'left':'-=' + nextScroll}, 'slow');
            }
            else
            {
                // Scroll right
                $(".achievements_gallery").animate({'left':'0'}, 'fast');
            }
        });
    
    $( ".statistics3 .arrow_right img" ).click(
    //$('#photos_inner').click(
        function() {
            var scrollAmount = $(".achievements_gallery").width() - $(".achievements_gallery").parent().width();
            //alert('scrollAmount: '+scrollAmount);
            
            var currentPos = Math.abs(parseInt($(".achievements_gallery").css('left')));
            //alert('currentPos: '+currentPos);
            
            var remainingScroll = scrollAmount - currentPos;
            //alert('remainingScroll: '+remainingScroll);
            
            // Scroll half-a-screen by default
            //var nextScroll = Math.floor($(".achievements_gallery").parent().width() / 2);
            nextScroll = $(".achievements_gallery").parent().width();
            //alert('nextScroll: '+nextScroll);
            
            // But if there isn’t a FULL scroll left,
            // only scroll the remaining amount.
            if (remainingScroll < nextScroll) 
            {
                nextScroll = remainingScroll;
            }
            
            if (currentPos < scrollAmount) 
            {
                // Scroll left
                $(".achievements_gallery").animate({'left':'-=' + nextScroll}, 'slow');
            }
            else
            {
                // Scroll right
                $(".achievements_gallery").animate({'left':'0'}, 'fast');
            }
        });

    /*
    */
    
    
});
   
