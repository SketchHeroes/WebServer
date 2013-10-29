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
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    template_generator.addGallery("#featured_tutorials",6);

    //var promise_featured    = rest_caller.getFeaturedTutorials();
    
    //printObject(promise_featured);
    //var promise_top         = rest_caller.getTopTutorials();
    //var promise_recent      = rest_caller.getRecentTutorials();
    //var promise_top_users   = rest_caller.getTopUsers();
   
    //promise_featured.done(function(data){template_generator.displayFeaturedTutorials(data,"#featured_tutorials")});
    //promise_top.done(function(data){template_generator.displayTopTutorials(data,"#top_tutorials")});
    //promise_recent.done(function(data){template_generator.displayRecentTutorials(data,"#recent_tutorials")});
    //promise_top_users.done(function(data){template_generator.displayTopUsers(data,"#top_users")});

    //var error_image = '<img src="images/error.jpg" alt="logo" width="113" height="123" />';

    //promise_featured.fail(function(data){$("#featured_tutorials").html(error_image)});
    //promise_top.fail(function(data){$("#top_tutorials").html(error_image)});
    //promise_recent.fail(function(data){$("#recent_tutorials").html(error_image)});
    //promise_top_users.fail(function(data){$("#top_users").html(error_image)});
});
   
