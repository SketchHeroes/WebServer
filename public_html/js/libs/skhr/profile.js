/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();

    var user_tutorials_length = 50;
    
    
    // getting INITIAL data from the server
    
    var promise_user = rest_caller.getUser('85');

    promise_user.done(
            function(data)
            {
                template_generator.user = data.user;
                //template_generator.addGallery("#user_tutorials_gallery", length);
                template_generator.displayUser("#user_info", template_generator.user);
                
                var promise_top = rest_caller.getTopTutorials(0,user_tutorials_length);

                promise_top.done(
                        function(data)
                        {
                            template_generator.user_tutorials = data.tutorials;
                            var length = template_generator.user_tutorials.length;
                            template_generator.addGallery("#user_tutorials_gallery", length);
                            template_generator.displayTutorialGallery("#user_tutorials_gallery", template_generator.user_tutorials);

                        });
                
            });
            
    
    
    
            
    
    /*
    var promise_badges = rest_caller.getUserBadges(0,user_tutorials_length);

    promise_top.done(
            function(data)
            {
                template_generator.user_tutorials = data.tutorials;
                var length = template_generator.user_tutorials.length;
                template_generator.addGallery("#user_tutorials_gallery", length);
                template_generator.displayTutorialGallery("#user_tutorials_gallery", template_generator.user_tutorials);
                
            });
            */
            
    
    
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
    
    
    
    
});
   
