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


       // logging in


       $(".button_login").click(function(e) 
        { 
            //alert($("#popup_login input[name=username_email]").val());

            var username_email = $("#popup_login input[name=username_email]").val();
            var password = $("#popup_login input[name=password]").val();

            // if username
            if (account.reg_username.test(username_email) )
            {
                //alert(username_email+' = username');
                var promise_login = rest_caller.loginNativeUserEmail({"email":username_email, "password":password});

                    promise_login.done(
                        function(data)
                        {
                            //alert(JSON.stringify(data));
                        });
                        
                    promise_login.fail(
                        function(data)
                        {
                            //alert(JSON.stringify(data));
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
                            //alert(JSON.stringify(data));
                        });
                        
                    promise_login.fail(
                        function(data)
                        {
                            //alert(JSON.stringify(data));
                        });
                }
                else
                {
                    alert(username_email+' = neither email nor username');
                }
            }



        });
    });
    
});
   
