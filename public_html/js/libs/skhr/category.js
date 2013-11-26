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
    
    
    
//------------------------CATEGORY TUTORIALS-----------------------------------------
    /*
    var promise_user_tutorials;
    var tutorial_filter = $( "#user_tutorials .active" ).attr('id');
    
    //alert(tutorial_filter);

    switch (tutorial_filter)
    {
        case "recent":
                promise_user_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"tutorial_order_by":{"order_by_content_id":"DESC"}});
            break;
        case "featured":
                promise_user_tutorials = rest_caller.getUserTutorials({"author_skhr_id":skhr_id,"tutorial_count":{"count_likes_skhr":"DESC"}});
            break;
        case "popular":
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
            */
    
// expendable menu buttons

        $( ".category_menu_list > li > img" ).click(function(event) {

            event.stopPropagation(); 

            var li = $(event.target).parent();
            
            
            if( li.hasClass("expandable_period") )
            {
                $("#"+li.attr('id')+" .sub-menu").css("display", "block"); 
            }
            else
            {

            }
            
            if( !$("#"+li.attr('id')+" > img").hasClass('active') )
            {
                
                $("#"+li.attr('id')+" img").attr("src", "images/"+li.attr('id')+"_selected.png");
                $("#"+li.attr('id')+" img").addClass('active');

                $( ".sub-menu" ).not("#"+li.attr('id')+" .sub-menu").css("display", "none"); 
                $( ".category_menu_list > li > img" ).not("#"+li.attr('id')+" img").attr("src", "images/"+li.attr('id')+"_unselected.png");
                $( ".category_menu_list > li > img" ).not("#"+li.attr('id')+" img").removeClass('active'); 
            }
            
            //alert($( ".category .menu .active" ).attr('id'));
        });

        $( "html" ).click(function(event) {
            $( ".sub-menu" ).css("display", "none"); 
        });  


    // user tutorials period buttons

    $( ".expandable_period .sub-menu a" ).click(function(event) {
        
        $(".category .gallery").fadeOut();
        
        var tutorial_filter = $( ".category .menu .active" ).attr('id');
    
        //alert(tutorial_filter);
        
        var period  =  event.target.id;
    
        alert(tutorial_filter+":"+period);
        
        var promise_category_tutorials;
        
        switch (tutorial_filter)
        {
            case "popular":
                    promise_category_tutorials = rest_caller.getCategoryTutorials({"author_skhr_id":skhr_id,"tutorial_order_by":{"order_by_content_id":"DESC"}});
                break;
        } 

        promise_category_tutorials.done(
                function(data)
                {
                    template_generator.category_tutorials = data.tutorials; 

                    var length = template_generator.category_tutorials.length;
                    template_generator.removeGallery(".category_tutorials");
                    template_generator.addGallery(".category_tutorials", length);
                    template_generator.displayTutorialGallery(".category_tutorials", template_generator.category_tutorials);

                }); 
    });

  



//==============================================================================
    
});  
