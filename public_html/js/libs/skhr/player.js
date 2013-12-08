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
    
    $(document).on('fbload',  //  <---- HERE'S OUR CUSTOM EVENT BEING LISTENED FOR
        function(){
           var url = ""+window.location;
           url = url.replace('localhost','127.0.0.1');
           alert(url);
           $("#fb_like_placeholder").html('<div class="fb-like" data-href="'+url+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>');
           FB.XFBML.parse(document.getElementById("fb_like_placeholder"));
        });
    
    /*
    
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
        FB.init({
          appId: '390754447617631',
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });  
        alert(window.location);
        //$("#fb_like_placeholder").html('<fb:like id="fbLike" href="'+window.location+'" send="true" width="450" show_faces="true" font=""></fb:like>');
    
        //FB.XFBML.parse(document.getElementById("fb_like_placeholder"));
      //$('#loginbutton,#feedbutton').removeAttr('disabled');
      //FB.getLoginStatus(updateStatusCallback);
    });
    //alert("content_id: "+content_id);
    //alert(window.location);
    
    //$(".fb_like_placeholder_test").html('<div class="fb-like" data-href="'+window.location+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>');
    //$(".fb_like_placeholder .fb-like").attr('data-href',window.location);
    //FB.XFBML.parse();
    */
        
        
// -----------------------SOCIAL NETWORKS DATA-----------------------------------------
    /*
    (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    fjs.parentNode.insertBefore(js, fjs);
                  }(document, 'script', 'facebook-jssdk'));
    var deferred = $.Deferred();
    window.fb_loaded = deferred.promise();

    window.fbAsyncInit = function() {
        FB.init({
          appId      : '390754447617631',
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });
    };

    deferred.resolve();
    
    $.when(window.fb_loaded).then(function(){
       
        $(".fb_like_placeholder_test").html('<div class="fb-like" data-href="'+window.location+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>');
        FB.XFBML.parse();
        //alert(JSON.strigify(FB.XFBML))
        //FB.XFBML.parse($('.fb_like_placeholder'));

    });
    */
    /*
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
      FB.init({
        appId: '390754447617631',
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });  
      $(".fb_like_placeholder").html('<div class="fb-like" data-href="'+window.location+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>');
      FB.XFBML.parse();
      //$('#loginbutton,#feedbutton').removeAttr('disabled');
      //FB.getLoginStatus(updateStatusCallback);
    });
    */
    

// -----------------------TUTORIAL DATA-----------------------------------------
    
    //var content_id = 22;

    var promise_tutorial = rest_caller.getTutorial({"content_id":content_id});
    
    promise_tutorial.done(
            function(data)
            {
                template_generator.user_tutorial = data.tutorial; 
                template_generator.displayTutorial('.player_section',template_generator.user_tutorial);   
                
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
                                $( ".tutorial_info .like_it" ).removeClass('like_it').addClass('liked_it');
                            });
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
