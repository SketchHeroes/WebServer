/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    //alert(service.getParameterByName('category'));
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    var gallery_page = 0;
    var last_page = 0;
    var nav_pages_length = 5;
    var first_in_range = 0;
    
    var service = new Service();
    var parameter = service.getParameterByName('category');
    var category_id = (parameter)?parameter:0;
    
    var filter = service.getParameterByName('filter');
    switch(filter)
    {   
        case 'recent':
            switchActive($('#recent_link'));
            break;
        case 'featured':
            switchActive($('#featured_link'));
            break;
        case 'popular':
            switchActive($('#popular_link'));
            break;
    }
    
    var like = service.getParameterByName('like');
    //alert(category_id);
    var tutorials_per_part = 8;
    
    
    // getting INITIAL data from the server
    
    //var video_id = "24";	
    //var load_url = 'http://www.sketchheroes.com/video/get?artwork_id=24';
    
    //---------------------------GET CATEGORY-----------------------------------
    if(category_id)
    {
        var promise_category = rest_caller.getTutorialCategory({"tutorial_category_id":category_id}); 

        promise_category.done(
                function(data)
                {
                    template_generator.category = data.category; 
                    $('.category .header_caption').text(template_generator.category.title);

                    //alert(tutorial_filter);

                }); 
    }
    else
    {
        $('.category .header_caption').text("All Categories");
    }
            
    //---------------------------CATEGORY TUTORIALS-----------------------------
    
    var tutorial_filter = $( ".category_menu_list > li > img.active" ).attr('id');
    var promise_category_tutorials;

    template_generator.category_tutorials_query_array = {
                                                            "start":gallery_page*tutorials_per_part*2,
                                                            "how_many":tutorials_per_part*2,
                                                            "category_id":category_id, 
                                                            "tutorial_filter":tutorial_filter,
                                                            "like":like
                                                        }; 
                                                                
    promise_category_tutorials = getCategoryTutorialsByFilter(template_generator.category_tutorials_query_array);

    promise_category_tutorials.done(
            function(data)
            {
                template_generator.category_tutorials = data.tutorials; 
                var length = data.total_count;
                //alert(length);
                first_in_range = 0;
                last_page = Math.floor((length-1)/(tutorials_per_part*2));
                displayPagination(".category_tutorials .navigator", nav_pages_length, gallery_page, last_page, first_in_range);
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
            //alert("pressed");
            
            var li = $(event.target).parent();
            
            if( !$("#"+li.attr('id')+" > img").hasClass('active') )
            {
                switchActive(li);
                $( ".sub-menu" ).not("#"+li.attr('id')+" .sub-menu").css("display", "none"); 
            }
            
            
            if( li.hasClass("expandable_period") )
            {
                //alert("expandable");
                $("#"+li.attr('id')+" .sub-menu").css("display", "block"); 
            }
            else
            {
                
                gallery_page = 0;
                //alert("non expandable");
                $(".category .gallery").fadeOut();
                var tutorial_filter = $( ".category_menu_list > li > img.active" ).attr('id');
                template_generator.category_tutorials_query_array = {
                                                                        "start":gallery_page*tutorials_per_part*2,
                                                                        "how_many":tutorials_per_part*2,
                                                                        "category_id":category_id, 
                                                                        "tutorial_filter":tutorial_filter,
                                                                        "like":like
                                                                    };
                var promise_category_tutorials = getCategoryTutorialsByFilter(template_generator.category_tutorials_query_array); 
                
                promise_category_tutorials.done(
                function(data)
                {
                    template_generator.category_tutorials = data.tutorials; 

                    var length = data.total_count;
                    last_page = Math.floor((length-1)/(tutorials_per_part*2));
                    gallery_page = 0;
                    first_in_range = 0;
                    displayPagination(".category_tutorials .navigator", nav_pages_length, gallery_page, last_page, first_in_range);
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

    $( ".category_menu_list .expandable_period .sub-menu a" ).click(function(event) {
        
        $(".category .gallery").fadeOut();
        var period  =  event.target.id;
        gallery_page = 0;
        //alert(tutorial_filter+":"+period);
        var tutorial_filter = $( ".category_menu_list > li > img.active" ).attr('id');
        var promise_category_tutorials;
        
        if(period === "all_time")
            template_generator.category_tutorials_query_array =     {
                                                                        "start":gallery_page*tutorials_per_part*2,
                                                                        "how_many":tutorials_per_part*2,
                                                                        "category_id":category_id, 
                                                                        "tutorial_filter":tutorial_filter,
                                                                        "like":like
                                                                    }; 
        else
            template_generator.category_tutorials_query_array =     {
                                                                        "start":gallery_page*tutorials_per_part*2,
                                                                        "how_many":tutorials_per_part*2,
                                                                        "category_id":category_id, 
                                                                        "tutorial_filter":tutorial_filter, 
                                                                        "period":period,
                                                                        "like":like
                                                                    }; 
                                                                
        
        promise_category_tutorials = getCategoryTutorialsByFilter(template_generator.category_tutorials_query_array);

        promise_category_tutorials.done(
                function(data)
                {
                    template_generator.category_tutorials = data.tutorials; 

                    var length = data.total_count;
                    last_page = Math.floor((length-1)/(tutorials_per_part*2));
                    gallery_page = 0;
                    first_in_range = 0;
                    displayPagination(".category_tutorials .navigator", nav_pages_length, gallery_page, last_page, first_in_range);
                    outlinePage(gallery_page);
                    //alert(last_page);
                
                    template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                                ".category_tutorials .second_part", 
                                                                tutorials_per_part, 
                                                                gallery_page);
                    $(".category .gallery").fadeIn();              
                }); 
    });
    
    $( ".category_tutorials .navigator #left" ).click(function(event) {
        
        if(gallery_page>0)
        {
            gallery_page--;
            
            $(".category .gallery").fadeOut();
            
            template_generator.category_tutorials_query_array['start'] = gallery_page*tutorials_per_part*2,  
            promise_category_tutorials = getCategoryTutorialsByFilter(template_generator.category_tutorials_query_array);

            promise_category_tutorials.done(
                    function(data)
                    {
                        template_generator.category_tutorials = data.tutorials;
                        
                        template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                                    ".category_tutorials .second_part", 
                                                                    tutorials_per_part, 
                                                                    gallery_page);

                        if(gallery_page<first_in_range)
                        {
                            first_in_range = gallery_page;
                            displayPagination(".category_tutorials .navigator", nav_pages_length, gallery_page, last_page, first_in_range);
                        }
                        outlinePage(gallery_page);

                        $(".category .gallery").fadeIn();
            
                    });
        }
        
    });
    
    $( ".category_tutorials .navigator #right" ).click(function(event) {

    
        if(gallery_page<last_page)
        {
            gallery_page++;
            
            $(".category .gallery").fadeOut();
            
            
            template_generator.category_tutorials_query_array['start'] = gallery_page*tutorials_per_part*2,  
            promise_category_tutorials = getCategoryTutorialsByFilter(template_generator.category_tutorials_query_array);

            promise_category_tutorials.done(
                    function(data)
                    {  
                        template_generator.category_tutorials = data.tutorials;
                        
                        template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                                    ".category_tutorials .second_part", 
                                                                    tutorials_per_part, 
                                                                    gallery_page);
            
                        if(gallery_page>=first_in_range+nav_pages_length)
                        {
                            first_in_range = gallery_page;
                            displayPagination(".category_tutorials .navigator", nav_pages_length, gallery_page, last_page, first_in_range);
                        }

                        outlinePage(gallery_page);


                        $(".category .gallery").fadeIn();
                    });
        }
    });
    
    $( ".category_tutorials .navigator #first" ).click(function(event) {
        
        if(gallery_page !== 0)
        {
            gallery_page = 0;
            
            $(".category .gallery").fadeOut();
            
            
            template_generator.category_tutorials_query_array['start'] = gallery_page*tutorials_per_part*2,  
            promise_category_tutorials = getCategoryTutorialsByFilter(template_generator.category_tutorials_query_array);

            promise_category_tutorials.done(
                    function(data)
                    {  
                        template_generator.category_tutorials = data.tutorials;
                          
                        template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                                    ".category_tutorials .second_part", 
                                                                    tutorials_per_part, 
                                                                    gallery_page);

                        if(gallery_page<first_in_range)
                        {
                            first_in_range = gallery_page;
                            displayPagination(".category_tutorials .navigator", nav_pages_length, gallery_page, last_page, first_in_range);
                        }

                        outlinePage(gallery_page);


                        $(".category .gallery").fadeIn();
                    });
        }
        
    });
    
    $( ".category_tutorials .navigator #last" ).click(function(event) {

    
        if(gallery_page !== last_page)
        {
            gallery_page = last_page;
            
            $(".category .gallery").fadeOut();
            
            template_generator.category_tutorials_query_array['start'] = gallery_page*tutorials_per_part*2,        
            promise_category_tutorials = getCategoryTutorialsByFilter(template_generator.category_tutorials_query_array);

            promise_category_tutorials.done(
                    function(data)
                    {  
                        template_generator.category_tutorials = data.tutorials;
                          
                        template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                                    ".category_tutorials .second_part", 
                                                                    tutorials_per_part, 
                                                                    gallery_page);

                        if(gallery_page>=first_in_range+nav_pages_length)
                        {
                            first_in_range = gallery_page;
                            displayPagination(".category_tutorials .navigator", nav_pages_length, gallery_page, last_page, first_in_range);
                        }

                        outlinePage(gallery_page);

                        $(".category .gallery").fadeIn();
                    });

        }
    });
    
    $(".category_tutorials .navigator [id^=page]").click(function(event) {
        
        
        var new_page = parseInt(event.target.value)-1;
        
        //alert(new_page+" is "+!isNaN(new_page));
        
        if( !isNaN(new_page) && gallery_page !== new_page )
        {
            gallery_page = new_page;
            
            $(".category .gallery").fadeOut();
            
            template_generator.category_tutorials_query_array['start'] = gallery_page*tutorials_per_part*2,        
            promise_category_tutorials = getCategoryTutorialsByFilter(template_generator.category_tutorials_query_array);

            promise_category_tutorials.done(
                    function(data)
                    {  
                        template_generator.category_tutorials = data.tutorials;  
                        template_generator.displayTwoPartGallery(   ".category_tutorials .first_part",
                                                                    ".category_tutorials .second_part", 
                                                                    tutorials_per_part, 
                                                                    gallery_page);

                        outlinePage(gallery_page);

                        $(".category .gallery").fadeIn();
                    });
        }
        
    });


//==============================================================================
    
});  


//=====================================FUNCTIONS================================

function switchActive(li)
{
    
    //alert($( ".category_menu_list > li#recent_link > img" ).attr("src"));
    $( ".category_menu_list > li#recent_link > img" ).attr("src", "images/recent_link_unselected.png");
    $( ".category_menu_list > li#featured_link > img" ).attr("src", "images/featured_link_unselected.png");
    $( ".category_menu_list > li#popular_link > img" ).attr("src", "images/popular_link_unselected.png");

    $("#"+li.attr('id')+" img").attr("src", "images/"+li.attr('id')+"_selected.png");
    $("#"+li.attr('id')+" img").addClass('active');
    $( ".category_menu_list > li > img" ).not("#"+li.attr('id')+" img").removeClass('active'); 

}

function outlinePage(page)
{
    //alert(page);
    $(".category_tutorials .navigator [id^=page]").css('border','1px red hidden');
    $(".category_tutorials .navigator [id=page"+page+"]").css('border','1px red solid');
}

function displayPagination(navigator_target, nav_pages_length, page, last_page, first_in_range)
{                                                    
    $(".category_tutorials .navigator [id^=page]").attr('value','...');
    
    for(var i=0; i<nav_pages_length, i+first_in_range<=last_page; i++)
    {
        $(navigator_target+" #page"+i).attr('value',first_in_range+i+1);
        //alert(navigator_target+" #page"+i);
    }
}


function getCategoryTutorialsByFilter(params)
{
    //alert(JSON.stringify(params));
    var rest_caller = new RestCaller();
    var promise_category_tutorials;
    
    switch (params['tutorial_filter'])
    {
        case "featured":
            promise_category_tutorials = rest_caller.getCategoryTutorials(
                                                            {
                                                                "start":params["start"],
                                                                "how_many":params["how_many"],
                                                                "tutorial_category_id":params['category_id'],
                                                                "featured":1,
                                                                "like":params['like']
                                                            });
            //alert(params['tutorial_filter']);
            break;
        case "recent":
            promise_category_tutorials = rest_caller.getCategoryTutorials(
                                                                {
                                                                    "start":params["start"],
                                                                    "how_many":params["how_many"],
                                                                    "tutorial_category_id":params['category_id'],
                                                                    "like":params['like']
                                                                });
            //alert(params['tutorial_filter']);
            break;

        case "popular":
            if (typeof params['period'] === "undefined" || params['period'] === null) 
                
            { 
                
                promise_category_tutorials = rest_caller.getCategoryTutorials({
                                                                "start":params["start"],
                                                                "how_many":params["how_many"],
                                                                "tutorial_category_id":params['category_id'],
                                                                "tutorial_count":{"count_views_skhr":"DESC"},
                                                                "like":params['like']
                                                            }); 
                //alert(params['tutorial_filter']+" All Time");                                              
            }
            else
            {
                promise_category_tutorials = rest_caller.getCategoryTutorials({
                                                                "start":params["start"],
                                                                "how_many":params["how_many"],
                                                                "tutorial_category_id":params['category_id'],
                                                                "time_constraint":params['period'],
                                                                "tutorial_count":{"count_views_skhr":"DESC"},
                                                                "like":params['like']
                                                            });   
                //alert(params['tutorial_filter']+" "+params['period']);
            }
            break;
        default:
            promise_category_tutorials = rest_caller.getCategoryTutorials(
                                                                {
                                                                    "start":params["start"],
                                                                    "how_many":params["how_many"],
                                                                    "tutorial_category_id":params['category_id'],
                                                                    "like":params['like']
                                                                });
            //alert("default: recent");
            break;
    } 
    
    return promise_category_tutorials;
}