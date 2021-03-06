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
    var content_id = service.getParameterByName('tutorial_id');
        
// -----------------------SOCIAL NETWORKS DATA-----------------------------------------
    
    var url = ""+window.location;
    url = url.replace('localhost','127.0.0.1');
    //url = 'http://serverkizidev-env.elasticbeanstalk.com/public_html/test_object.php?tutorial_id='+content_id;
    //alert(url);
    
    $(document).on('fbload',  //  <---- HERE'S OUR CUSTOM EVENT BEING LISTENED FOR
        function(){
           $("#fb_like_placeholder").html('<div class="fb-like" data-href="'+url+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>');
           $("#fb_share_placeholder").html('<div class="fb-share-button" data-href="'+url+'" data-type="button_count"></div>');
           $("#facebook_comments").html('<div class="fb-comments" data-href="'+url+'" data-numposts="5" data-colorscheme="light"></div>');
           //FB.XFBML.parse(document.getElementById("fb_like_placeholder"));
           
            FB.Event.subscribe('edge.create',
                function(href, widget) {
                    //alert('You liked the URL: ' + href);
                    var promise_fb_like= rest_caller.fbLikeTutorial({
                                                    'caller_skhr_id':localStorage.caller_skhr_id,
                                                    'user_token':localStorage.user_token,
                                                    "content_id":content_id
                                                });

                    promise_fb_like.done(
                        function(data)
                        {

                        });
                }
            );
        });
    $("#googleplus_like_placeholder").html('<div class="g-plusone" data-href="'+url+'"></div>');
    $("#twitter_like_placeholder").html('<a href="https://twitter.com/share" class="twitter-share-button" data-url="'+url+'" data-lang="en">Tweet</a>');
           
    
//----------------------VIEWING TUTORIAL----------------------------------------

    var promise_view= rest_caller.viewTutorial({
                                                    'caller_skhr_id':localStorage.caller_skhr_id,
                                                    'user_token':localStorage.user_token,
                                                    "content_id":content_id
                                                });

    promise_view.done(
        function(data)
        {
            
        });

// -----------------------TUTORIAL DATA-----------------------------------------
    
    //var content_id = 22;

    var promise_tutorial = rest_caller.getTutorial({"content_id":content_id});
    
    promise_tutorial.done(
            function(data)
            {
                template_generator.user_tutorial = data.tutorial; 
                template_generator.displayTutorial('.player_section',template_generator.user_tutorial);         
                $('#other_user_tutorials #gallery_wrapper .heading').html('MORE FROM '+template_generator.user_tutorial.author.username+'');
                //------------------------TUTORIALS COMMENTS-----------------------------------------
                
                var promise_tutorial_comments = rest_caller.getContentComments({"target_content_id":content_id});
    
                promise_tutorial_comments.done(
                        function(data)
                        {
                            template_generator.tutorial_comments = data.comments;;
                            template_generator.displayCommentsList('.comments_placeholder',template_generator.tutorial_comments); 
                            
                        });
                
                //------------------------TUTORIALS LIKES-----------------------------------------
                // if user logged in checking if he has already liked this tutorial
                if( account.isLoggedIn() )
                { 
                    var promise_tutorial_likers = rest_caller.getContentLikes({"content_id":content_id});

                    promise_tutorial_likers.done(
                        function(data)
                        {
                            template_generator.tutorial_likes = data.likes;

                            $.each(template_generator.tutorial_likes, function( index, like )
                            {
                                if( parseInt(like.skhr_id) === parseInt(localStorage.caller_skhr_id) )
                                {
                                    $( ".tutorial_info .like_it" ).removeClass('like_it').addClass('liked_it');
                                    return false;
                                }
                            });
                        }); 
                }
                  
                //------------------------OTHER USER TUTORIALS-----------------------------------------
  
                var promise_user_tutorials = rest_caller.getUserTutorials({
                                                                            "author_skhr_id":template_generator.user_tutorial.author_skhr_id,
                                                                            "tutorial_order_by":{"order_by_content_id":"DESC"}
                                                                        });

                promise_user_tutorials.done(
                    function(data)
                    {
                        template_generator.user_tutorials = data.tutorials; 
                        
                        $.each(template_generator.user_tutorials, function( index, tutorial )
                        {
                            if( parseInt(tutorial.content_id) === parseInt(content_id) )
                            {
                                template_generator.user_tutorials.splice(index,1);
                                return false;
                            }
                        });

                        var length = template_generator.user_tutorials.length;
                        //template_generator.removeGallery("#user_tutorials_gallery_aside");
                        template_generator.addGallery("#user_tutorials_gallery_aside", length);
                        template_generator.displayTutorialGallery("#user_tutorials_gallery_aside", template_generator.user_tutorials);

                    });

            }); 
            
    //----------------------------ADD COMMENT-----------------------------------
    $("body").on('click', ".comment_button", function(event) {
            
            if( account.isLoggedIn() )
            {
                if($('#comment_text').val().length > 0 )
                {

                    var comment = $('#comment_text').val();
                    //alert(comment);

                    var promise_comment= rest_caller.postTutorialComment({
                                                                        'caller_skhr_id':localStorage.caller_skhr_id,
                                                                        'user_token':localStorage.user_token,
                                                                        'target_content_id':content_id,
                                                                        'comment':comment
                                                                    });

                    promise_comment.done(
                        function(data)
                        {
                            $('#comment_text').val('');
                            $('.comments_placeholder').fadeOut();

                            var promise_tutorial_comments = rest_caller.getContentComments({"target_content_id":content_id});

                            promise_tutorial_comments.done(
                                    function(data)
                                    {
                                        $('.comments_list').remove();
                                        template_generator.tutorial_comments = data.comments;;
                                        template_generator.displayCommentsList('.comments_placeholder',template_generator.tutorial_comments); 
                                        $('.comments_placeholder').fadeIn();

                                    });

                        });
                }
                        
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
    //----------------------------LIKE BUTTON-----------------------------------        
            
    $("body").on('click', ".tutorial_info .like_it", function(event) {
    //$( ".tutorial_info .like_it" ).click(function(event) {

        event.stopPropagation(); 
        
        if( account.isLoggedIn() )
        {
            var promise_tutorial_likers = rest_caller.getContentLikes({"content_id":content_id});

            promise_tutorial_likers.done(
                function(data)
                {
                    template_generator.tutorial_likes = data.likes;
                    $.each(template_generator.tutorial_likes, function( index, like )
                    {
                        if( parseInt(like.skhr_id) === parseInt(localStorage.caller_skhr_id) )
                        {
                            $( ".tutorial_info .like_it" ).removeClass('like_it').addClass('liked_it');
                            return false;
                        }
                    });
                    //alert(JSON.stringify($(event.target).attr('class')));
                    if($(event.target).hasClass('like_it'))
                    {
                        //alert('you can like');
                        var promise_like= rest_caller.likeTutorial({
                                                                        'caller_skhr_id':localStorage.caller_skhr_id,
                                                                        'user_token':localStorage.user_token,
                                                                        "content_id":content_id
                                                                    });
    
                        promise_like.done(
                            function(data)
                            {
                            });
                       $( ".tutorial_info .like_it" ).removeClass('like_it').addClass('liked_it');
                    }
                    else
                    {
                        //alert('already liked');
                    }
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
