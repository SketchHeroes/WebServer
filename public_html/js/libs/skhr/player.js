/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    // getting INITIAL data from the server
    
    //var video_id = "24";	
    //var load_url = 'http://www.sketchheroes.com/video/get?artwork_id=24';
    
    
    
// -----------------------TUTORIAL DATA-----------------------------------------
    
    var content_id = 22;

    var promise_tutorial = rest_caller.getTutorial({"content_id":content_id});
    
    promise_tutorial.done(
            function(data)
            {
                template_generator.user_tutorial = data.tutorial; 
                template_generator.displayTutorial('.player_section',template_generator.user_tutorial);
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
