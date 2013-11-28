/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    var gallery_page = 0;
    var last_page = 0;
    var nav_pages_length = 5;
    var first_in_range = 0;
    
    var category_id = 8;
    var tutorials_per_part = 8;
    
    
    // getting INITIAL data from the server
    
    //var video_id = "24";	
    //var load_url = 'http://www.sketchheroes.com/video/get?artwork_id=24';
    
    //---------------------------GET CATEGORY-----------------------------------
    
    var promise_category = rest_caller.getTutorialCategory({"tutorial_category_id":category_id}); 

    promise_category.done(
            function(data)
            {
                template_generator.category = data.category; 
                $('.category .header_caption').text(template_generator.category.title);
                
                //alert(tutorial_filter);

            }); 
            
    //---------------------------CATEGORY TUTORIALS-----------------------------
    
    var tutorial_filter = $( ".category_menu_list > li > img.active" ).attr('id');
    var promise_category_tutorials;

    promise_category_tutorials = getCategoryTutorialsByFilter(category_id, tutorial_filter); 

    promise_category_tutorials.done(
            function(data)
            {
                template_generator.category_tutorials = data.tutorials; 

                var length = template_generator.category_tutorials.length;
                last_page = Math.floor((length-1)/(tutorials_per_part*2));
                displayPagination(".navigator", nav_pages_length, gallery_page, last_page, first_in_range);
                outlinePage(gallery_page);
                //alert(last_page);
                
                template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                            ".category_tutorials .second_part", 
                                                            tutorials_per_part, 
                                                            gallery_page);
                
                //alert(tutorial_filter);

            }); 

    
    
//------------------------CATEGORY TUTORIALS-----------------------------------------
    
    
// expendable menu buttons

        $( ".category_menu_list > li > img" ).click(function(event) {

            event.stopPropagation(); 

            var li = $(event.target).parent();
            
            if( !$("#"+li.attr('id')+" > img").hasClass('active') )
            {
                //alert($( ".category_menu_list > li#recent_link > img" ).attr("src"));
                $( ".category_menu_list > li#recent_link > img" ).attr("src", "images/recent_link_unselected.png");
                $( ".category_menu_list > li#featured_link > img" ).attr("src", "images/featured_link_unselected.png");
                $( ".category_menu_list > li#popular_link > img" ).attr("src", "images/popular_link_unselected.png");
                
                $("#"+li.attr('id')+" img").attr("src", "images/"+li.attr('id')+"_selected.png");
                $("#"+li.attr('id')+" img").addClass('active');

                $( ".sub-menu" ).not("#"+li.attr('id')+" .sub-menu").css("display", "none"); 
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
                    last_page = Math.floor((length-1)/(tutorials_per_part*2));
                    gallery_page = 0;
                    displayPagination(".navigator", nav_pages_length, gallery_page, last_page, first_in_range);
                    outlinePage(gallery_page);
                    //alert(last_page);
                
                    template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                                ".category_tutorials .second_part", 
                                                                tutorials_per_part, 
                                                                gallery_page);
                    $(".category .gallery").fadeIn();  

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
                    last_page = Math.floor((length-1)/(tutorials_per_part*2));
                    gallery_page = 0;
                    displayPagination(".navigator", nav_pages_length, gallery_page, last_page, first_in_range);
                    outlinePage(gallery_page);
                    //alert(last_page);
                
                    template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                                ".category_tutorials .second_part", 
                                                                tutorials_per_part, 
                                                                gallery_page);
                    $(".category .gallery").fadeIn();              
                }); 
    });
    
    $( ".navigator #left" ).click(function(event) {
        
        if(gallery_page>0)
        {
            gallery_page--;
            
            $(".category .gallery").fadeOut();
              
            template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                        ".category_tutorials .second_part", 
                                                        tutorials_per_part, 
                                                        gallery_page);
            
            if(gallery_page<first_in_range)
            {
                first_in_range = gallery_page;
                displayPagination(".navigator", nav_pages_length, gallery_page, last_page, first_in_range);
            }
            outlinePage(gallery_page);
            
            $(".category .gallery").fadeIn();
        }
        
    });
    
    $( ".navigator #right" ).click(function(event) {

    
        if(gallery_page<last_page)
        {
            gallery_page++;
            
            $(".category .gallery").fadeOut();
              
            template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                        ".category_tutorials .second_part", 
                                                        tutorials_per_part, 
                                                        gallery_page);
            
            if(gallery_page>=first_in_range+nav_pages_length)
            {
                first_in_range = gallery_page;
                displayPagination(".navigator", nav_pages_length, gallery_page, last_page, first_in_range);
            }
                                                        
            outlinePage(gallery_page);
            
            
            $(".category .gallery").fadeIn();
        }
    });
    
    $( ".navigator #first" ).click(function(event) {
        
        if(gallery_page !== 0)
        {
            gallery_page = 0;
            
            $(".category .gallery").fadeOut();
              
            template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                        ".category_tutorials .second_part", 
                                                        tutorials_per_part, 
                                                        gallery_page);
            
            if(gallery_page<first_in_range)
            {
                first_in_range = gallery_page;
                displayPagination(".navigator", nav_pages_length, gallery_page, last_page, first_in_range);
            }
                                                        
            outlinePage(gallery_page);
            
            
            $(".category .gallery").fadeIn();
        }
        
    });
    
    $( ".navigator #last" ).click(function(event) {

    
        if(gallery_page !== last_page)
        {
            gallery_page = last_page;
            
            $(".category .gallery").fadeOut();
              
            template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                        ".category_tutorials .second_part", 
                                                        tutorials_per_part, 
                                                        gallery_page);
            
            if(gallery_page>=first_in_range+nav_pages_length)
            {
                first_in_range = gallery_page;
                displayPagination(".navigator", nav_pages_length, gallery_page, last_page, first_in_range);
            }
                                                        
            outlinePage(gallery_page);
            
            $(".category .gallery").fadeIn();
            
        }
    });
    
    $(".navigator [id^=page]").click(function(event) {
        
        
        var new_page = parseInt(event.target.value)-1;
        
        //alert(new_page+" is "+!isNaN(new_page));
        
        if( !isNaN(new_page) && gallery_page !== new_page )
        {
            gallery_page = new_page;
            
            $(".category .gallery").fadeOut();
              
            template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                        ".category_tutorials .second_part", 
                                                        tutorials_per_part, 
                                                        gallery_page);
                                                        
            outlinePage(gallery_page);
            
            $(".category .gallery").fadeIn();
        }
        
    });


//==============================================================================
    
});  


//=====================================FUNCTIONS================================

function outlinePage(page)
{
    $(".navigator [id^=page]").css('border','1px red hidden');
    $(".navigator [id=page"+page+"]").css('border','1px red solid');
}

function displayPagination(navigator_target, nav_pages_length, page, last_page, first_in_range)
{                                                    
    $(".navigator [id^=page]").attr('value','...');
    
    for(var i=0; i<nav_pages_length, i+first_in_range<=last_page; i++)
    {
        $(navigator_target+" #page"+i).attr('value',first_in_range+i+1);
        //alert(navigator_target+" #page"+i);
    }
}


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