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

               promise_featured.done(template_generator.displayFeaturedTutorials);
               promise_top.done(template_generator.displayTopTutorials);
               promise_recent.done(template_generator.displayRecentTutorials);
            
                
});
