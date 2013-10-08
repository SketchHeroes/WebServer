/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
                
               
               var rest_caller          = new RestCaller();
               var template_generator   = new TemplateGenerator();

               var promise_featured = rest_caller.getFeaturedTutorials();
               var promise_top      = rest_caller.getTopTutorials();
               var promise_recent   = rest_caller.getRecentTutorials();
         
               promise_top.done(function(data){template_generator.displayTopTutorials(data,"#top_tutorials")});
               promise_recent.done(function(data){template_generator.displayRecentTutorials(data,"#recent_tutorials")});
               promise_featured.done(function(data){template_generator.displayFeaturedTutorials(data,"#featured_tutorials")});
            
                
});
