/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//---------------- REST Caller class -------------------------------------------

function RestCaller()
{
    this.domain             = "http://serverkizidev-env.elasticbeanstalk.com"
    //this.domain             = "http://localhost/Server";
    this.cross_domain       = true;
    this.verb               = null;
    this.cache              = false;
    this.content_data_type  = 'application/json; charset=UTF-8';
    this.accept_data_type   = 'json';
    this.resource           = null;
    this.request_params     = {};
    this.custom_headers     = {};
    this.complete_handler   = function(data){};
    this.success_handler    = function(data){};
    this.error_handler      = function(data){};
    //this.complete_handler   = function(data){$('body').append("");};
    //this.success_handler    = function(data){$('body').append("");};
    //this.error_handler      = function(data){$('body').append("<br />error: <br />"+JSON.stringify(data));};
    //this.complete_handler   = function(data){$('body').html("complete: <br />"+JSON.stringify(data));};
    //this.success_handler    = function(data){$('body').html("success: <br />"+JSON.stringify(data));};
    //this.error_handler      = function(data){$('body').html("error: <br />"+JSON.stringify(data));};
}   

// setters

RestCaller.prototype.setDomain = function(domain)
{
    this.domain = domain;
};

RestCaller.prototype.setVerb= function(verb)
{
    this.verb = verb;
};

RestCaller.prototype.setCache= function(cache)
{
    this.cache = cache;
};

RestCaller.prototype.setCrossDomain= function(cross_domain)
{
    this.cross_domain = cross_domain;
};

RestCaller.prototype.setAcceptDataType= function(accept_data_type)
{
    this.accept_data_type = accept_data_type;
};

RestCaller.prototype.setContentDataType= function(content_data_type)
{
    this.content_data_type = content_data_type;
};

RestCaller.prototype.setResource= function(resource)
{
    this.resource = resource;
};

RestCaller.prototype.setCustomHeader = function(key, value)
{
    this.custom_headers[key] = value;
};

RestCaller.prototype.setRequestParam = function(key, value)
{
    this.request_params[key] = value;
};

RestCaller.prototype.setCompleteHandler = function(complete_handler)
{
    this.complete_handler = complete_handler;
};

RestCaller.prototype.setSuccessHandler = function(success_handler)
{
    this.success_handler = success_handler;
};

RestCaller.prototype.setErrorHandler = function(error_handler)
{
    this.error_handler = error_handler;
};

// clearers

RestCaller.prototype.clearCustomHeaders = function()
{
    this.custom_headers = {};
};

RestCaller.prototype.clearRequestParams = function()
{
    this.request_params = {};
};

// ajax function

RestCaller.prototype.ajax = function()
{
    /*
    if ( window.XDomainRequest )
        alert("window.XDomainRequest");
    else   
        alert("window.XHR");
    */
    //e.preventDefault();
    return $.ajax({
        //async:false,
        cache: this.cache,
        type: this.verb,
        url: this.domain+this.resource,
        dataType: this.accept_data_type,
        contentType: this.content_data_type,
        headers: this.custom_headers,
        crossDomain:this.cross_domain, 
        data: this.request_params,
        
        complete: this.complete_handler,
        success: this.success_handler,
        error: this.error_handler,
    });
};

/*
RestCaller.prototype.getTutorialLinkedData = function(content_id)
{
    this.setResource("/tutorial");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65");
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    this.setRequestParam("content_id",content_id);
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author","tutorial_views":"tutorial_views","tutorial_likes":"tutorial_likes","tutorial_comments":"tutorial_comments"});
    
    return this.ajax();
}
*/

// request abstraction methods

RestCaller.prototype.getFeaturedTutorials = function(start,how_many)
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65");
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    this.setRequestParam("start",start);
    this.setRequestParam("how_many",how_many);
    this.setRequestParam("featured","1");
    this.setRequestParam("tutorial_count",{"count_views_skhr":"DESC"});
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author","tutorial_views":"tutorial_views","tutorial_likes":"tutorial_likes","tutorial_comments":"tutorial_comments"});
    
    return this.ajax();
};

RestCaller.prototype.getTopUsers = function(start, how_many, time_constraint)
{
    this.setResource("/users/top");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65"); 
    
    this.clearRequestParams();
    this.setRequestParam("start",start);
    this.setRequestParam("how_many",how_many);
    this.setRequestParam("top_user_content","tutorials");
    this.setRequestParam("top_user_count",{"count_views_skhr":"DESC"});
    
    //alert(time_constraint);
    
    if(typeof time_constraint !== 'undefined')
        this.setRequestParam("time_constraint",{"timestamp_field":"created_at","operator":"younger_then","time_amount":"1","time_interval":""+time_constraint+""});
    
    return this.ajax();
};



RestCaller.prototype.getTopTutorials = function(start, how_many, time_constraint)
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65");
    this.setCustomHeader("Accept","application/json");
    
    this.clearRequestParams();
    this.setRequestParam("start",start);
    this.setRequestParam("how_many",how_many);
    this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
    this.setRequestParam("tutorial_count",{"count_views_skhr":"DESC"});
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author","tutorial_views":"tutorial_views","tutorial_likes":"tutorial_likes","tutorial_comments":"tutorial_comments"});
    
    
    if(typeof time_constraint !== 'undefined')
        this.setRequestParam("time_constraint",{"timestamp_field":"created_at","operator":"younger_then","time_amount":"1","time_interval":""+time_constraint+""});
    
    return this.ajax();
};

RestCaller.prototype.getRecentTutorials = function(start, how_many)
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65");
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    this.setRequestParam("start", start);
    this.setRequestParam("how_many", how_many);
    this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author"});
    
    
    return this.ajax();
};

RestCaller.prototype.getLatestCompetitions = function(start, how_many)
{
    this.setResource("/competitions");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65");
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    this.setRequestParam("start", start);
    this.setRequestParam("how_many", how_many);
    this.setRequestParam("competition_order_by",{"order_by_submission_start":"DESC"});
    this.setRequestParam("status_constraint",{"operator":"different_then","status":"0"});
    
    return this.ajax();
};

//-------------------- Template class ------------------------------------------

function TemplateGenerator()
{
    //this.records = {};
    //this.placeholder_id = null;
} 

TemplateGenerator.prototype.addGallery = function(target, size)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class = "inline_block_list gallery"></ul>');
    
    for(var i=0; i<size; i++)
    {
        var single_record = $('<li></li>');
        
            var div = $('<div></div>');
            single_record.append(div);
        
                var tutorial_title = $('<div class="tutorial_title"></div>');
                div.append(tutorial_title);
        
                var thumbnail = $('<div class="thumbnail">');
                div.append(thumbnail);
        
                var info_panel = $('<div class="info_panel"></div>');
                div.append(info_panel);
                    
                    var image = $('<img class="likes_image" src="images/like.png">');
                    info_panel.append(image);
                    
                    image = $('<div class="likes">');
                    info_panel.append(image);
                    
                    image = $('<img class="views_image"src="images/view.png">');
                    info_panel.append(image);
                    
                    image = $('<div class="views">');
                    info_panel.append(image);
                    
                    image = $('<img class="comments_image" src="images/comment.png">');
                    info_panel.append(image);
                    
                    image = $('<div class="comments">');
                    info_panel.append(image);
                    
                    var author_avatar = $('<div class="author_avatar">');
                    info_panel.append(author_avatar);
                    
                        image = $('<img class="author_avatar" src="images/avatar_default.png">');
                        author_avatar.append(image);
                    
                    var author_name = $('<div class="author_name"></div>');
                    info_panel.append(author_name);
                        
                    image = $('<img class="follow_button" src="images/follow-button.png">');
                    info_panel.append(image);
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
};  


TemplateGenerator.prototype.addGalleryLess = function(target, size)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class = "inline_block_list gallery_less"></ul>');
    
    for(var i=0; i<size; i++)
    {
        var single_record = $('<li></li>');
        
            var div = $('<div></div>');
            single_record.append(div);
        
                var tutorial_title = $('<div class="tutorial_title"></div>');
                div.append(tutorial_title);
        
                var thumbnail = $('<div class="thumbnail">');
                div.append(thumbnail);
        
                var info_panel = $('<div class="info_panel"></div>');
                div.append(info_panel);
                    
                    var author_avatar = $('<div class="author_avatar">');
                    info_panel.append(author_avatar);
                    
                        var image = $('<img class="author_avatar" src="images/avatar_default.png">');
                        author_avatar.append(image);
                    
                    var author_name = $('<div class="author_name"></div>');
                    info_panel.append(author_name);
                        
                    image = $('<img class="follow_button" src="images/follow-button.png">');
                    info_panel.append(image);
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
};   

TemplateGenerator.prototype.addSimpleGallery = function(target, length)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class="inline_block_list simple_gallery"></ul>');
    
    for(var i=0; i<length; i++)
    {
        var single_record = $('<li></li>');
        
            var tutorial = $('<img class="thumbnail"></img>');
            single_record.append(tutorial);
        
            var div = $('<div class="tutorial_title"></div>');
            single_record.append(div);
            
            var div = $('<div class="views"></div>');
            single_record.append(div);
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
};    

TemplateGenerator.prototype.addUserList = function(target, length)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class="users_list"></ul>');
    
    for(var i=0; i<length; i++)
    {
        var single_record = $('<li></li>');
        
            var user_place = $('<div class="user_place">'+i+'</div>');
            single_record.append(user_place); 
            
            var user_name = $('<div class="user_name"></div>');
            single_record.append(user_name); 
            
                var link = $('<a href="/"></a>');
                user_name.append(link); 
            
            var image = $('<img class="follow_button" src="images/follow-button.png">');
            single_record.append(image);
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
};


TemplateGenerator.prototype.addNotificationList = function(target)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class="notification_list"></ul>');
    
    for(var i=0; i<40; i++)
    {
        var single_record = $('<li>New message '+i+'</li>');
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
}; 

TemplateGenerator.prototype.displayTutorialGallery = function(target, tutorials)
{
    //$('#data').html("Tutorials:<br /><br />");  
    //$('body').html("found:<br />");
    //alert(this.featured_tutorials[0].thumbnail_path);
    
    var i = 0;
    $(target+' > ul.gallery > li').each(
            function()
            {
                //clearing old data from gallery
                
                $(this).find("div.tutorial_title a").remove(); 
                $(this).find("div.thumbnail a").remove();
                
                $(this).find('div.likes').text('');
                $(this).find('div.views').text('');
                $(this).find('div.comments').text('');
                
                $(this).find('img.author_avatar').attr("src","images/avatar_default.png");
                
                $(this).find("div.author_name a").remove(); 
                
                // if there is data adding new data to gallery
                if(tutorials[i] !== undefined) 
                { 
                    // adding tutorial_title
                    
                    var link = $('<a href="">'+tutorials[i].title+'</a>');
                    $(this).find("div.tutorial_title").append(link); 

                    // adding tutorial thumbnail
                    //alert($(this).find("div.thumbnail img").attr('src'));
                    var link = $('<a href="#"></a>');
                    var thumbnail = $('<img class="thumbnail" alt="tutorial_thumbnail" src="'+tutorials[i].thumbnail_path+'" >');
                    link.append(thumbnail);
                    
                    $(this).find("div.thumbnail").append(link);

                    // adding related data
                    $(this).find('div.likes').text(tutorials[i].likes.likes_skhr);
                    $(this).find('div.views').text(tutorials[i].views.views_skhr);
                    $(this).find('div.comments').text(tutorials[i].comments.comments_skhr);

                    if(tutorials[i].author.avatar_path !== null)              
                        $(this).find('img.author_avatar').attr("src",tutorials[i].author.avatar_path);

                    // adding author_name 
                    var link = $('<a href="">'+tutorials[i].author.username+'</a>');      
                    $(this).find("div.author_name").append(link);
                }
        
                i++;
            });
            
    
};    


TemplateGenerator.prototype.displayTutorialGalleryLess = function(target,tutorials)
{
    //$('#data').html("Tutorials:<br /><br />");  
    //$('body').html("found:<br />");
    //alert(this.recent_tutorials[0].thumbnail_path);
    
    var i = 0;
    $(target+' > ul.gallery_less > li').each(
            function()
            {
                //alert(tutorials[i]);
                //
                //clearing old data from gallery
                
                $(this).find("div.tutorial_title a").remove(); 
                $(this).find("div.thumbnail a").remove();
                
                $(this).find('img.author_avatar').attr("src","images/avatar_default.png");
                
                $(this).find("div.author_name a").remove(); 
                
                // if there is data adding new data to gallery
                if(tutorials[i] !== undefined) 
                { 
                    // adding tutorial_title
                    var link = $('<a href="">'+tutorials[i].title+'</a>');
                    $(this).find("div.tutorial_title").append(link); 

                    // adding tutorial thumbnail
                    
                    var link = $('<a href="#"></a>');
                    var thumbnail = $('<img class="thumbnail" alt="tutorial_thumbnail" src="'+tutorials[i].thumbnail_path+'" >');
                    link.append(thumbnail);
                    
                    
                    var link = $('<a href="#"></a>');
                    var thumbnail = $('<img class="thumbnail" alt="tutorial_thumbnail" src="'+tutorials[i].thumbnail_path+'" >');
                    link.append(thumbnail);
                    
                    $(this).find("div.thumbnail").append(link);

                    if(tutorials[i].author.avatar_path !== null)              
                        $(this).find('img.author_avatar').attr("src",tutorials[i].author.avatar_path);

                    // adding author_name 
                    var link = $('<a href="">'+tutorials[i].author.username+'</a>');      
                    $(this).find("div.author_name").append(link);
                }
                
                i++;
            });
    //alert(i);
};   


TemplateGenerator.prototype.displayUserList= function(target, users)
{
    //alert(top_users[0].username);
    
    var i = 0;
    $(target+' > ul.users_list > li').each(
            function()
            {
                //alert(JSON.stringify($(this)));
                // adding tutorial_title
                
                $(this).find(".user_name a").remove();
                
                if(users[i] !== undefined) 
                {                                     
                    //alert(JSON.stringify(top_users[i]));
                    var link = $('<a href="">'+users[i].username+'</a>');  
                    $(this).find(".user_name").append(link);
                }
        
                i++;
            });
    //alert(i);
    
};   


TemplateGenerator.prototype.displayLatestCompetition= function(target, competitions)
{
    if(competitions.length > 0)
    {
        //alert(competitions[0].logo_path);
        var link = $('<a href="#"></a>');
        var thumbnail = $('<img alt="competition_thumbnail" src="'+competitions[0].logo_path+'" >');
        link.append(thumbnail);

        $(target+' .competition_thumbnail').append(link);
        
        $(target+' .competition_caption').html('('+competitions[0].submission_start+') '+competitions[0].title+'');

        //$(target+' .competition_thumbnail img').attr('src',competitions[0].logo_path);
    }

};

// setters

TemplateGenerator.prototype.setRecords = function(records)
{
    this.records = records;
};
