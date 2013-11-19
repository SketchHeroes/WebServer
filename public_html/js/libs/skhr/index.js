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
    template_generator.addGallery("#top_tutorials_gallery",top_tutorials_length);
    template_generator.addGalleryLess("#recent_tutorials_gallery", recent_tutorials_length);
    template_generator.addSimpleGallery("#latest_submissions", latest_submissions_length);
   
    template_generator.addNotificationList("#notifications");

    var promise_featured    = rest_caller.getTutorials({"start":0,"how_many":featured_length+1,"featured":1,"tutorial_count":{"count_views_skhr":"DESC"}});
    var promise_top_users   = rest_caller.getTopUsers({"start":0,"how_many":top_users_length,"time_constraint":$( "#top_heroes .active" ).attr('id')});
    var promise_top         = rest_caller.getTutorials({"start":0,"how_many":top_tutorials_length,"time_constraint":$( "#top_tutorials_gallery .active" ).attr('id'),"tutorial_count":{"count_views_skhr":"DESC"}});
    var promise_recent      = rest_caller.getTutorials({"start":0,"how_many":recent_tutorials_length});
    var promise_latest_competition = rest_caller.getLatestCompetitions({"start":0,"how_many":1});
    
    promise_featured.done(
            function(data)
            {
                template_generator.featured_tutorials = data.tutorials;
                template_generator.displayTutorialGallery("#featured_tutorials_gallery", template_generator.featured_tutorials);
                //alert(template_generator.featured_tutorials.length);
                
                if(template_generator.featured_tutorials.length > featured_length)
                {
                    $( "#featured_tutorials .arrow_right img" ).css("opacity", "1"); 
                    $( "#featured_tutorials .arrow_right img" ).css("filter", "alpha(opacity=100)"); 
                }
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
                                                        {"start":0, 
                                                        "how_many":latest_submissions_length, 
                                                        "competition_id":template_generator.latest_competition.competition_id});
                                                        
                    promise_latest_submissions.done(
                        function(data)
                        {
                            template_generator.latest_submissions = data.competition_tutorials;
                            template_generator.displayTutorialGallerySimple("#latest_submissions",template_generator.latest_submissions);
                        });
                        
                   
                }
                
            });
   
    
    $( "#featured_tutorials .arrow_left img" ).click(function(event) {
        
        //alert(featured_length);
        
        if( featured_page > 0)
        {
            $( "#featured_tutorials .arrow_right img" ).css("opacity", "1"); 
            $( "#featured_tutorials .arrow_right img" ).css("filter", "alpha(opacity=100)"); 
            
            $("#featured_tutorials_gallery").fadeOut();
            
            featured_page--;
            
            var featured_start = featured_length*featured_page;

            var promise_featured    = rest_caller.getTutorials({"start":featured_start,"how_many":featured_length+1,"featured":1,"tutorial_count":{"count_views_skhr":"DESC"}});

            promise_featured.done(
                function(data)
                {
                    template_generator.featured_tutorials = data.tutorials;
                    if(template_generator.featured_tutorials.length > 0)
                    {
                        template_generator.displayTutorialGallery("#featured_tutorials_gallery", template_generator.featured_tutorials);
                    }
                    $("#featured_tutorials_gallery").fadeIn();
                    
                    if( featured_page === 0 )
                    {
                        $( "#featured_tutorials .arrow_left img" ).css("opacity", "0.3"); 
                        $( "#featured_tutorials .arrow_left img" ).css("filter", "alpha(opacity=30)"); 
                    }
                });
        }

    });
    
    $( "#featured_tutorials .arrow_right img" ).click(function(event) {
        
        //alert(featured_length);
        
        if( template_generator.featured_tutorials.length > featured_length)
        {
            $( "#featured_tutorials .arrow_left img" ).css("opacity", "1"); 
            $( "#featured_tutorials .arrow_left img" ).css("filter", "alpha(opacity=100)"); 
            
            //alert($( "#featured_tutorials .arrow_left img" ).css("opacity"));
            
            $("#featured_tutorials_gallery").fadeOut();
            
            featured_page++;
            
            var featured_start = featured_length*featured_page;

            var promise_featured    = rest_caller.getTutorials({"start":featured_start,"how_many":featured_length+1,"featured":1,"tutorial_count":{"count_views_skhr":"DESC"}});

            promise_featured.done(
                function(data)
                {
                    template_generator.featured_tutorials = data.tutorials;
                    if(template_generator.featured_tutorials.length > 0)
                        template_generator.displayTutorialGallery("#featured_tutorials_gallery", template_generator.featured_tutorials);
                    $("#featured_tutorials_gallery").fadeIn();
                    
                    if(template_generator.featured_tutorials.length > featured_length)
                    {
                        $( "#featured_tutorials .arrow_right img" ).css("opacity", "1"); 
                        $( "#featured_tutorials .arrow_right img" ).css("filter", "alpha(opacity=100)"); 
                    }
                    else
                    {
                        $( "#featured_tutorials .arrow_right img" ).css("opacity", "0.3"); 
                        $( "#featured_tutorials .arrow_right img" ).css("filter", "alpha(opacity=30)"); 
                    }
                        
                });
        }
    });
    
    
    // top user period buttons
    
    $( "#top_heroes .period" ).click(function(event) {
        
        $("#top_heroes .users_list").fadeOut();
        //alert("clicked");
        //alert(event.target.id);
        $( "#top_heroes #week" ).attr("src","images/week_flower_unselected.png").removeClass("active");
        $( "#top_heroes #month" ).attr("src","images/month_flower_unselected.png").removeClass("active");
        $( "#top_heroes #year" ).attr("src","images/year_flower_unselected.png").removeClass("active");
        $( "#top_heroes #"+event.target.id ).attr("src","images/"+event.target.id+"_flower_selected.png").addClass("active");
        //alert( "id = "+$(this).id );
        
        var promise_top_users   = rest_caller.getTopUsers({"start":0,"how_many":top_users_length,"time_constraint":$( "#"+event.target.id ).attr('id')});
        
        promise_top_users.done(
            function(data)
            {
                template_generator.top_users = data.users;
                template_generator.displayUserList("#top_heroes",template_generator.top_users);
                $("#top_heroes .users_list").fadeIn();
            });
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
        
        var promise_top   = rest_caller.getTutorials({"start":0,"how_many":top_tutorials_length,"time_constraint":$( "#"+event.target.id ).attr('id'),"tutorial_count":{"count_views_skhr":"DESC"}});
        
        promise_top.done(
            function(data)
            {
                template_generator.top_tutorials = data.tutorials;
                template_generator.displayTutorialGallery("#top_tutorials_gallery",template_generator.top_tutorials);
                $("#top_tutorials_gallery .gallery").fadeIn();
            });
    });
    
    
});
   
