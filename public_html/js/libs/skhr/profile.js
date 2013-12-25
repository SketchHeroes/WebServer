/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    var service = new Service();
    var skhr_id = service.getParameterByName('user_id');
    //alert(skhr_id);
    //var skhr_id = 85;
    
    // getting INITIAL data from the server
    
    // get user info
    var promise_user = rest_caller.getUser({"skhr_id":skhr_id,
                                            "user_related_data":{
                                                                    "user_followed":"user_followed",
                                                                    "user_follows":"user_follows",
                                                                    "user_tutorials":"user_tutorials",
                                                                    "user_views":"user_views",
                                                                    "user_likes":"user_likes",
                                                                    "user_comments":"user_comments"
                                                                }});

    promise_user.done(
            function(data)
            {
                template_generator.user = data.user;
                template_generator.user['skhr_id'] = skhr_id;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                template_generator.displayUser("#user_info", template_generator.user);         
                
                
                //------------------------------pop ups-----------------------------------------

                // fans popup

                $(".fans").click(function(e) 
                 { 
                     var overlay = $('<div class="overlay"></div>');
                     $("body").append(overlay);

                     $("#popup_fans").fadeIn(); 
                     $("#popup_fans .inner_popup").focus();
                     //$("#popup_login input[name=username_email]").focus();

                     //alert(template_generator.user_followed);

                     // get user fans - only the first time user presses fans button
                     //if(typeof template_generator.user_followed === 'undefined')
                     //{
                         //alert('first_time');
                         var promise_user_followed = rest_caller.getUserFollowed({   "skhr_id":skhr_id,
                                                                                     "user_related_data":{
                                                                                                             "user_followed":"user_followed",
                                                                                                             "user_follows":"user_follows",
                                                                                                             "user_tutorials":"user_tutorials",
                                                                                                             "user_views":"user_views",
                                                                                                             "user_likes":"user_likes",
                                                                                                             "user_comments":"user_comments"
                                                                                                         }});

                         promise_user_followed.done(
                                 function(data)
                                 {         
                                    template_generator.user_followed = data.user_followed;   
                                     //alert(template_generator.user_followed.length);
                                     
                                    $('#popup_fans h1.caption').text('Fans('+template_generator.user_followed.length+')');
                                    template_generator.removeUserListComplex("#fans_list");
                                    template_generator.addUserListComplex("#fans_list", template_generator.user_followed.length); 
                                    template_generator.displayUserListComlex("#fans_list", template_generator.user_followed);
                                    
                                    var account = new Account();
                                    /*
                                    if( account.isLoggedIn() )
                                    {
                                        var service = new Service();
                                        service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
                                    }
                                     */
                                 });
                     //}

                 });

                $("#popup_fans .close").click(function(e) { 
                         $("#popup_fans").fadeOut(); 
                         $("body .overlay").remove();
                }); 
                
                
                $(".following").click(function(e) 
                 { 
                     var overlay = $('<div class="overlay"></div>');
                     $("body").append(overlay);

                     $("#popup_following").fadeIn(); 
                     $("#popup_following .inner_popup").focus();
                     //$("#popup_login input[name=username_email]").focus();

                     //alert(template_generator.user_followed);

                     // get user fans - only the first time user presses fans button
                     if(typeof template_generator.user_follows === 'undefined')
                     {
                         //alert('first_time');
                         var promise_user_follows = rest_caller.getUserFollows({   "skhr_id":skhr_id,
                                                                                     "user_related_data":{
                                                                                                             "user_followed":"user_followed",
                                                                                                             "user_follows":"user_follows",
                                                                                                             "user_tutorials":"user_tutorials",
                                                                                                             "user_views":"user_views",
                                                                                                             "user_likes":"user_likes",
                                                                                                             "user_comments":"user_comments"
                                                                                                         }});

                         promise_user_follows.done(
                                 function(data)
                                 {         
                                    template_generator.user_follows = data.user_follows;   
                                     //alert(template_generator.user_followed.length);
                                     
                                    $('#popup_following h1.caption').text('Following('+template_generator.user_follows.length+')');
                                    template_generator.removeUserListComplex("#following_list");
                                    template_generator.addUserListComplex("#following_list", template_generator.user_follows.length); 
                                    template_generator.displayUserListComlex("#following_list", template_generator.user_follows);
                                 });
                     }

                 });

                $("#popup_following .close").click(function(e) { 
                         $("#popup_following").fadeOut(); 
                         $("body .overlay").remove();
                }); 
                   
                   
                   /*
                // get user following
                var promise_user_follows = rest_caller.getUserFollows({ "skhr_id":skhr_id,
                                                                        "user_related_data":{
                                                                                                "user_followed":"user_followed",
                                                                                                "user_follows":"user_follows",
                                                                                                "user_tutorials":"user_tutorials",
                                                                                                "user_views":"user_views",
                                                                                                "user_likes":"user_likes",
                                                                                                "user_comments":"user_comments"
                                                                                            }});

                promise_user_follows.done(
                        function(data)
                        {
                            template_generator.user_follows = data.user_follows;
                        });
                */
                
       
            });
            
    
         
    // ---------------------USER ACHIEVEMENTS-----------------------------------
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
    var tutorial_filter = $( "#user_tutorials .active" ).attr('id');
    
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

    $( "#user_tutorials .period" ).click(function(event) {
        
        $("#user_tutorials .gallery").fadeOut();
        //alert("clicked");
        //alert(event.target.id);
        $( "#user_tutorials #most_recent" ).attr("src","images/most_recent_unselected.png").removeClass("active");
        $( "#user_tutorials #top_rated" ).attr("src","images/top_rated_unselected.png").removeClass("active");
        $( "#user_tutorials #most_viewed" ).attr("src","images/most_viewed_unselected.png").removeClass("active");
        $( "#user_tutorials #"+event.target.id ).attr("src","images/"+event.target.id+"_selected.png").addClass("active");
        //alert( "id = "+$(this).id );
        
        var tutorial_filter = $( "#user_tutorials .active" ).attr('id');
    
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
    
    // invite friends
    
    $('body').on('click', '.invite_friends', function(e)
    { 
        //alert('invite friends clicked');
        FB.ui({
            method: 'apprequests',
            message: "Join me in Sketch Heroes"
        });
    });

  
            
//===============================CHANGE AVATAR=================================

    $('body').on('change', '#user_info input[type=file]', function(e)
    { 
        var input = e.target;
        //console.log(input.files[0]);
        //console.log(typeof input.files[0]);
        
        var data = new FormData();
        //data.append('avatar', input.files[0]);
        
        $.each($('#user_info input[type=file]')[0].files, function(i, file) 
        {
            data.append('avatar', file);
        });
        //console.log(typeof data);
        
        // doesn't work yet 
        //rest_caller.postUserAvatarUpload(data); 
        
        
        $.ajax({
            url: "http://serverkizidev-env.elasticbeanstalk.com"+"/user/avatar_upload",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            crossDomain:true,
            type: 'POST',
            headers: {
                        "X-App-Token":this.app_token,
                        "Accept":"application/json",
                        "X-Caller-SKHR-ID":localStorage.caller_skhr_id,
                        "X-User-Token":localStorage.user_token,
                    },
            success: function(data)
            {
                
                //alert(data);
                // get user info
                var promise_user = rest_caller.getUser({"skhr_id":skhr_id,
                                                        "user_related_data":{
                                                                                "user_followed":"user_followed",
                                                                                "user_follows":"user_follows",
                                                                                "user_tutorials":"user_tutorials",
                                                                                "user_views":"user_views",
                                                                                "user_likes":"user_likes",
                                                                                "user_comments":"user_comments"
                                                                            }});

                promise_user.done(
                        function(data)
                        {
                            template_generator.user = data.user;
                            template_generator.user['skhr_id'] = skhr_id;
                            //template_generator.addGallery("#user_tutorials_gallery", length);
                            template_generator.displayUser("#user_info", template_generator.user); 
                        });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) 
            { 
                //alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }  
        });
        
        
        /*
        $.each($('#file')[0].files, function(i, file) 
        {
            data.append('file-'+i, file);
        });
        /*
        var reader = new FileReader();
        
        reader.onload = function(event)
        {
          var dataURL = event.target.result;
          console.log(JSON.stringify(event.target.result));
          console.log(typeof JSON.stringify(event.target.result));
          var output = document.getElementById('output');
          output.src = dataURL;

        };
        reader.readAsDataURL(input.files[0]);
        */
    }); 

/*
$('input[type=file]').on('change', function(e){
    
    alert('uploading');
});
    */
/*
$('.change_avatar').on('click', function(){
    
    alert('uploading');
});
*/
//==============================================================================
    
});  
   
/* ------------------------------FUNCTIONS----------------------------------- */

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(event){
      var dataURL = event.target.result;
      var output = document.getElementById('output');
      output.src = dataURL;

    };
    reader.readAsDataURL(input.files[0]);
};
   
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