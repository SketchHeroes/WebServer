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
        
        var leader_board_length  = 50;


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


//------------------------------------- logging in------------------------------


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

                    promise_login.done(
                        function(data)
                        {
                            
                            alert('success: '+JSON.stringify(data));
                            localStorage.skhr_id    = data.user.skhr_id;
                            localStorage.user_token = data.user.user_token;
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
                            
                            alert('success: '+JSON.stringify(data));
                            localStorage.skhr_id    = data.user.skhr_id;
                            localStorage.user_token = data.user.user_token;
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
                    alert(username_email+' = neither email nor username');
                }
            }



        });


//------------------------------------- logging in------------------------------


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
                        alert('success: '+JSON.stringify(data));
                        localStorage.skhr_id    = data.user.skhr_id;
                        localStorage.user_token = data.user.user_token;
                        $("#popup_register").fadeOut(); 
                        $("body .overlay").remove();
                    });

                promise_register.fail(
                    function(data)
                    {
                        //alert('failure: '+JSON.parse(data.responseText).error.message);
                        $("#popup_register #native_error").text(JSON.parse(data.responseText).error.message);
                    });
            /*
            // if username
            if (account.reg_username.test(username_email) )
            {
                //alert(username_email+' = username');
                var promise_login = rest_caller.loginNativeUserUsername({"username":username_email, "password":password});

                    promise_login.done(
                        function(data)
                        {
                            alert('success: '+JSON.stringify(data));
                            localStorage.skhr_id    = promise
                            localStorage.user_token = promise_login.user_token;
                        });
                        
                    promise_login.fail(
                        function(data)
                        {
                            alert('failure: '+JSON.stringify(data));
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
                            alert('success: '+JSON.stringify(data));
                        });
                        
                    promise_login.fail(
                        function(data)
                        {
                            alert('failure: '+JSON.stringify(data));
                        });
                }
                else
                {
                    alert(username_email+' = neither email nor username');
                }
            }
            */



        });
        
        
        //------------------------------pop ups-----------------------------------------

        // leaderboard popup

        $(".leaderboard").click(function(e) 
         { 
             //alert('leaderboard bitches');
             
             var overlay = $('<div class="overlay"></div>');
             $("body").append(overlay);

             $("#popup_leaderboard").fadeIn(); 
             $("#popup_leaderboard .inner_popup").focus();
             //$("#popup_login input[name=username_email]").focus();

             //alert(typeof template_generator.leaderboard_users);

             // get user leaderboard - only the first time user presses leaderboard button
             if(typeof template_generator.leaderboard_users === 'undefined')
             {
                 alert('first_time');
                 var promise_top_users = rest_caller.getTopUsers({  "start":0,
                                                                    "how_many":leader_board_length,
                                                                    "user_related_data":{
                                                                                            "user_followed":"user_followed",
                                                                                            "user_follows":"user_follows",
                                                                                            "user_tutorials":"user_tutorials",
                                                                                            "user_views":"user_views",
                                                                                            "user_likes":"user_likes",
                                                                                            "user_comments":"user_comments"
                                                                                        }});

                 promise_top_users.done(
                         function(data)
                         {         
                            template_generator.leaderboard_users= data.users;   
                             //alert(template_generator.user_followed.length);

                            //$('#popup_leaderboard h1.caption').text('Fans('+template_generator.user_followed.length+')');
                            template_generator.addUserListComplex("#leader_list", template_generator.leaderboard_users.length); 
                            template_generator.displayUserListComlex("#leader_list", template_generator.leaderboard_users);
                         });
             }

         });

        $("#popup_leaderboard .close").click(function(e) { 
                 $("#popup_leaderboard").fadeOut(); 
                 $("body .overlay").remove();
        }); 
    });
    
});
   
