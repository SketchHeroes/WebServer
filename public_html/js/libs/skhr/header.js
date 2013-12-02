/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //alert('You are in ' + (document.compatMode==='CSS1Compat'?'Standards':'Quirks') + ' mode.')
    // difining global variables
    
    $("header.main").load("header.html", function() {
        //alert( "Load was performed." );

        var rest_caller          = new RestCaller();
        var template_generator   = new TemplateGenerator();
        var account              = new Account();
        var service              = new Service();
        
        var leader_board_length  = 50;
        
        if( account.isLoggedIn() )
        {
            handleLogin(    
                            {"caller_skhr_id":localStorage.caller_skhr_id, "user_token":localStorage.user_token}, 
                            rest_caller, 
                            template_generator
                       );
        }

        // expendable menu buttons

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

            $("#popup_login").fadeIn(); 
            //$("#popup_login input[name=username_email]").focus();

        });

        $("#popup_login .close").click(function(e) { 
                $("#popup_login").fadeOut(); 
                $("body .overlay").remove();
       }); 

        $(".account #register").click(function(e) 
        { 
            var overlay = $('<div class="overlay"></div>');
            $("body").append(overlay);

            $("#popup_register").fadeIn(); 

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


//------------------------------------- LOGGING OUT-----------------------------

$(".options #logout").click(function(e) 
{ 
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

        $(".leaderboard, .main_menu #top_heroes_link, #top_heroes .view_more").click(function(e) 
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
        
        

//====================================MENU======================================
        $(".main_menu #competitions_link").click(function(event){

            window.location.assign("competitions.html")
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
                        });
                        
            }
            else
            {
                var overlay = $('<div class="overlay"></div>');
                $("body").append(overlay);

                $("#popup_login").fadeIn(); 
                //$("#popup_login input[name=username_email]").focus();
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
                        });
                        
            }
            else
            {
                var overlay = $('<div class="overlay"></div>');
                $("body").append(overlay);

                $("#popup_login").fadeIn(); 
                //$("#popup_login input[name=username_email]").focus();
            }

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
                $(".account .options #username").text(data.user.username).css('display','inline-block');
                $(".account .options #logout").css('display','inline-block');
                $(".account .options #login").css('display','none');
                $(".account .options #register").css('display','none');              

            });
    
    var service = new Service();
    service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});

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

}
