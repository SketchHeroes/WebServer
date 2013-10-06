/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
                
               
               var rest_caller          = new RestCaller();
               var template_generator   = new TemplateGenerator();

               var promise_featured = rest_caller.getFeaturedTutorials();
               var promise_top = rest_caller.getTopTutorials();

               promise_featured.then(template_generator.displayFeaturedTutorials);
               promise_top.then(template_generator.displayTopTutorials);
            
                
});
