/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    var category_id = 8;
    
    // getting INITIAL data from the server
    
    //var video_id = "24";	
    //var load_url = 'http://www.sketchheroes.com/video/get?artwork_id=24';
    
    
    var tutorial_filter = $( ".category_menu_list > li > img.active" ).attr('id');
    var promise_category_tutorials;

    promise_category_tutorials = getCategoryTutorialsByFilter(category_id, tutorial_filter); 

    promise_category_tutorials.done(
            function(data)
            {
                template_generator.category_tutorials = data.tutorials; 

                var length = template_generator.category_tutorials.length;
                template_generator.removeGallery(".category_tutorials");
                template_generator.addGallery(".category_tutorials", length);
                template_generator.displayTutorialGallery(".category_tutorials", template_generator.category_tutorials);
    
                //alert(tutorial_filter);

            }); 

    
    
//------------------------CATEGORY TUTORIALS-----------------------------------------
    
    
// expendable menu buttons

        $( ".category_menu_list > li > img" ).click(function(event) {

            event.stopPropagation(); 

            var li = $(event.target).parent();
            
            if( !$("#"+li.attr('id')+" > img").hasClass('active') )
            {
                
                $("#"+li.attr('id')+" img").attr("src", "images/"+li.attr('id')+"_selected.png");
                $("#"+li.attr('id')+" img").addClass('active');

                $( ".sub-menu" ).not("#"+li.attr('id')+" .sub-menu").css("display", "none"); 
                $( ".category_menu_list > li > img" ).not("#"+li.attr('id')+" img").attr("src", "images/"+li.attr('id')+"_unselected.png");
                $( ".category_menu_list > li > img" ).not("#"+li.attr('id')+" img").removeClass('active'); 
            }
            
            
            if( li.hasClass("expandable_period") )
            {
                $("#"+li.attr('id')+" .sub-menu").css("display", "block"); 
            }
            else
            {
                $(".category .gallery").fadeOut();
                var tutorial_filter = $( ".category_menu_list > li > img.active" ).attr('id');
                var promise_category_tutorials = getCategoryTutorialsByFilter(category_id, tutorial_filter); 
                
                promise_category_tutorials.done(
                function(data)
                {
                    template_generator.category_tutorials = data.tutorials; 

                    var length = template_generator.category_tutorials.length;
                    template_generator.removeGallery(".category_tutorials");
                    template_generator.addGallery(".category_tutorials", length);
                    template_generator.displayTutorialGallery(".category_tutorials", template_generator.category_tutorials);
                    $(".category_tutorials").fadeIn();   

                }); 
            }
            
            //alert($( ".category .menu .active" ).attr('id'));
        });

        $( "html" ).click(function(event) {
            $( ".sub-menu" ).css("display", "none"); 
        });  


    // user tutorials period buttons

    $( ".expandable_period .sub-menu a" ).click(function(event) {
        
        $(".category .gallery").fadeOut();
        
        
        var period  =  event.target.id;
    
        //alert(tutorial_filter+":"+period);
        var tutorial_filter = $( ".category_menu_list > li > img.active" ).attr('id');
        var promise_category_tutorials;
        
        if(period === "all_time")
            promise_category_tutorials = getCategoryTutorialsByFilter(category_id, tutorial_filter); 
        else
            promise_category_tutorials = getCategoryTutorialsByFilter(category_id,tutorial_filter, period); 

        promise_category_tutorials.done(
                function(data)
                {
                    template_generator.category_tutorials = data.tutorials; 

                    var length = template_generator.category_tutorials.length;
                    template_generator.removeGallery(".category_tutorials");
                    template_generator.addGallery(".category_tutorials", length);
                    template_generator.displayTutorialGallery(".category_tutorials", template_generator.category_tutorials);
                    $(".category_tutorials").fadeIn();              
                }); 
    });

  



//==============================================================================
    
});  


//=====================================FUNCTIONS================================


function getCategoryTutorialsByFilter(category_id, filter, period)
{
    
    var rest_caller = new RestCaller();
    var promise_category_tutorials;
    
    switch (filter)
    {
        case "featured":
            promise_category_tutorials = rest_caller.getCategoryTutorials(
                                                            {
                                                                "tutorial_category_id":category_id,
                                                                "featured":1,
                                                            });
            //alert(filter);
            break;
        case "recent":
            promise_category_tutorials = rest_caller.getCategoryTutorials(
                                                                {
                                                                   "tutorial_category_id":category_id,
                                                                });
            //alert(filter);
            break;

        case "popular":
            if (typeof period === "undefined" || period === null) 
                
            { 
                
                promise_category_tutorials = rest_caller.getCategoryTutorials({
                                                                "tutorial_category_id":category_id,
                                                                "tutorial_count":{"count_views_skhr":"DESC"}}); 
                //alert(filter+" All Time");                                              
            }
            else
            {
                promise_category_tutorials = rest_caller.getCategoryTutorials({
                                                                "tutorial_category_id":category_id,
                                                                "time_constraint":period,
                                                                "tutorial_count":{"count_views_skhr":"DESC"}});   
                //alert(filter+" "+period);
            }
            break;
        default:
            promise_category_tutorials = rest_caller.getCategoryTutorials(
                                                                {
                                                                    "tutorial_category_id":category_id,
                                                                });
            //alert("default: recent");
            break;
    } 
    
    return promise_category_tutorials;
}