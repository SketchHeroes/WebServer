/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    var rest_caller          = new RestCaller();
    var template_generator   = new TemplateGenerator();
    
    // getting INITIAL data from the server
    
    //var video_id = "24";	
    //var load_url = 'http://www.sketchheroes.com/video/get?artwork_id=24';
    
    
    
// -----------------------TUTORIAL DATA-----------------------------------------

    var content_id = 22;

    
    var promise_latest_competitions = rest_caller.getLatestCompetitions({"start":0,"how_many":1});
    
    promise_latest_competitions.done(
            function(data)
            {
                template_generator.latest_competitions = data.competitions;
                // template_generator.displayCompetitions('.player_section',template_generator.user_tutorial);   
                
                //------------------------OTHER USER TUTORIALS-----------------------------------------
            }); 


//==============================================================================
    
});  
