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
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    var gallery_length = 6;
    var top_users_length = 5;
    
    
    // getting INITIAL data from the server
    
    template_generator.addGallery("#featured_tutorials_gallery",gallery_length);
    template_generator.addNotificationList("#notifications");
    template_generator.addTopUserList("#top_heroes",top_users_length);

    var promise_featured    = rest_caller.getFeaturedTutorials(0,gallery_length);
    //var promise_top         = rest_caller.getTopTutorials();
    //var promise_recent      = rest_caller.getRecentTutorials();
    var promise_top_users   = rest_caller.getTopUsers(0,top_users_length,$( "#top_heroes .active" ).attr('id'));
    
    promise_featured.done(
            function(data)
            {
                template_generator.featured_tutorials = data.tutorials;
                template_generator.displayFeaturedTutorials("#featured_tutorials_gallery");
                
            });
            
    
    promise_top_users.done(
            function(data)
            {
                template_generator.top_users = data.users;
                template_generator.displayTopUsers("#top_heroes");
                
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
    
    
    
    
    // top user period buttons
    
    $( "#top_heroes .period" ).click(function(event) {
        
        //alert("clicked");
        //alert(event.target.id);
        $( "#top_heroes .period" ).attr("src","images/flower-unselected-button.png").removeClass("active");
        $( "#"+event.target.id ).attr("src","images/flower-selected-button.png").addClass("active");
        //alert( "id = "+$(this).id );
        
        var promise_top_users   = rest_caller.getTopUsers(0,top_users_length,$( "#"+event.target.id ).attr('id'));
        
        promise_top_users.done(
            function(data)
            {
                template_generator.top_users = data.users;
                template_generator.displayTopUsers("#top_heroes");
                
            });
    });
});
   
