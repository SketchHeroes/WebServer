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
    
    
    
// -----------------------COMPETITIONS------------------------------------------

    var promise_competitions = rest_caller.getLatestCompetitions({});
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.');
    
    promise_competitions.done(
            function(data)
            {
                template_generator.competitions = data.competitions;
                template_generator.addCompetitions(".competitions",template_generator.competitions.length)
                template_generator.displayCompetitions(".competitions",template_generator.competitions);
                

            });


//==============================================================================
    
});  
