/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    var account              = new Account();
    // getting INITIAL data from the server
    
    //var video_id = "24";	
    //var load_url = 'http://www.sketchheroes.com/video/get?artwork_id=24';
    
    
    
// -----------------------TUTORIAL DATA-----------------------------------------

    if( !account.isLoggedIn() )
    {
        window.location.assign("index.html");
    }
    
    // loading 
    template_generator.displayPainter({"user_id":localStorage.caller_skhr_id, "user_token":localStorage.user_token}); 

    
    /*
    var content_id = 22;

    var promise_tutorial = rest_caller.getTutorial({"content_id":content_id});
    
    promise_tutorial.done(
            function(data)
            {
                template_generator.user_tutorial = data.tutorial; 
                template_generator.displayPainter('.player_section',template_generator.user_tutorial);   
                
                //------------------------OTHER USER TUTORIALS-----------------------------------------

                var promise_user_tutorials = rest_caller.getUserTutorials({
                                                                            "author_skhr_id":template_generator.user_tutorial.author_skhr_id,
                                                                            "tutorial_order_by":{"order_by_content_id":"DESC"}
                                                                        });


                promise_user_tutorials.done(
                    function(data)
                    {
                        template_generator.user_tutorials = data.tutorials; 

                        var length = template_generator.user_tutorials.length;
                        //template_generator.removeGallery("#user_tutorials_gallery_aside");
                        template_generator.addGallery("#user_tutorials_gallery_aside", length);
                        template_generator.displayTutorialGallery("#user_tutorials_gallery_aside", template_generator.user_tutorials);

                    }); 

            }); 
            */

            
//==============================================================================
    
});  
