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
    
    
    var service = new Service();
    var competition_id = service.getParameterByName('competition_id');
    
// -----------------------TUTORIAL DATA-----------------------------------------

    //var competition_id = 1;
    
    var promise_competition = rest_caller.getCompetition({"competition_id":competition_id});
    
    promise_competition.done(
            function(data)
            {
                template_generator.competition = data.competition;
                
                localStorage.is_participating = template_generator.competition.is_participating;
                //localStorage.has_voted = template_generator.competition.has_voted;
                localStorage.competition_status = template_generator.competition.status;
                //alert(localStorage.has_voted);
                //template_generator.addCompetition(".competition");
                template_generator.displayCompetition(".competition",template_generator.competition);
                
                //alert('loading submissions');
                var promise_submissions = rest_caller.getLatestCompetitionTutorials(
                                                    {"competition_id":template_generator.competition.competition_id});

                promise_submissions.done(
                    function(data)
                    {
                        template_generator.submissions = data.competition_tutorials;
                        template_generator.addGallery(".submissions .submissions_gallery",template_generator.submissions.length);
                        template_generator.displayTutorialGallery(".submissions .submissions_gallery",template_generator.submissions);
                        template_generator.displaySubmissionsGalleryFeatures(".submissions .submissions_gallery",template_generator.submissions);
                        
                        
                    });

                
            });
//===================================VOTE BUTTON==============================
        $('body').on('click', '.vote', function(e)
        //$(".follow_button").click(function(e) 
        { 
            var target = $(e.target);
            if( account.isLoggedIn() )
            {
                var promise_vote= rest_caller.postCompetitionVote({
                                                                    'caller_skhr_id':localStorage.caller_skhr_id,
                                                                    'user_token':localStorage.user_token,
                                                                    "competition_tutorial_id":e.target.id
                                                                });

                promise_vote.done(
                    function(data)
                    {
                        target.removeClass('vote').addClass('voted').attr('value','Voted');

                    });
            }
            else
            {
                var overlay = $('<div class="overlay"></div>');
                $("body").append(overlay);

                $('.popup').fadeOut();
                $("#popup_login").fadeIn(); 
                $("#popup_login input[name=username_email]").focus();
            }

        });

//==============================================================================
    
});  
