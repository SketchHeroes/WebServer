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
    
    
    var service = new Service();
    var competition_id = service.getParameterByName('competition_id');
    
// -----------------------TUTORIAL DATA-----------------------------------------

    //var competition_id = 1;
    
    var promise_competition = rest_caller.getCompetition({"competition_id":competition_id});
    
    promise_competition.done(
            function(data)
            {
                template_generator.competition = data.competition;
                //template_generator.addCompetition(".competition");
                template_generator.displayCompetition(".competition",template_generator.competition);
                    
                var promise_submissions = rest_caller.getLatestCompetitionTutorials(
                                                    {"competition_id":template_generator.competition.competition_id});

                promise_submissions.done(
                    function(data)
                    {
                        template_generator.submissions = data.competition_tutorials;
                        template_generator.addGallery(".submissions .submissions_gallery",template_generator.submissions.length);
                        template_generator.displayTutorialGallery(".submissions .submissions_gallery",template_generator.submissions);
                    });

                
            });


//==============================================================================
    
});  
