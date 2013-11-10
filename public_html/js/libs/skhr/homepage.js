/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


 
function printObject(nyc)
{
    var propValue;
    for(var propName in nyc) {
        propValue = nyc[propName]

        console.log(propName,propValue);
    }
}

$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')   
    
    
    // difining global variables
    
    var featured_page = 0;
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    var featured_length = 6;
    var top_users_length = 5;
    var latest_submissions_length = 4;
    var top_tutorials_length = 6;
    var recent_tutorials_length = 3;
    
    
    // getting INITIAL data from the server
    
    template_generator.addGallery("#featured_tutorials_gallery",featured_length);
    template_generator.addUserList("#top_heroes",top_users_length);
    template_generator.addGallery("#top_tutorials_gallery",featured_length);
    template_generator.addGalleryLess("#recent_tutorials_gallery", recent_tutorials_length);
    template_generator.addSimpleGallery("#latest_submissions", latest_submissions_length);
   
    template_generator.addNotificationList("#notifications");

    var promise_featured    = rest_caller.getFeaturedTutorials(0,featured_length);
    var promise_top_users   = rest_caller.getTopUsers(0,top_users_length,$( "#top_heroes .active" ).attr('id'));
    var promise_top         = rest_caller.getTopTutorials(0,top_tutorials_length,$( "#top_tutorials_gallery .active" ).attr('id'));
    var promise_recent      = rest_caller.getRecentTutorials(0,recent_tutorials_length);
    var promise_latest_competition = rest_caller.getLatestCompetitions(0,1);
    
    promise_featured.done(
            function(data)
            {
                template_generator.featured_tutorials = data.tutorials;
                template_generator.displayTutorialGallery("#featured_tutorials_gallery", template_generator.featured_tutorials);
                
            });
            
    
    promise_top_users.done(
            function(data)
            {
                template_generator.top_users = data.users;
                template_generator.displayUserList("#top_heroes", template_generator.top_users);
                
            });
            
    
    promise_top.done(
            function(data)
            {
                template_generator.top_tutorials = data.tutorials;
                template_generator.displayTutorialGallery("#top_tutorials_gallery", template_generator.top_tutorials);
                
            });
            
    
    promise_recent.done(
            function(data)
            {
                template_generator.recent_tutorials = data.tutorials;
                template_generator.displayTutorialGalleryLess("#recent_tutorials_gallery",template_generator.recent_tutorials);
                
            });
            
    
    promise_latest_competition.done(
            function(data)
            {
                if(data.competitions.length > 0)
                {
                    template_generator.latest_competition = data.competitions[0];
                    template_generator.displayLatestCompetition("#latest_competition",template_generator.latest_competition);
                    
                    var promise_latest_submissions = rest_caller.getLatestCompetitionTutorials(
                                                        0, 
                                                        latest_submissions_length, 
                                                        template_generator.latest_competition.competition_id);
                                                        
                    promise_latest_submissions.done(
                        function(data)
                        {
                            template_generator.latest_submissions = data.competition_tutorials;
                            template_generator.displayTutorialGallerySimple("#latest_submissions",template_generator.latest_submissions);
                        });
                        
                   
                }
                
            });
            
   $( "#featured_tutorials .arrow_right img" ).click(function(event) {
        
        //alert(featured_length);
        
        if( template_generator.featured_tutorials.length === featured_length)
        {
            featured_page++;
            
            var featured_start = featured_length*featured_page;

            var promise_featured    = rest_caller.getFeaturedTutorials(featured_start,featured_length);

            promise_featured.done(
                function(data)
                {
                    template_generator.featured_tutorials = data.tutorials;
                    if(template_generator.featured_tutorials.length > 0)
                        template_generator.displayTutorialGallery("#featured_tutorials_gallery", template_generator.featured_tutorials);

                });
        }

    });
    
    $( "#featured_tutorials .arrow_left img" ).click(function(event) {
        
        //alert(featured_length);
        
        if( featured_page > 0)
        {
            featured_page--;
            
            var featured_start = featured_length*featured_page;

            var promise_featured    = rest_caller.getFeaturedTutorials(featured_start,featured_length);

            promise_featured.done(
                function(data)
                {
                    template_generator.featured_tutorials = data.tutorials;
                    if(template_generator.featured_tutorials.length > 0)
                        template_generator.displayTutorialGallery("#featured_tutorials_gallery", template_generator.featured_tutorials);

                });
        }

    });
    
   
    //promise_featured.done(function(data){template_generator.displayFeaturedTutorials(data,"#featured_tutorials")});
    //promise_top.done(function(data){template_generator.displayTopTutorials(data,"#top_tutorials")});
    //promise_recent.done(function(data){template_generator.displayRecentTutorials(data,"#recent_tutorials")});
    //promise_top_users.done(function(data){template_generator.displayTopUsers(data,"#top_users")});

    //var error_image = '<img src="images/error.jpg" alt="logo" width="113" height="123" />';

    //promise_featured.fail(function(data){$("#featured_tutorials").html(error_image)});
    //promise_top.fail(function(data){$("#top_tutorials").html(error_image)});
    //promise_recent.fail(function(data){$("#recent_tutorials").html(error_image)});
    //promise_top_users.fail(function(data){$("#top_users").html(error_image)});
    
    
    // jump to the bottom of the page (for building only)
    //$('html, body').scrollTop( $(document).height() );
    
    
    // top user period buttons
    
    $( "#top_heroes .period" ).click(function(event) {
        
        //alert("clicked");
        //alert(event.target.id);
        $( "#top_heroes .period" ).attr("src","images/flower-unselected-button.png").removeClass("active");
        $( "#top_heroes #"+event.target.id ).attr("src","images/flower-selected-button.png").addClass("active");
        //alert( "id = "+$(this).id );
        
        var promise_top_users   = rest_caller.getTopUsers(0,top_users_length,$( "#"+event.target.id ).attr('id'));
        
        promise_top_users.done(
            function(data)
            {
                template_generator.top_users = data.users;
                template_generator.displayUserList("#top_heroes",template_generator.top_users);
                
            });
    });
    
    // top tutorials period buttons
    
    $( "#top_tutorials_gallery .period" ).click(function(event) {
        
        //alert("clicked");
        //alert(event.target.id);
        $( "#top_tutorials_gallery .period" ).attr("src","images/top-tutorials-unselected-button.png").removeClass("active");
        $( "#top_tutorials_gallery #"+event.target.id ).attr("src","images/top-tutorials-selected-button.png").addClass("active");
        //alert( "id = "+$(this).id );
        
        var promise_top   = rest_caller.getTopTutorials(0,top_tutorials_length,$( "#"+event.target.id ).attr('id'));
        
        promise_top.done(
            function(data)
            {
                template_generator.top_tutorials = data.tutorials;
                template_generator.displayTutorialGallery("#top_tutorials_gallery",template_generator.top_tutorials);
                
            });
    });
    
    
    
    $( ".expandable > img" ).click(function(event) {
   
        var expandable = $(event.target).parent();
        if( $("#"+expandable.attr('id')+" .sub-menu").css("display") === 'none' )
        {
            $("#"+expandable.attr('id')+" .sub-menu").css("display", "block"); 
            $("#"+expandable.attr('id')+" img").attr("src", "images/header-icon-selected.png"); 
        }
        else
        {
            $("#"+expandable.attr('id')+" .sub-menu").css("display", "none"); 
            $("#"+expandable.attr('id')+" img").attr("src", "images/header-icon-unselected.png"); 
        
        }
    });
    
    $(".expandable > img").mouseleave(function(event){
        
        var expandable = $(event.target).parent();
        
        $("#"+expandable.attr('id')+" .sub-menu").css("display", "none"); 
        $("#"+expandable.attr('id')+" img").attr("src", "images/header-icon-unselected.png"); 
    });
    
    $(".expandable > img").mouseover(function(event){
        
        var expandable = $(event.target).parent();
        
        $("#"+expandable.attr('id')+" .sub-menu").css("display", "block"); 
        $("#"+expandable.attr('id')+" img").attr("src", "images/header-icon-selected.png"); 
    });
    
    
    
    
    $(".non_expandable > img").mouseleave(function(event){
        
        var non_expandable = $(event.target).parent();

        $("#"+non_expandable.attr('id')+" img").attr("src", "images/header-icon-unselected.png"); 
    });
    
    $(".non_expandable > img").mouseover(function(event){
        
        var non_expandable = $(event.target).parent();

        $("#"+non_expandable.attr('id')+" img").attr("src", "images/header-icon-selected.png"); 
    });
    
    $(".non_expandable > img").mousedown(function(event){
        
        var non_expandable = $(event.target).parent();

        $("#"+non_expandable.attr('id')+" img").attr("src", "images/header-icon-unselected.png"); 
    });
    
    $(".non_expandable > img").mouseup(function(event){
        
        var non_expandable = $(event.target).parent();

        $("#"+non_expandable.attr('id')+" img").attr("src", "images/header-icon-selected.png"); 
    });
    
    /*
    
    $(".account #login").click(function(e) 
    { 
        e.stopPropagation();
        if( !$("#popup_login").is(":visible") )
        {
            //$("body").append('');  
            $(".popup").hide();
            $("#popup_login").show();; 
            $("#popup_login .close").click(function(e) { 
                $("#popup_login").hide(); 
            }); 
        }
        else
        {
            $("#popup_login").hide(); 
        }
    });
    
    $(".account #register").click(function(e) 
    {
        e.stopPropagation();
        if( !$("#popup_register").is(":visible") )
        {
            //$("body").append(''); 
            $(".popup").hide();
            $("#popup_register").show();   
            $("#popup_register .close").click(function(e) { 
                $("#popup_register").hide(); 
            }); 
        }
        else
        {
            $("#popup_register").hide(); 
        }
    });
    
    $('.popup').click(function(e) {  
            e.stopPropagation();
    });
    
    $('html').click(function(e) {  
        
            //alert($(e.target).prop("tagName"));
            $(".popup").hide();
    });
    
    */
   
   $(".account #login").click(function(e) 
    { 
        var overlay = $('<div class="overlay"></div>');
        $("body").append(overlay);

        $("#popup_login").fadeIn(); 
            
    });
    
    $("#popup_login .close").click(function(e) { 
            $("#popup_login").fadeOut(); 
            $("body .overlay").remove();
   }); 
    
    $(".account #register").click(function(e) 
    { 
        var overlay = $('<div class="overlay"></div>');
        $("body").append(overlay);

        $("#popup_register").fadeIn(); 
            
    });
    
    $("#popup_register .close").click(function(e) { 
            $("#popup_register").fadeOut(); 
            $("body .overlay").remove();
   }); 
    
    
});
   
