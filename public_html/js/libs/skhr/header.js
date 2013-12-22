/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    //alert($(".fb_like_placeholder").attr('class'));
    //$(".fb_like_placeholder").html('<div class="fb-like" data-href="'+window.location+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>');
    
    $.ajaxSetup({ cache: true, crossDomain:true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
        FB.init({
          appId: '390754447617631',
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true  // parse XFBML
        });  
        
        $(document).trigger('fbload');
        //alert($(".fb_like_placeholder").attr('class'));
        //$(".fb_like_placeholder").html('<div class="fb-like" data-href="'+window.location+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>');
        //$(".fb_like_placeholder").html('<fb:like id="fbLike" href="'+window.location+'" send="true" width="450" show_faces="true" font=""></fb:like>');
    
        //FB.XFBML.parse($(".fb_like_placeholder"));
      //$('#loginbutton,#feedbutton').removeAttr('disabled');
      //FB.getLoginStatus(updateStatusCallback);
    });
    
    
    
    $("header.main").load("header.html", function() {
        //alert( "Load was performed." );

        var rest_caller          = new RestCaller();
        var template_generator   = new TemplateGenerator();
        var account              = new Account();
        var service              = new Service();
        
        var leader_board_length  = 50;
        
        // configurations for member navigation
        var members_per_page = 4;
        var members_gallery_page = 0;
        var members_nav_pages_length = 5;
        var members_first_in_range = 0;
        var members_last_page = 0;
        
        //$('.searchoform').attr("action","category.html?filter=recent&like="+$("#search_text").val());
        
        if( account.isLoggedIn() )
        {
            //alert('because of login handle login');
            
            handleLogin(    
                            {"caller_skhr_id":localStorage.caller_skhr_id, "user_token":localStorage.user_token}, 
                            rest_caller, 
                            template_generator
                       );
        }

        
//===============================PRIVACY POLICY=================================



        $('body').on('click', '#button_privacy_policy', function(e)
        { 
           window.location.assign("policy.html");
        });         
//===============================ABOUT_US=====================================

        $('body').on('click', '#button_about_us', function(e)
        { 
           window.location.assign("about_us.html");
        }); 
  
        
//===============================CONTACT_US=====================================

        $('body').on('click', '#button_contact_us', function(e)
        { 
           var overlay = $('<div class="overlay"></div>');
           $("body").append(overlay);
           
           //console.log('overlay appended');

           $("#popup_contact_us").fadeIn(); 
           //$("#popup_contact_us .inner_popup").focus();
           
           //console.log('popup_contact_us appended');
        });

        $("#popup_contact_us .close").click(function(e) { 
               $("#popup_contact_us").fadeOut(); 
               $("body .overlay").remove();
        });      
//===============================SEARCH=========================================
        
        
        $( ".searchoform" ).submit(function( event ) {
            //alert( "Handler for .submit() called." );
            event.preventDefault();
            if( $("#search_text").val().length > 0)
                window.location.assign("category.html?filter=recent&like="+$("#search_text").val());
        });
        
        $( "#search_button" ).click(function(event) 
        {

            event.stopPropagation(); 

            //alert($("#search_text").val());
            
            if( $("#search_text").val().length > 0)
                window.location.assign("category.html?filter=recent&like="+$("#search_text").val());
        });
//===============================EXPANDABLE MENU BUTTONS========================

        $( ".expandable > img" ).click(function(event) {

            event.stopPropagation(); 

            var expandable = $(event.target).parent();
            if( $("#"+expandable.attr('id')+" .sub-menu").css("display") === 'none' )
            {
                $("#"+expandable.attr('id')+" .sub-menu").css("display", "block"); 
                $("#"+expandable.attr('id')+" img").attr("src", "images/"+expandable.attr('id')+"_selected.png"); 
            }
            else
            {
                $("#"+expandable.attr('id')+" .sub-menu").css("display", "none"); 
                $("#"+expandable.attr('id')+" img").attr("src", "images/"+expandable.attr('id')+"_unselected.png"); 

            }

            $( ".sub-menu" ).not("#"+expandable.attr('id')+" .sub-menu").css("display", "none"); 
        });

        $( "html" ).click(function(event) {
            $( ".sub-menu" ).css("display", "none"); 
        });  

        $(".expandable > img").mouseleave(function(event){

            var expandable = $(event.target).parent();

            //$("#"+expandable.attr('id')+" .sub-menu").css("display", "none"); 
            $("#"+expandable.attr('id')+" img").attr("src", "images/"+expandable.attr('id')+"_unselected.png"); 
        });

        $(".expandable > img").mouseover(function(event){

            var expandable = $(event.target).parent();
            //$("#"+expandable.attr('id')+" .sub-menu").css("display", "block"); 
            $("#"+expandable.attr('id')+" img").attr("src", "images/"+expandable.attr('id')+"_selected.png"); 
        });


        // non_expandable menu buttons

        $(".non_expandable > img").mouseleave(function(event){

            var non_expandable = $(event.target).parent();

            $("#"+non_expandable.attr('id')+" img").attr("src", "images/"+non_expandable.attr('id')+"_unselected.png"); 
        });

        $(".non_expandable > img").mouseover(function(event){

            var non_expandable = $(event.target).parent();

            $("#"+non_expandable.attr('id')+" img").attr("src", "images/"+non_expandable.attr('id')+"_selected.png"); 
        });

        $(".non_expandable > img").mousedown(function(event){

            var non_expandable = $(event.target).parent();

            $("#"+non_expandable.attr('id')+" img").attr("src", "images/"+non_expandable.attr('id')+"_unselected.png"); 
        });

        $(".non_expandable > img").mouseup(function(event){

            var non_expandable = $(event.target).parent();

            $("#"+non_expandable.attr('id')+" img").attr("src", "images/"+non_expandable.attr('id')+"_selected.png"); 
        });


        // account popup menus

       $(".account #login").click(function(e) 
        { 
            var overlay = $('<div class="overlay"></div>');
            $("body").append(overlay);

            $('.popup').fadeOut();
            $("#popup_login").fadeIn(); 
            $("#popup_login input[name=username_email]").focus();

        });

        $("#popup_login .close").click(function(e) { 
                $("#popup_login").fadeOut(); 
                $("body .overlay").remove();
       }); 

        $(".account #register").click(function(e) 
        { 
            var overlay = $('<div class="overlay"></div>');
            $("body").append(overlay);

            $('.popup').fadeOut();
            $("#popup_register").fadeIn(); 
            $("#popup_register input[name=username]").focus();

        });

        $("#popup_register .close").click(function(e) { 
                $("#popup_register").fadeOut(); 
                $("body .overlay").remove();
       }); 


//-------------------------------------LOGGING IN------------------------------
//=============================================================================


       $(".button_login").click(function(e) 
        { 
            //alert($("#popup_login input[name=username_email]").val());
            $("#popup_login #native_error").text('');

            var username_email = $("#popup_login input[name=username_email]").val();
            var password = $("#popup_login input[name=password]").val();

            // if username
            if (account.reg_username.test(username_email) )
            {
                //alert(username_email+' = username');
                var promise_login = rest_caller.loginNativeUserUsername({"username":username_email, "password":password});
                    
                    // LOGIN successful
                    promise_login.done(
                        function(data)
                        {
                            template_generator.user_credentials = data.user;
                            handleLogin(data, rest_caller, template_generator);

                            $("#popup_login").fadeOut(); 
                            $("body .overlay").remove();  
                        });
                        
                    promise_login.fail(
                        function(data)
                        {
                            $("#popup_login #native_error").text(JSON.parse(data.responseText).error.message);
                        });
            }
            else
            {   
                // if email
                if( account.reg_email.test(username_email) )
                {
                    //alert(username_email+' = email');

                    var promise_login = rest_caller.loginNativeUserEmail({"email":username_email, "password":password});

                    promise_login.done(
                        function(data)
                        {
                            template_generator.user_credentials = data.user;
                            handleLogin(data, rest_caller, template_generator);

                            $("#popup_login").fadeOut(); 
                            $("body .overlay").remove();  
                        });
                        
                    promise_login.fail(
                        function(data)
                        {
                            $("#popup_login #native_error").text(JSON.parse(data.responseText).error.message);
                        });
                }
                else
                {
                    $("#popup_login #native_error").text(username_email+' neither email nor username');
                }
            }



        });
        
//----------------------------LOGGING IN WITH FACEBOOK------------------------------
//=============================================================================


       $(".button_facebook").click(function(e) 
        { 
            //alert($("#popup_login input[name=username_email]").val());
            $("#popup_login #native_error").text('');
            
            $(".popup").fadeOut(); 
            $("body .overlay").remove(); 
            
            fb_login(rest_caller,template_generator);
            

        });


//------------------------------------- LOGGING OUT-----------------------------

$(".options #logout").click(function(e) 
{ 
    /*
    FB.logout(function(response) 
    {
        // user is now logged out
    });
    */
    handleLogout();
    
});
//------------------------------------- REGISTERING------------------------------


       $(".button_register").click(function(e) 
        { 
            //alert($("#popup_login input[name=username_email]").val());
            $("#popup_register #native_error").text('');
            
            var username    = $("#popup_register input[name=username]").val();
            var email       = $("#popup_register input[name=email]").val();
            var password1    = $("#popup_register input[name=password1]").val();
            var password2    = $("#popup_register input[name=password2]").val();
            
            if(!account.reg_username.test(username)){
                $("#popup_register #native_error").text("Invalid username");
                return;
            }
            
            if(!account.reg_email.test(email)){
                $("#popup_register #native_error").text("Invalid email");
                return;
            }
            
            if(!account.reg_password.test(password1)){
                $("#popup_register #native_error").text("Invalid password");
                return;
            }
            
            if(password1 !== password2){
                $("#popup_register #native_error").text("Password confirm do not much");
                return;
            }
            
            if( !$('#popup_register #terms_agree').prop('checked') ){  
                $("#popup_register #native_error").text("You must agree with our Terms");
                return;
            }
            
            //alert(username_email+' = username');
            var promise_register = rest_caller.loginNativeRegister({"username":username,"email":email, "password":password1});

                promise_register.done(
                    function(data)
                    {
                        template_generator.user_credentials = data.user;
                        handleLogin(data, rest_caller, template_generator);

                        $("#popup_register").fadeOut(); 
                        $("body .overlay").remove();  
                    });

                promise_register.fail(
                    function(data)
                    {
                        //alert('failure: '+JSON.parse(data.responseText).error.message);
                        $("#popup_register #native_error").text(JSON.parse(data.responseText).error.message);
                    });
        });
        
        
        //------------------------------LEADER BOARD pop ups-----------------------------------------
        //===========================================================================================

        // leaderboard popup
        $('body').on('click', '.leaderboard, .main_menu #top_heroes_link, #top_heroes .view_more, #button_top_heroes', function(e)
        { 
            //alert('leaderboard bitches');

            var overlay = $('<div class="overlay"></div>');
            $("body").append(overlay);

            $("#popup_leaderboard").fadeIn(); 
            $("#popup_leaderboard .inner_popup").focus();


            // get user leaderboard - only the first time user presses leaderboard button
            if(typeof template_generator.leaderboard_users === 'undefined')
            {
                //alert('first_time');

                var top_users_filter = $( ".leaderboard_menu_list > li > img.active" ).attr('id');

                //alert(top_users_filter);


                var promise_top_users = getTopUsersByFilter(leader_board_length, top_users_filter); 


                promise_top_users.done(
                        function(data)
                        {         
                           template_generator.leaderboard_users= data.users;   

                           template_generator.removeUserListComplex("#leader_list");
                           template_generator.addUserListComplex("#leader_list", template_generator.leaderboard_users.length); 
                           template_generator.displayUserListComlex("#leader_list", template_generator.leaderboard_users);
                           /*
                           if( account.isLoggedIn() )
                           {
                               var service = new Service();
                               service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
                           }
                           */
                        });

            }

        });

        $("#popup_leaderboard .close").click(function(e) { 
                 $("#popup_leaderboard").fadeOut(); 
                 $("body .overlay").remove();
        }); 
        
        
        // LEADERBOARD POPUP expendable menu buttons============================

        $( ".leaderboard_menu_list > li > img" ).click(function(event) {

            event.stopPropagation(); 

            var li = $(event.target).parent();
            
            if( !$("#"+li.attr('id')+" > img").hasClass('active') )
            {
                //alert($( ".leaderboard_menu_list > li#recent_link > img" ).attr("src"));
                $( ".leaderboard_menu_list > li#likes_link > img" ).attr("src", "images/likes_link_unselected.png");
                $( ".leaderboard_menu_list > li#views_link > img" ).attr("src", "images/views_link_unselected.png");
                $( ".leaderboard_menu_list > li#fans_link > img" ).attr("src", "images/fans_link_unselected.png");
                
                $("#"+li.attr('id')+" img").attr("src", "images/"+li.attr('id')+"_selected.png");
                $("#"+li.attr('id')+" img").addClass('active');

                $( ".sub-menu" ).not("#"+li.attr('id')+" .sub-menu").css("display", "none"); 
                $( ".leaderboard_menu_list > li > img" ).not("#"+li.attr('id')+" img").removeClass('active'); 
            }
            
            
            if( li.hasClass("expandable_period") )
            {
                $("#"+li.attr('id')+" .sub-menu").css("display", "block"); 
            }
            else
            {
                $("#popup_leaderboard #leader_list").fadeOut();
                var tutorial_filter = $( ".leaderboard_menu_list > li > img.active" ).attr('id');
                var promise_top_users = getTopUsersByFilter(leader_board_length, tutorial_filter); 
                
                promise_top_users.done(
                function(data)
                {
                    template_generator.leaderboard_users= data.users;
                    
                    template_generator.removeUserListComplex("#leader_list");
                    template_generator.addUserListComplex("#leader_list", template_generator.leaderboard_users.length); 
                    template_generator.displayUserListComlex("#leader_list", template_generator.leaderboard_users);
                    /*
                    if( account.isLoggedIn() )
                    {
                        var service = new Service();
                        service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
                    }
                    */
                    
                    $("#popup_leaderboard #leader_list").fadeIn();   
                }); 
            }
            
            //alert($( ".category .menu .active" ).attr('id'));
        });

        $( "html" ).click(function(event) {
            $( ".sub-menu" ).css("display", "none"); 
        });  


        // user tutorials period buttons

        $( ".expandable_period .sub-menu a" ).click(function(event) {

            $("#popup_leaderboard #leader_list").fadeOut();
            //alert($("#leader_list").attr('id'));
            //alert('fadeOut');
            var period  =  event.target.id;

            //alert(tutorial_filter+":"+period);
            var tutorial_filter = $( ".leaderboard_menu_list > li > img.active" ).attr('id');
            
            var promise_top_users;

            if(period === "all_time")
                promise_top_users = getTopUsersByFilter(leader_board_length, tutorial_filter); 
            else
                promise_top_users = getTopUsersByFilter(leader_board_length, tutorial_filter, period); 

            promise_top_users.done(
                    function(data)
                    {
                        template_generator.leaderboard_users= data.users;   
                        
                        template_generator.removeUserListComplex("#leader_list");
                        template_generator.addUserListComplex("#leader_list", template_generator.leaderboard_users.length); 
                        template_generator.displayUserListComlex("#leader_list", template_generator.leaderboard_users);   
                        /*  
                        if( account.isLoggedIn() )
                        {
                            var service = new Service();
                            service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
                        } 
                        */
                        $("#popup_leaderboard #leader_list").fadeIn(); 
                        //alert('fadeIn');         
                    }); 
        });
        
        
        
//------------------------------MEMBERS pop ups-----------------------------------------
//===========================================================================================

        // members popup
        $('body').on('click', '.all_members, #button_members', function(e)
        {
             //alert('leaderboard bitches');
             
             var overlay = $('<div class="overlay"></div>');
             $("body").append(overlay);

             $("#popup_members").fadeIn(); 
             $("#popup_members .inner_popup").focus();
             

             // get members- only the first time user presses members button
             //if(typeof template_generator.all_members === 'undefined')
             //{
                 //alert('first_time');
                 
                 var promise_users_count = rest_caller.getUsersCount({}); 
                 

                 promise_users_count.done(
                         function(data)
                         {         
                            template_generator.users_count= data.count;
                            
                            //---------------------------MEMBERS-----------------------------
                            var length = template_generator.users_count;
                            members_last_page = Math.floor((length-1)/(members_per_page));
                            displayMembersPagination("#popup_members .navigator", members_nav_pages_length, members_gallery_page, members_last_page, members_first_in_range);
                            outlineMembersPage(members_gallery_page);
                            //alert(last_page);

                            var promise_users = rest_caller.getUsers({  "start":members_gallery_page*members_per_page,
                                                                        "how_many":members_gallery_page*members_per_page+members_per_page,
                                                                        "user_related_data":{
                                                                                                "user_followed":"user_followed",
                                                                                                "user_follows":"user_follows",
                                                                                                "user_tutorials":"user_tutorials",
                                                                                                "user_views":"user_views",
                                                                                                "user_likes":"user_likes",
                                                                                                "user_comments":"user_comments"
                                                                                            }});

                            promise_users.done(
                                    function(data)
                                    { 
                                            template_generator.users = data.users;

                                            template_generator.removeUserListComplex("#members_list");
                                            template_generator.addUserListComplex("#members_list", template_generator.users.length); 
                                            template_generator.displayUserListComlex("#members_list", template_generator.users); 

                                           //alert(tutorial_filter);

                                       }); 



                        

                            $( "#popup_members .navigator #left" ).click(function(event) {

                                if(members_gallery_page>0)
                                {
                                    members_gallery_page--;

                                    $("#members_list").fadeOut();

                                    var promise_users = rest_caller.getUsers({  "start":members_gallery_page*members_per_page,
                                                                        "how_many":members_gallery_page*members_per_page+members_per_page,
                                                                        "user_related_data":{
                                                                                                "user_followed":"user_followed",
                                                                                                "user_follows":"user_follows",
                                                                                                "user_tutorials":"user_tutorials",
                                                                                                "user_views":"user_views",
                                                                                                "user_likes":"user_likes",
                                                                                                "user_comments":"user_comments"
                                                                                            }});

                                    promise_users.done(
                                            function(data)
                                            { 
                                                    template_generator.users = data.users;

                                                    template_generator.removeUserListComplex("#members_list");
                                                    template_generator.addUserListComplex("#members_list", template_generator.users.length); 
                                                    template_generator.displayUserListComlex("#members_list", template_generator.users); 

                                                   //alert(tutorial_filter);

                                               }); 

                                    if(members_gallery_page<members_first_in_range)
                                    {
                                        members_first_in_range = members_gallery_page;
                                        displayMembersPagination("#popup_members .navigator", members_nav_pages_length, members_gallery_page, members_last_page, members_first_in_range);
                                    }
                                    outlineMembersPage(members_gallery_page);

                                    $("#members_list").fadeIn();
                                }

                            });

                            $( "#popup_members .navigator #right" ).click(function(event) {


                                if(members_gallery_page<members_last_page)
                                {
                                    members_gallery_page++;

                                    $("#members_list").fadeOut();

                                    var promise_users = rest_caller.getUsers({  "start":members_gallery_page*members_per_page,
                                                                        "how_many":members_gallery_page*members_per_page+members_per_page,
                                                                        "user_related_data":{
                                                                                                "user_followed":"user_followed",
                                                                                                "user_follows":"user_follows",
                                                                                                "user_tutorials":"user_tutorials",
                                                                                                "user_views":"user_views",
                                                                                                "user_likes":"user_likes",
                                                                                                "user_comments":"user_comments"
                                                                                            }});

                                    promise_users.done(
                                            function(data)
                                            { 
                                                    template_generator.users = data.users;

                                                    template_generator.removeUserListComplex("#members_list");
                                                    template_generator.addUserListComplex("#members_list", template_generator.users.length); 
                                                    template_generator.displayUserListComlex("#members_list", template_generator.users); 

                                                   //alert(tutorial_filter);

                                               }); 

                                    if(members_gallery_page>=members_first_in_range+members_nav_pages_length)
                                    {
                                        members_first_in_range = members_gallery_page;
                                        displayMembersPagination("#popup_members  .navigator", members_nav_pages_length, members_gallery_page, members_last_page, members_first_in_range);
                                    }

                                    outlineMembersPage(members_gallery_page);


                                    $("#members_list").fadeIn();
                                }
                            });

                            $( "#popup_members .navigator #first" ).click(function(event) {

                                if(members_gallery_page !== 0)
                                {
                                    members_gallery_page = 0;

                                    $("#members_list").fadeOut();

                                    var promise_users = rest_caller.getUsers({  "start":members_gallery_page*members_per_page,
                                                                        "how_many":members_gallery_page*members_per_page+members_per_page,
                                                                        "user_related_data":{
                                                                                                "user_followed":"user_followed",
                                                                                                "user_follows":"user_follows",
                                                                                                "user_tutorials":"user_tutorials",
                                                                                                "user_views":"user_views",
                                                                                                "user_likes":"user_likes",
                                                                                                "user_comments":"user_comments"
                                                                                            }});

                                    promise_users.done(
                                            function(data)
                                            { 
                                                    template_generator.users = data.users;

                                                    template_generator.removeUserListComplex("#members_list");
                                                    template_generator.addUserListComplex("#members_list", template_generator.users.length); 
                                                    template_generator.displayUserListComlex("#members_list", template_generator.users); 

                                                   //alert(tutorial_filter);

                                               }); 

                                    if(members_gallery_page<members_first_in_range)
                                    {
                                        members_first_in_range = members_gallery_page;
                                        displayMembersPagination("#popup_members  .navigator", members_nav_pages_length, members_gallery_page, members_last_page, members_first_in_range);
                                    }

                                    outlineMembersPage(members_gallery_page);


                                    $("#members_list").fadeIn();
                                }

                            });

                            $( "#popup_members .navigator #last" ).click(function(event) {


                                if(members_gallery_page !== members_last_page)
                                {
                                    members_gallery_page = members_last_page;
                                    
                                    //alert('members_last_page: '+members_last_page);

                                    $("#members_list").fadeOut();

                                    var promise_users = rest_caller.getUsers({  "start":members_gallery_page*members_per_page,
                                                                        "how_many":members_gallery_page*members_per_page+members_per_page,
                                                                        "user_related_data":{
                                                                                                "user_followed":"user_followed",
                                                                                                "user_follows":"user_follows",
                                                                                                "user_tutorials":"user_tutorials",
                                                                                                "user_views":"user_views",
                                                                                                "user_likes":"user_likes",
                                                                                                "user_comments":"user_comments"
                                                                                            }});

                                    promise_users.done(
                                            function(data)
                                            { 
                                                    template_generator.users = data.users;

                                                    template_generator.removeUserListComplex("#members_list");
                                                    template_generator.addUserListComplex("#members_list", template_generator.users.length); 
                                                    template_generator.displayUserListComlex("#members_list", template_generator.users); 

                                                   //alert(tutorial_filter);

                                               }); 

                                    if(members_gallery_page>=members_first_in_range+members_nav_pages_length)
                                    {
                                        members_first_in_range = members_gallery_page;
                                        displayMembersPagination("#popup_members  .navigator", members_nav_pages_length, members_gallery_page, members_last_page, members_first_in_range);
                                    }

                                    outlineMembersPage(members_gallery_page);

                                    $("#members_list").fadeIn();

                                }
                            });

                            $("#popup_members .navigator [id^=page]").click(function(event) {


                                var new_page = parseInt(event.target.value)-1;

                                //alert(new_page);

                                if( !isNaN(new_page) && members_gallery_page !== new_page )
                                {
                                    members_gallery_page = new_page;

                                    $("#members_list").fadeOut();

                                    var promise_users = rest_caller.getUsers({  "start":members_gallery_page*members_per_page,
                                                                        "how_many":members_gallery_page*members_per_page+members_per_page,
                                                                        "user_related_data":{
                                                                                                "user_followed":"user_followed",
                                                                                                "user_follows":"user_follows",
                                                                                                "user_tutorials":"user_tutorials",
                                                                                                "user_views":"user_views",
                                                                                                "user_likes":"user_likes",
                                                                                                "user_comments":"user_comments"
                                                                                            }});

                                    promise_users.done(
                                            function(data)
                                            { 
                                                    template_generator.users = data.users;

                                                    template_generator.removeUserListComplex("#members_list");
                                                    template_generator.addUserListComplex("#members_list", template_generator.users.length); 
                                                    template_generator.displayUserListComlex("#members_list", template_generator.users); 

                                                   //alert(tutorial_filter);

                                               }); 

                                    outlineMembersPage(members_gallery_page);

                                    $("#members_list").fadeIn();
                                }

                            });


                        //==============================================================================

                        });  

                         
             //}

         });

        $("#popup_members .close").click(function(e) { 
                 $("#popup_members").fadeOut(); 
                 $("body .overlay").remove();
        }); 

//====================================MENU======================================
        $(".main_menu #competitions_link").click(function(event){

            window.location.assign("competitions.html");
        });

//===================================FOLLOW_BUTTON==============================
        $('body').on('click', '.follow', function(e)
        //$(".follow_button").click(function(e) 
        { 
            //alert(e.target.id);
            
            if( account.isLoggedIn() )
            {
                
                var promise_user_follow = rest_caller.startFollowingUser({
                                                                        'caller_skhr_id':localStorage.caller_skhr_id,
                                                                        'user_token':localStorage.user_token,
                                                                        'skhr_id':e.target.id
                                                                    }); 

                promise_user_follow.done(
                        function(data)
                        {
                            var target = $(".follow_button[id="+e.target.id+"]");
                            target.attr('value','Unfollow');
                            target.removeClass('follow').addClass('unfollow');
                            localStorage.removeItem('caller_fans');
                        });

                promise_user_follow.fail(
                        function(data)
                        {
                            //alert(JSON.stringify(data));
                            //if follow pressed on already followed - switching button to the right state
                            if(data.status === 409)
                            {
                                //alert('to much follow');
                                var target = $(".follow_button[id="+e.target.id+"]");
                                target.attr('value','Unfollow');
                                target.removeClass('follow').addClass('unfollow');
                                localStorage.removeItem('caller_fans');
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
//===================================UNFOLLOW_BUTTON==============================
        $('body').on('click', '.unfollow', function(e)
        //$(".follow_button").click(function(e) 
        { 
            //alert(e.target.id);
            
            if( account.isLoggedIn() )
            {
                
                var promise_user_follow = rest_caller.stopFollowingUser({
                                                                        'caller_skhr_id':localStorage.caller_skhr_id,
                                                                        'user_token':localStorage.user_token,
                                                                        'skhr_id':e.target.id
                                                                    }); 

                promise_user_follow.done(
                        function(data)
                        {
                            var target = $(".follow_button[id="+e.target.id+']');
                            target.attr('value','Follow');
                            target.removeClass('unfollow').addClass('follow');
                            localStorage.removeItem('caller_fans');
                        });

                promise_user_follow.fail(
                        function(data)
                        {
                            //alert(JSON.stringify(data));
                            //if unfollow pressed on not followed - switching button to the right state
                            if(data.status === 404)
                            {
                                //alert('to much UNfollow');
                                var target = $(".follow_button[id="+e.target.id+']');
                                target.attr('value','Follow');
                                target.removeClass('unfollow').addClass('follow');
                                localStorage.removeItem('caller_fans');
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
//=======================CREATE TUTORIAL BUTTON=================================
        $('body').on('click', '#create_tutorial, #button_create, #create_link img', function(e)
        //$(".follow_button").click(function(e) 
        { 
            if( account.isLoggedIn() )
            {
                window.location.assign("painter.html");
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
        
//===========================FANS===============================================

        // fans popup
        $('body').on('click', '.fans_caller', function(e)
        //$(".fans").click(function(e) 
         { 
             if( account.isLoggedIn() )
             {
                var overlay = $('<div class="overlay"></div>');
                $("body").append(overlay);

                $("#popup_fans").fadeIn(); 
                $("#popup_fans .inner_popup").focus();
                // get user fans - only the first time user presses fans button
                //if(typeof template_generator.user_followed === 'undefined')
                //{
                    //alert('first_time');
                    var promise_user_followed = rest_caller.getUserFollowed({   "skhr_id":localStorage.caller_skhr_id,
                                                                                "user_related_data":{
                                                                                                        "user_followed":"user_followed",
                                                                                                        "user_follows":"user_follows",
                                                                                                        "user_tutorials":"user_tutorials",
                                                                                                        "user_views":"user_views",
                                                                                                        "user_likes":"user_likes",
                                                                                                        "user_comments":"user_comments"
                                                                                                    }});

                    promise_user_followed.done(
                            function(data)
                            {         
                               template_generator.user_followed = data.user_followed;   
                                //alert(template_generator.user_followed.length);

                               $('#popup_fans h1.caption').text('Fans('+template_generator.user_followed.length+')');
                               template_generator.removeUserListComplex("#fans_list");
                               template_generator.addUserListComplex("#fans_list", template_generator.user_followed.length); 
                               template_generator.displayUserListComlex("#fans_list", template_generator.user_followed);

                            });
                //}
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

        $("#popup_fans .close").click(function(e) { 
                 $("#popup_fans").fadeOut(); 
                 $("body .overlay").remove();
        }); 
 
//===========================FOLLOWING==========================================               

        $('body').on('click', '.following_caller', function(e)
        { 
            if( account.isLoggedIn() )
            {
                var overlay = $('<div class="overlay"></div>');
                $("body").append(overlay);

                $("#popup_following").fadeIn(); 
                $("#popup_following .inner_popup").focus();

                // get user fans - only the first time user presses fans button
                if(typeof template_generator.user_follows === 'undefined')
                {
                    //alert('first_time');
                    var promise_user_follows = rest_caller.getUserFollows({   "skhr_id":localStorage.caller_skhr_id,
                                                                                "user_related_data":{
                                                                                                        "user_followed":"user_followed",
                                                                                                        "user_follows":"user_follows",
                                                                                                        "user_tutorials":"user_tutorials",
                                                                                                        "user_views":"user_views",
                                                                                                        "user_likes":"user_likes",
                                                                                                        "user_comments":"user_comments"
                                                                                                    }});

                    promise_user_follows.done(
                            function(data)
                            {         
                               template_generator.user_follows = data.user_follows;   
                                //alert(template_generator.user_followed.length);

                               $('#popup_following h1.caption').text('Following('+template_generator.user_follows.length+')');
                               template_generator.removeUserListComplex("#following_list");
                               template_generator.addUserListComplex("#following_list", template_generator.user_follows.length); 
                               template_generator.displayUserListComlex("#following_list", template_generator.user_follows);
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

        $("#popup_following .close").click(function(e) { 
                 $("#popup_following").fadeOut(); 
                 $("body .overlay").remove();
        }); 
    });
    
});

   
   
//=====================================FUNCTIONS================================

function getTopUsersByFilter(leader_board_length, filter, period)
{
    
    var rest_caller = new RestCaller();
    var promise_top_users;
    
    switch (filter)
    {
        case "likes":
            if (typeof period === "undefined" || period === null)  
            { 
                
                promise_top_users   = rest_caller.getTopUsers({
                                                "start":0,
                                                "how_many":leader_board_length,
                                                "top_user_count":{"count_likes_skhr":"DESC"},
                                                "user_related_data":{
                                                                        "user_followed":"user_followed",
                                                                        "user_follows":"user_follows",
                                                                        "user_tutorials":"user_tutorials",
                                                                        "user_views":"user_views",
                                                                        "user_likes":"user_likes",
                                                                        "user_comments":"user_comments"
                                                                    }
                                            });
        
                //alert(filter+" All Time");                                              
            }
            else
            {
                promise_top_users   = rest_caller.getTopUsers({
                                                "start":0,
                                                "how_many":leader_board_length,
                                                "time_constraint":period,
                                                "top_user_count":{"count_likes_skhr":"DESC"},
                                                "user_related_data":{
                                                                        "user_followed":"user_followed",
                                                                        "user_follows":"user_follows",
                                                                        "user_tutorials":"user_tutorials",
                                                                        "user_views":"user_views",
                                                                        "user_likes":"user_likes",
                                                                        "user_comments":"user_comments"
                                                                    }
                                            }); 
                //alert(filter+" "+period);
            }
            break;
            
        case "views":
            if (typeof period === "undefined" || period === null) 
            { 
                
                promise_top_users   = rest_caller.getTopUsers({
                                                "start":0,
                                                "how_many":leader_board_length,
                                                "top_user_count":{"count_views_skhr":"DESC"},
                                                "user_related_data":{
                                                                        "user_followed":"user_followed",
                                                                        "user_follows":"user_follows",
                                                                        "user_tutorials":"user_tutorials",
                                                                        "user_views":"user_views",
                                                                        "user_likes":"user_likes",
                                                                        "user_comments":"user_comments"
                                                                    }
                                            });
        
                //alert(filter+" All Time");                                              
            }
            else
            {
                promise_top_users   = rest_caller.getTopUsers({
                                                "start":0,
                                                "how_many":leader_board_length,
                                                "time_constraint":period,
                                                "top_user_count":{"count_views_skhr":"DESC"},
                                                "user_related_data":{
                                                                        "user_followed":"user_followed",
                                                                        "user_follows":"user_follows",
                                                                        "user_tutorials":"user_tutorials",
                                                                        "user_views":"user_views",
                                                                        "user_likes":"user_likes",
                                                                        "user_comments":"user_comments"
                                                                    }
                                            }); 
                //alert(filter+" "+period);
            }            
            break;

        case "fans":
            if (typeof period === "undefined" || period === null)  
            { 
                promise_top_users   = rest_caller.getTopUsers({
                                                "start":0,
                                                "how_many":leader_board_length,
                                                "top_user_content":"followers",
                                                "user_related_data":{
                                                                        "user_followed":"user_followed",
                                                                        "user_follows":"user_follows",
                                                                        "user_tutorials":"user_tutorials",
                                                                        "user_views":"user_views",
                                                                        "user_likes":"user_likes",
                                                                        "user_comments":"user_comments"
                                                                    }
                                            }); 
                
                //alert(filter+" All Time");                                              
            }
            else
            {
                promise_top_users   = rest_caller.getTopUsers({
                                                "start":0,
                                                "how_many":leader_board_length,
                                                "time_constraint":period,
                                                "top_user_content":"followers",
                                                "user_related_data":{
                                                                        "user_followed":"user_followed",
                                                                        "user_follows":"user_follows",
                                                                        "user_tutorials":"user_tutorials",
                                                                        "user_views":"user_views",
                                                                        "user_likes":"user_likes",
                                                                        "user_comments":"user_comments"
                                                                    }
                                            }); 
                //alert(filter+" "+period);
            }
            break;
        default:

            //alert("default: recent");
            break;
    } 
    
    return promise_top_users;
}


function handleLogin(data, rest_caller, template_generator)
{
    //console.log('handle login');
    
    if(typeof data.user !== 'undefined')
    {
        localStorage.caller_skhr_id = data.user.skhr_id;
        localStorage.user_token     = data.user.user_token;
    }
    

    var promise_user = rest_caller.getUser({
                                                "caller_skhr_id":localStorage.caller_skhr_id,
                                                "user_token":localStorage.user_token,
                                                "skhr_id":localStorage.caller_skhr_id
                                            });

    
    promise_user.done(
            function(data)
            {   
                template_generator.user = data.user;
                
                //alert('after getUser: '+JSON.stringify(template_generator.user));

                localStorage.username = data.user.username;
                localStorage.avatar_path= data.user.avatar_path;

                if(data.user.avatar_path !== null)
                {
                    $(".avatar #logged_in_avatar").attr('src',data.user.avatar_path);
                    //alert(data.user.avatar_path);
                }
                
                $(".avatar > a").attr('href','profile.html?user_id='+data.user.skhr_id);
                $(".account .options #username").html('&#9658; <a href="profile.html?user_id='+data.user.skhr_id+'">'+data.user.username+'</a>')
                                                .css('display','inline-block');
                //$(".account .options #username").text(data.user.username).css('display','inline-block');
                $(".account .options #logout").css('display','inline-block');
                $(".account .options #login").css('display','none');
                $(".account .options #register").css('display','none');              

            });
    
    var service = new Service();
    service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
    
    //alert(parseInt(localStorage.caller_skhr_id)+ " " +parseInt($(".statistics3 .follow_button").attr('id')) );
    //alert('handle login');
    
    // for each user info (for now there is only one such per page (profile page)
    // if the user is viewing his own profile displaying invite button
    $('.user_info').each(
            function()
            {
                //alert('user_info found and it has id '+this.id);
                if( $(".statistics3 .follow_button").length !==0 
                        && 
                    parseInt(localStorage.caller_skhr_id) === parseInt($(".statistics3 .follow_button").attr('id')) )
                {
                    
                    //alert('adding invite friends button - LOGIN');
                    template_generator.displayInviteFriendsButton('#'+this.id);
                }
            });
    
    
    
    // if there is a tutorial like button on the page check if the logged in user has
    // already liked this tutorial
    var content_id = service.getParameterByName('tutorial_id');
    if( $( ".tutorial_info .like_it" ).length !== 0 && typeof content_id !== 'undefined')
    {
        var promise_tutorial_likers = rest_caller.getContentLikes({"content_id":content_id});

        promise_tutorial_likers.done(
            function(data)
            {
                template_generator.tutorial_likes = data.likes;

                $.each(template_generator.tutorial_likes, function( index, like )
                {
                    //alert( "like.skhr_id:"+parseInt(like.skhr_id)+" === localStorage.caller_skhr_id:"+parseInt(localStorage.caller_skhr_id) );
                    if( parseInt(like.skhr_id) === parseInt(localStorage.caller_skhr_id) )
                    {
                        $( ".tutorial_info .like_it" ).removeClass('like_it').addClass('liked_it');
                        return false;
                    }
                });
            }); 
    }
    
    // if loggin done on competition page - reloading page data
    if( $( ".submissions_gallery .gallery" ).length !== 0 )
    {
        //console.log('reloading submissions');
        
        var competition_id = service.getParameterByName('competition_id');
        
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
                
        var promise_submissions = rest_caller.getLatestCompetitionTutorials(
                                            {"competition_id":competition_id});

        promise_submissions.done(
            function(data)
            {
                template_generator.submissions = data.competition_tutorials;
                template_generator.removeGallery(".submissions_gallery");
                template_generator.addGallery(".submissions .submissions_gallery",template_generator.submissions.length);
                template_generator.displayTutorialGallery(".submissions .submissions_gallery",template_generator.submissions);
                template_generator.displaySubmissionsGalleryFeatures(".submissions .submissions_gallery",template_generator.submissions);             

            });
    }
    // if loggin done on competition page - reloading page data
    if( $( "#notifications .notification_list" ).length !== 0 )
    {
        //console.log('reloading notification_list');
        var promise_messages = rest_caller.getMessages({"start":0,"how_many":50});

        promise_messages.done(
            function(data)
            {
                //alert('got new messages');
                template_generator.messages = data.messages;
                $( "#notifications .notification_list" ).remove();
                template_generator.addNotificationList("#notifications", template_generator.messages.length);
                template_generator.displayNotificationList("#notifications", template_generator.messages);
                
            });
    }
    

}
function handleLogout()
{
    localStorage.clear();
    sessionStorage.clear();

    $(".avatar #logged_in_avatar").attr('src','images/avatar_def.png');

    $(".account .options #username").css('display','none');
    $(".account .options #logout").css('display','none');
    $(".account .options #login").css('display','inline-block');
    $(".account .options #register").css('display','inline-block');  
    
    $('.unfollow').attr('value','Follow').removeClass('unfollow').addClass('follow');  
    
    $( ".tutorial_info .liked_it" ).removeClass('liked_it').addClass('like_it');
    
    //alert(window.location.href);
    
    //if( !window.location.href.match("index.html#?$") )
    //{
        //alert(typeof window.location);
        window.location.assign("index.html");
    //}

}

function fb_login(rest_caller,template_generator)
{   
    var user = {};
    
    FB.login(function(response) {

        if (response.authResponse) 
        {
            //console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token    = response.authResponse.accessToken; //get access token
            user_id         = response.authResponse.userID; //get FB UID
            
            user.fb_user_token  = access_token;
            user.id             = user_id;

            FB.api('/me', function(response) 
            {
                //alert(JSON.stringify(response));
                user.email      = response.email; 
                user.username   = response.username; 
                //alert('user: '+JSON.stringify(user));
                user.first_name = response.first_name;
                user.last_name = response.last_name;
                user.link = response.link;
                user.updated_time = response.updated_time;
                
                //alert('user: '+JSON.stringify(user));
                var promise_login = rest_caller.loginFacebook(user);

                // LOGIN successful
                promise_login.done(
                    function(data)
                    { 
                        handleLogin(data, rest_caller, template_generator);                    
                    });  

                });  
            
            //return user;

        } 
        else 
        {
            //user hit cancel button
            //onsole.log('User cancelled login or did not fully authorize.');
            //return null;

        }
    }, {
        scope: 'email'
    });
    
    //return user;
    
    
}



//=====================================MEMBER NAVIGATION FUNCTIONS================================

function outlineMembersPage(page)
{
    $("#popup_members .navigator [id^=page]").css('border','1px red hidden');
    $("#popup_members .navigator [id=page"+page+"]").css('border','1px red solid');
}

function displayMembersPagination(navigator_target, nav_pages_length, page, last_page, first_in_range)
{                                                    
    $("#popup_members .navigator [id^=page]").attr('value','...');

    for(var i=0; i<nav_pages_length, i+first_in_range<=last_page; i++)
    {
        $(navigator_target+" #page"+i).attr('value',first_in_range+i+1);
        //alert(navigator_target+" #page"+i);
    }
}
                           