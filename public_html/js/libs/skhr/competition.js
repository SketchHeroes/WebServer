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
                
                
                
            });
    //alert('loading submissions');
    var promise_submissions = rest_caller.getLatestCompetitionTutorials(
                                        {"competition_id":competition_id});

    promise_submissions.done(
        function(data)
        {
            template_generator.submissions = data.competition_tutorials;
            template_generator.addGallery(".submissions .submissions_gallery",template_generator.submissions.length);
            template_generator.displayTutorialGallery(".submissions .submissions_gallery",template_generator.submissions);
            template_generator.displaySubmissionsGalleryFeatures(".submissions .submissions_gallery",template_generator.submissions);


        });
        
//========================CHOOSE SOURCE POPUP=================================

        $('body').on('click', '.competition .compete', function(e)
        //$(".competition .compete").click(function(e) 
        { 
            var overlay = $('<div class="overlay"></div>');
            $("body").append(overlay);

            $('.popup').fadeOut();
            $("#popup_choose_source").fadeIn();

        });

        $("#popup_choose_source .close").click(function(e) { 
                $("#popup_choose_source").fadeOut(); 
                $("body .overlay").remove();
        }); 

        
//========================CHOOSE TUTORIAL GALLERY POPUP=================================

        $('body').on('click', '.choose_from_gallery_button', function(e)
        //$(".competition .compete").click(function(e) 
        { 
            $('.popup').fadeOut();
            $("#popup_choose_gallery").fadeIn();
            
            var promise_user_tutorials = rest_caller.getUserTutorials({
                                                                            "author_skhr_id":localStorage.caller_skhr_id,
                                                                            "tutorial_order_by":{"order_by_content_id":"DESC"}
                                                                        });

            promise_user_tutorials.done(
                function(data)
                {
                    template_generator.user_tutorials = data.tutorials;

                    var length = template_generator.user_tutorials.length;
                    template_generator.removeGallery(".choose_tutorial_gallery");
                    template_generator.addGallery(".choose_tutorial_gallery", length);
                    template_generator.displayTutorialChooseGallery(".choose_tutorial_gallery", template_generator.user_tutorials);

                });

        });

        $("#popup_choose_gallery .close").click(function(e) { 
                $("#popup_choose_gallery").fadeOut(); 
                $("body .overlay").remove();
        }); 

        
//========================SUBMISSIONS GALLERY=================================

        $('body').on('click', '.submission', function(e)
        //$(".competition .compete").click(function(e) 
        { 
            var target = $(e.target);
            
            //target.attr('src','images/ajax-loader.gif');
            $("#popup_choose_gallery").fadeOut(); 
            
            var content_id = target.attr('id');
            content_id = content_id.replace('submission','')
            //alert(content_id);
            //alert(JSON.stringify(template_generator.competition.title)+' + '+JSON.stringify(template_generator.displayCountDown('#popup_choose_completed .inner_popup .message .countdown', template_generator.competition.voting_start)));
            
            var promise_vote= rest_caller.postCompetitionTutorial({
                                                                        'caller_skhr_id':localStorage.caller_skhr_id,
                                                                        'user_token':localStorage.user_token,
                                                                        "competition_id":competition_id,
                                                                        "content_id":content_id
                                                                   });

            promise_vote.done(
                function(data)
                {
                    $("#popup_choose_completed .inner_popup .message").html('<p>You have entered `'+template_generator.competition.title+'` competition.<br />Voting will start in <br /><br /><p class="countdown"></p><br /><h2>Good Luck</h2>');
                    template_generator.displayCountDown('#popup_choose_completed .inner_popup .message .countdown', template_generator.competition.voting_start);
                    $("#popup_choose_completed").fadeIn();
                });
                
            promise_vote.fail(
                function(data)
                {
                    //alert(JSON.stringify(JSON.parse(data.responseText))+' + '+JSON.stringify(data));
                    $("#popup_choose_completed .inner_popup .message").html('<p>Ooops....</p><p>Something went wrong :( </p><br /><h2>'+JSON.parse(data.responseText).error.message+'</h2>');
                    $("#popup_choose_completed").fadeIn();       
                });
        });
        
//=========================================================

        $("#popup_choose_completed .close").click(function(e) { 
                $("#popup_choose_completed").fadeOut(); 
                $("body .overlay").remove();
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
