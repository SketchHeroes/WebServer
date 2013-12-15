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
    this.app_token          = 'db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65';
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
    
    //alert(this.verb);
    var request_data;
    if(this.verb === 'GET')
        request_data = this.request_params;
    else
        request_data = JSON.stringify(this.request_params);
    
    //alert(JSON.stringify(this.request_params));
    //alert(request_data);
    
    return $.ajax({
        //async:false,
        cache: this.cache,
        type: this.verb,
        url: this.domain+this.resource,
        dataType: this.accept_data_type,
        contentType: this.content_data_type,
        headers: this.custom_headers,
        crossDomain:this.cross_domain, 
        data: request_data,
        //xhrFields: {withCredentials: true},
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

RestCaller.prototype.getTutorials = function(params)
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token",this.app_token);
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    
    this.setRequestParam("locked",0);
    
    this.setRequestParam("start",params['start']);
    
    this.setRequestParam("how_many",params['how_many']);
    
    if(typeof params['featured'] !== 'undefined')
        this.setRequestParam("featured",params['featured']);
    
    if(typeof params['tutorial_order_by'] !== 'undefined')
        this.setRequestParam("tutorial_order_by",params['tutorial_order_by']);
    else
        this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
        
    if(typeof params['tutorial_count'] !== 'undefined')    
        this.setRequestParam("tutorial_count",params['tutorial_count']);
        
        
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author","tutorial_views":"tutorial_views","tutorial_likes":"tutorial_likes","tutorial_comments":"tutorial_comments"});
    
    if(typeof params['time_constraint'] !== 'undefined')
        this.setRequestParam("time_constraint",{"timestamp_field":"created_at","operator":"younger_then","time_amount":"1","time_interval":""+params['time_constraint']+""});
  
    return this.ajax();
};

// request abstraction methods

RestCaller.prototype.getComments = function(params)
{
    this.setResource("/comments");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token",this.app_token);
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    
    this.setRequestParam("locked",0);
    
    this.setRequestParam("start",params['start']);
    this.setRequestParam("how_many",params['how_many']);
    
    if(typeof params['comment_order_by'] !== 'undefined')
        this.setRequestParam("comment_order_by",params['comment_order_by']);
    else
        this.setRequestParam("comment_order_by",{"order_by_content_id":"DESC"});
        
    if(typeof params['target_content_id'] !== 'undefined')    
        this.setRequestParam("target_content_id",params['target_content_id']);
        
    if(typeof params['author_skhr_id'] !== 'undefined')    
        this.setRequestParam("author_skhr_id",params['author_skhr_id']);
    
    return this.ajax();
}; 


RestCaller.prototype.getMessages = function(params)
{
    this.setResource("/messages");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token",this.app_token);
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3"); 
    
    if(localStorage.caller_skhr_id && localStorage.user_token)
    {
        //alert('logged in: '+localStorage.caller_skhr_id+' '+localStorage.user_token);
        this.setCustomHeader("X-Caller-SKHR-ID",localStorage.caller_skhr_id );
        this.setCustomHeader("X-User-Token",localStorage.user_token);
    } 
    
    this.clearRequestParams();
    
    this.setRequestParam("start",params['start']);
    this.setRequestParam("how_many",params['how_many']);
    
    if(typeof params['msg_order_by'] !== 'undefined')
        this.setRequestParam("msg_order_by",params['msg_order_by']);
    else
        this.setRequestParam("msg_order_by",{"order_by_message_id":"DESC"});
    
    return this.ajax();
}; 


RestCaller.prototype.getContentComments = function(params)
{
    this.setResource("/content/comments");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token",this.app_token);
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    
    this.setRequestParam("locked",0);
    
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start", params['start']);
        this.setRequestParam("how_many", params['how_many']);
    }
    
    if(typeof params['comment_order_by'] !== 'undefined')
        this.setRequestParam("comment_order_by",params['tutorial_order_by']);
    else
        this.setRequestParam("comment_order_by",{"order_by_content_id":"DESC"});
        
    this.setRequestParam("target_content_id",params['target_content_id']);
        
    if(typeof params['author_skhr_id'] !== 'undefined')    
        this.setRequestParam("author_skhr_id",params['author_skhr_id']);
    
    return this.ajax();
};  
    

// request abstraction methods

RestCaller.prototype.getTutorial = function(params)
{
    this.setResource("/tutorial");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token",this.app_token);
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    
    this.setRequestParam("content_id",params['content_id']);
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author","tutorial_views":"tutorial_views","tutorial_likes":"tutorial_likes","tutorial_comments":"tutorial_comments"});
    
    return this.ajax();
};

RestCaller.prototype.getTopUsers = function(params)
{
    this.setResource("/users/top");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    this.setCustomHeader("X-App-Token",this.app_token); 
    
    this.clearRequestParams();
    
    this.setRequestParam("locked",0);
    this.setRequestParam("start",params['start']);
    this.setRequestParam("how_many",params['how_many']);
    
    if(typeof params['top_user_content'] !== 'undefined') 
        this.setRequestParam("top_user_content",params['top_user_content']);
    else
        this.setRequestParam("top_user_content","tutorials");
        
    if(typeof params['top_user_count'] !== 'undefined') 
        this.setRequestParam("top_user_count",params['top_user_count']);
    else
        this.setRequestParam("top_user_count",{"count_views_skhr":"DESC"});
    
    //alert(time_constraint);
    if(typeof params['user_related_data'] !== 'undefined')
    {
        this.setRequestParam("user_related_data",params['user_related_data']);
    }
    
    if(typeof params['time_constraint'] !== 'undefined')
        this.setRequestParam("time_constraint",{"timestamp_field":"created_at","operator":"younger_then","time_amount":"1","time_interval":""+params['time_constraint']+""});
    
    return this.ajax();
};

RestCaller.prototype.getLatestCompetitions = function(params)
{
    this.setResource("/competitions");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start", params['start']);
        this.setRequestParam("how_many", params['how_many']);
    }
    this.setRequestParam("competition_order_by",{"order_by_submission_start":"DESC"});
    this.setRequestParam("status_constraint",{"operator":"different_then","status":"0"});
    
    //alert('what');
    
    return this.ajax();
};

RestCaller.prototype.getCompetition = function(params)
{
    this.setResource("/competition");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    if(localStorage.caller_skhr_id && localStorage.user_token)
    {
        //alert('logged in: '+localStorage.caller_skhr_id+' '+localStorage.user_token);
        this.setCustomHeader("X-Caller-SKHR-ID",localStorage.caller_skhr_id );
        this.setCustomHeader("X-User-Token",localStorage.user_token);
    }
    
    
    this.clearRequestParams();
    
    this.setRequestParam("competition_id",params['competition_id']);
    
    return this.ajax();
};

RestCaller.prototype.getLatestCompetitionTutorials = function(params)
{
    this.setResource("/competition/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json");
    
    if(localStorage.caller_skhr_id && localStorage.user_token)
    {
        //alert('logged in: '+localStorage.caller_skhr_id+' '+localStorage.user_token);
        this.setCustomHeader("X-Caller-SKHR-ID",localStorage.caller_skhr_id );
        this.setCustomHeader("X-User-Token",localStorage.user_token);
    } 
    
    this.clearRequestParams();
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start", params['start']);
        this.setRequestParam("how_many", params['how_many']);
    }
     
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author","tutorial_views":"tutorial_views","tutorial_likes":"tutorial_likes","tutorial_comments":"tutorial_comments"}); 
    
    this.setRequestParam("competition_id",params['competition_id']);
    this.setRequestParam("competition_tutorials_order_by",{"order_by_votes":"DESC"});
    
    return this.ajax();
};

RestCaller.prototype.loginNativeUserEmail = function(params)
{
    this.setResource("/user/login");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("email",params['email']);
    this.setRequestParam("password",params['password']);
    
    return this.ajax();
};

RestCaller.prototype.loginNativeRegister = function(params)
{
    this.setResource("/user/register");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("username",params['username']);
    this.setRequestParam("email",params['email']);
    this.setRequestParam("password",params['password']);
    
    return this.ajax();
};

RestCaller.prototype.loginNativeUserUsername = function(params)
{
    this.setResource("/user/login_username");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("username",params['username']);
    this.setRequestParam("password",params['password']);
    
    return this.ajax();
};

RestCaller.prototype.loginFacebook = function(params)
{
    
    //alert('params: '+JSON.stringify(params));
    
    this.setResource("/user/login_facebook");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("X-FB-User-Token",params['fb_user_token']);
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    this.setRequestParam("username",params['username']);
    this.setRequestParam("email",params['email']);
    this.setRequestParam("id",params['id']);
 
    if(typeof params['first_name'] !== 'undefined')
    {
        this.setRequestParam("first_name",params['first_name']);
    }
    
    if(typeof params['last_name'] !== 'undefined')
    {
        this.setRequestParam("last_name",params['last_name']);
    }
    
    if(typeof params['link'] !== 'undefined')
    {
        this.setRequestParam("link",params['link']);
    }
    
    if(typeof params['updated_time'] !== 'undefined')
    {
        this.setRequestParam("updated_time",params['updated_time']);
    }
    
    return this.ajax();
};


RestCaller.prototype.startFollowingUser = function(params)
{
    this.setResource("/user/follow");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json");
    
    this.setCustomHeader("X-Caller-SKHR-ID",params['caller_skhr_id'] );
    this.setCustomHeader("X-User-Token",params['user_token']);
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("skhr_id",params['skhr_id']);
    
    return this.ajax();
};

RestCaller.prototype.stopFollowingUser = function(params)
{
    this.setResource("/user/follow");
    this.setVerb("DELETE");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json");
    
    this.setCustomHeader("X-Caller-SKHR-ID",params['caller_skhr_id'] );
    this.setCustomHeader("X-User-Token",params['user_token']);
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("skhr_id",params['skhr_id']);
    
    return this.ajax();
};


RestCaller.prototype.getUser = function(params)
{
    this.setResource("/user");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    this.setCustomHeader("X-App-Token",this.app_token); 
    
    if(typeof params['caller_skhr_id'] !== 'undefined' && typeof params['user_token'] !== 'undefined')
    {  
        this.setCustomHeader("X-Caller-SKHR-ID",params['caller_skhr_id'] );
        this.setCustomHeader("X-User-Token",params['user_token']);
    }
    
    this.clearRequestParams();
    this.setRequestParam("skhr_id",params['skhr_id']);
    
    if(typeof params['user_related_data'] !== 'undefined')
    {
        this.setRequestParam("user_related_data",params['user_related_data']);
    }

    return this.ajax();
};


RestCaller.prototype.getTutorialCategory = function(params)
{
    this.setResource("/tutorial_category");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    this.setCustomHeader("X-App-Token",this.app_token); 
    
    this.clearRequestParams();
    this.setRequestParam("tutorial_category_id",params['tutorial_category_id']);

    return this.ajax();
};

RestCaller.prototype.getUserFollows = function(params)
{
    this.setResource("/user/follows");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start", params['start']);
        this.setRequestParam("how_many", params['how_many']);
    }
    this.setRequestParam("skhr_id",params['skhr_id']);
    
    if(typeof params['user_related_data'] !== 'undefined')
    {
        this.setRequestParam("user_related_data",params['user_related_data']);
    }
    
    return this.ajax();
};

RestCaller.prototype.getUserFollowed = function(params)
{
    this.setResource("/user/followed");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start", params['start']);
        this.setRequestParam("how_many", params['how_many']);
    }
    this.setRequestParam("skhr_id",params['skhr_id']);
    
    if(typeof params['user_related_data'] !== 'undefined')
    {
        this.setRequestParam("user_related_data",params['user_related_data']);
    }
    
    return this.ajax();
};

RestCaller.prototype.getUsers= function(params)
{
    this.setResource("/users");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    this.setRequestParam("start", params['start']);
    this.setRequestParam("how_many", params['how_many']);
    
    if(typeof params['user_related_data'] !== 'undefined')
    {
        this.setRequestParam("user_related_data",params['user_related_data']);
    }
    
    return this.ajax();
};

RestCaller.prototype.getUsersCount= function(params)
{
    this.setResource("/users/count");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    
    return this.ajax();
};

RestCaller.prototype.getUserAchievements = function(params)
{
    this.setResource("/user/achievements");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start", params['start']);
        this.setRequestParam("how_many", params['how_many']);
    }
    this.setRequestParam("skhr_id",params['skhr_id']);
    
    return this.ajax();
};

RestCaller.prototype.getBadge = function(params)
{
    this.setResource("/badge");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    this.setRequestParam("badge_id",params['badge_id']);
    
    return this.ajax();
};

// request abstraction methods

RestCaller.prototype.getUserTutorials = function(params)
{
    this.setResource("/user/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token",this.app_token);
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    
    this.setRequestParam("locked",0);
    
    this.setRequestParam("author_skhr_id",params['author_skhr_id']);
    
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start",params['start']);
        this.setRequestParam("how_many",params['how_many']);
    }
    
    if(typeof params['featured'] !== 'undefined')
        this.setRequestParam("featured",params['featured']);
    
    if(typeof params['tutorial_order_by'] !== 'undefined')
        this.setRequestParam("tutorial_order_by",params['tutorial_order_by']);
    else
        this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
        
    if(typeof params['tutorial_count'] !== 'undefined')    
        this.setRequestParam("tutorial_count",params['tutorial_count']);
    
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author","tutorial_views":"tutorial_views","tutorial_likes":"tutorial_likes","tutorial_comments":"tutorial_comments"});
    
    if(typeof params['time_constraint'] !== 'undefined')
        this.setRequestParam("time_constraint",{"timestamp_field":"created_at","operator":"younger_then","time_amount":"1","time_interval":""+params['time_constraint']+""});
    
    return this.ajax();
};

RestCaller.prototype.getCategoryTutorials = function(params)
{
    this.setResource("/category/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token",this.app_token);
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    
    if( params['like'].length > 0)
    {
        this.setRequestParam("tutorial_search_like",{"title":"%"+params['like']+"%"});
    }
    
    this.setRequestParam("locked",0);
    
    this.setRequestParam("tutorial_category_id",params['tutorial_category_id']);
    
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start",params['start']);
        this.setRequestParam("how_many",params['how_many']);
    }
    
    if(typeof params['featured'] !== 'undefined')
        this.setRequestParam("featured",params['featured']);
    
    if(typeof params['tutorial_order_by'] !== 'undefined')
        this.setRequestParam("tutorial_order_by",params['tutorial_order_by']);
    else
        this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
        
    if(typeof params['tutorial_count'] !== 'undefined')    
        this.setRequestParam("tutorial_count",params['tutorial_count']);
    
    this.setRequestParam("tutorial_related_data",{"tutorial_author":"tutorial_author","tutorial_views":"tutorial_views","tutorial_likes":"tutorial_likes","tutorial_comments":"tutorial_comments"});
    
    if(typeof params['time_constraint'] !== 'undefined')
        this.setRequestParam("time_constraint",{"timestamp_field":"created_at","operator":"younger_then","time_amount":"1","time_interval":""+params['time_constraint']+""});
    
    return this.ajax();
};

RestCaller.prototype.getContentLikes = function(params)
{
    this.setResource("/content/likes");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json");
    this.setCustomHeader("X-App-Token",this.app_token);
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.clearRequestParams();
    
    this.setRequestParam("content_id",params['content_id']);
    
    if(typeof params['start'] !== 'undefined' && typeof params['how_many'] !== 'undefined')
    {
        this.setRequestParam("start",params['start']);
        this.setRequestParam("how_many",params['how_many']);
    }
    
    return this.ajax();
};

RestCaller.prototype.likeTutorial = function(params)
{
    this.setResource("/tutorial/like");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json");
    
    this.setCustomHeader("X-Caller-SKHR-ID",params['caller_skhr_id'] );
    this.setCustomHeader("X-User-Token",params['user_token']);
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("content_id",params['content_id']);
    
    return this.ajax();
};

RestCaller.prototype.viewTutorial = function(params)
{
    this.setResource("/tutorial/view");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json");
    
    this.setCustomHeader("X-Caller-SKHR-ID",params['caller_skhr_id'] );
    this.setCustomHeader("X-User-Token",params['user_token']);
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("content_id",params['content_id']);
    
    return this.ajax();
};

RestCaller.prototype.postTutorialComment = function(params)
{
    this.setResource("/tutorial/comment");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json");
    
    this.setCustomHeader("X-Caller-SKHR-ID",params['caller_skhr_id'] );
    this.setCustomHeader("X-User-Token",params['user_token']);
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("target_content_id",params['target_content_id']);
    this.setRequestParam("comment",params['comment']);
    
    return this.ajax();
};

RestCaller.prototype.postCompetitionTutorial= function(params)
{
    this.setResource("/competition/tutorial");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json");
    
    this.setCustomHeader("X-Caller-SKHR-ID",params['caller_skhr_id'] );
    this.setCustomHeader("X-User-Token",params['user_token']);
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("content_id",params['content_id']);
    this.setRequestParam("competition_id",params['competition_id']);
    
    return this.ajax();
};

RestCaller.prototype.postCompetitionVote = function(params)
{
    //alert('in post competition vote');
    
    this.setResource("/competition/vote");
    this.setVerb("POST");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token",this.app_token);
    this.setCustomHeader("Accept","application/json");
    
    this.setCustomHeader("X-Caller-SKHR-ID",params['caller_skhr_id'] );
    this.setCustomHeader("X-User-Token",params['user_token']);
    
    //alert('email: '+params['email']+", password: "+params['password']+".");
    
    this.clearRequestParams();
    this.setRequestParam("competition_tutorial_id",params['competition_tutorial_id']);
    
    return this.ajax();
};


//-------------------- Template class ------------------------------------------

function TemplateGenerator()
{
    //this.records = {};
    //this.placeholder_id = null;
} 


TemplateGenerator.prototype.removeGallery = function(target)
{
    $(target).find('.gallery').remove();
}

TemplateGenerator.prototype.removeUserListComplex = function(target)
{
    $(target).find('.users_list_complex').remove();
}

TemplateGenerator.prototype.addGallery = function(target, size)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class = "inline_block_list gallery"></ul>');
    
    for(var i=0; i<size; i++)
    {
        var single_record = $('<li></li>');
        
            var place = $('<div class="place"></img>');
            single_record.append(place);
        
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
                    
                    var author_avatar = $('<div class="avatar">');
                    info_panel.append(author_avatar);
                    
                        var avatar_frame = $('<img src="images/avatar_frame.png" alt="avatar frame" class="frame"/>');
                        author_avatar.append(avatar_frame);
                    
                    var author_name = $('<div class="author_name"></div>');
                    info_panel.append(author_name);
                    
            var place = $('<div class="vote_frame"></img>');
            single_record.append(place);
        
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
                    
                    var author_avatar = $('<div class="avatar">');
                    info_panel.append(author_avatar);
                    
                        var avatar_frame = $('<img src="images/avatar_frame.png" alt="avatar frame" class="frame"/>');
                        author_avatar.append(avatar_frame);
                    
                    var author_name = $('<div class="author_name"></div>');
                    info_panel.append(author_name);
        
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
        
            var place = $('<div class="place"></img>');
            single_record.append(place);
                /*
                var place_image = $('<img src="images/place1.png" alt="1 place" class="place" id="place1" />');
                place.append(place_image);
                */
        
            var tutorial = $('<div class="thumbnail"></img>');
            single_record.append(tutorial);
        
            var div = $('<div class="author_name"></div>');
            single_record.append(div);
            
            var div = $('<div class="votes"></div>');
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
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
};  

TemplateGenerator.prototype.addUserListComplex = function(target, length)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class="users_list_complex"></ul>');
    
    for(var i=0; i<length; i++)
    {
        var single_record = $('<li></li>');  
        
            var div = $('<div class="avatar"></div>');
            single_record.append(div);
            
                var avatar_frame = $('<img src="images/avatar_frame.png" alt="avatar frame" class="frame"/>');
                div.append(avatar_frame);
                
            var user_info = $('<div class="user_info"></div>');
            single_record.append(user_info); 
        
                var user_name = $('<div class="user_name">...</div>');
                user_info.append(user_name);  

                var user_fans = $('<div class="user_fans">(Fans)</div>');
                user_info.append(user_fans);  

                var stats = $('<div class="stats"></div>');
                user_info.append(stats);

                    var div2 = $('<div class="stat"></div>');
                    stats.append(div2);

                        var img = $('<img src="images/like.png" />');
                        div2.append(img);

                        var div3 = $('<div class="user_likes">0</div>');
                        div2.append(div3);

                    div2 = $('<div class="stat"></div>');
                    stats.append(div2);

                        var img = $('<img src="images/view.png" />');
                        div2.append(img);

                        var div3 = $('<div class="user_views">0</div>');
                        div2.append(div3);

                    div2 = $('<div class="stat"></div>');
                    stats.append(div2);

                        var img = $('<img src="images/tutorial.png" />');
                        div2.append(img);

                        var div3 = $('<div class="user_tutorials">0</div>');
                        div2.append(div3);
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
};


TemplateGenerator.prototype.displayUserListComlex= function(target, users)
{
    //alert(top_users[0].username);
    
    var i = 0;
    $(target+' > ul.users_list_complex > li').each(
            function()
            {
                //alert(JSON.stringify($(this).find(".user_fans")));
                // adding tutorial_title
                
                $(this).find(".avatar .pic").remove();
                $(this).find(".follow_button").remove();
                
                //alert($(this).attr('class'));

                if(users[i] !== undefined) 
                {
                    
                    //alert(users[i].avatar_path);
                    //alert(JSON.stringify($(this).find(".user_name").text()))
                    
                    //-----------------------------------------------------------------------
                    var avatar;
                    
                    if(users[i].avatar_path !== null)
                    {
                        //alert('defined');
                        //avatar = $('<img alt="avatar" class="pic" src="'+users[i].avatar_path+'" >');
                        $(this).find('.avatar').css("background-image", "url("+users[i].avatar_path+")"); 
                    }
                    /*
                    else
                    {
                        //alert('undefined');
                        //avatar = $('<img alt="avatar" class="pic" src="images/avatar_def.png" >');
                    }
                    */

                    //$(this).find(".avatar").append(avatar);

                    $(this).find(".user_name").html('<a href="profile.html?user_id='+users[i].skhr_id+'">'+users[i].username+'</a>');
                    
                    $(this).find(".user_fans").text( 'Fans('+users[i].followed.followed_skhr+')'); 

                    var follow_button = $('<input type="button" value="Follow" class="follow_button follow" id="'+users[i].skhr_id+'">');
                    $(this).append(follow_button);
                    
                    //$(this).find(".follow_button").attr('id',users[i].skhr_id);

                    $(this).find(".stat .user_tutorials").text(users[i].tutorials.tutorials_skhr);
                    $(this).find(".stat .user_likes").text(users[i].likes.likes_skhr);
                    $(this).find(".stat .user_views").text(users[i].views.views_skhr);
                }
        
                i++;
            });
    //alert(i);
    var account = new Account();          
    if( account.isLoggedIn() )
    {
        var service = new Service();
        service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
    }
};  

TemplateGenerator.prototype.addNotificationList = function(target, length)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class="notification_list"></ul>');
    
    for(var i=0; i<length; i++)
    {
        var single_record = $('<li></li>');
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
};   


TemplateGenerator.prototype.displayNotificationList= function(target, messages)
{
    //alert(top_users[0].username);
    
    var i = 0;
    $(target+' > ul.notification_list > li').each(
            function()
            {
                //alert(JSON.stringify($(this)));
                // adding tutorial_title
                
                $(this).text('');
                
                if(messages[i] !== undefined) 
                {
                    $(this).text(messages[i].payload);
                }
        
                i++;
            });
}; 



TemplateGenerator.prototype.addNotificationComplexList = function(target, length)
{
    //$('#data').html("Tutorials:<br /><br />");  
    
    $(target).find('.notification_complex_list').remove();
   
    var list = $('<ul class="notification_complex_list"></ul>');
    
    for(var i=0; i<length; i++)
    {
        var single_record = $('<li></li>');
            
            var created_at = $('<div class="created_at"></div>');
            single_record.append(created_at);
            
            var payload = $('<div class="payload"></div>');
            single_record.append(payload);
        
        list.append(single_record);
    };

    
    $(target).append(list);
    
};  

TemplateGenerator.prototype.displayNotificationComplexList= function(target, messages)
{
    //alert(top_users[0].username);
    var template_generator = this;
    
    var i = 0;
    $(target+' > ul.notification_complex_list > li').each(
            function()
            {
                //alert(JSON.stringify($(this)));
                // adding tutorial_title
                
                $(this).find('.created_at').text('');
                $(this).find('.payload').text('');
                
                if(messages[i] !== undefined) 
                {
                    $(this).find('.created_at').text(template_generator.getDateOnly(messages[i].created_at));
                    $(this).find('.payload').text(messages[i].payload);
                }
        
                i++;
            });
};  


TemplateGenerator.prototype.displayTutorial = function(target,tutorial)
{
    //alert($(target).attr('id'));
    
    $(target).find(".tutorial_title").text(tutorial.title);
    $(target).find(".tutorial_description").text(tutorial.description); 
    $(target).find('.tutorial_info .avatar').css("background-image", "url("+tutorial.author.avatar_path+")"); 
    $(target).find('.tutorial_info .author_name').html('<a href="profile.html?user_id='+tutorial.author_skhr_id+'">'+tutorial.author.username+'</a>');  
                    
    $(target).find(".tutorial_info .stat .tutorial_comments").text(tutorial.comments.comments_skhr);
    $(target).find(".tutorial_info .stat .tutorial_likes").text(tutorial.likes.likes_skhr);
    $(target).find(".tutorial_info .stat .tutorial_views").text(tutorial.views.views_skhr);
    //$(target).find('.tutorial_info div.likes').text(tutorial.likes.likes_skhr);
    //$(target).find('.tutorial_info div.views').text(tutorial.views.views_skhr);
    //$(target).find('.tutorial_info div.comments').text(tutorial.comments.comments_skhr);
    
    //alert($(target).find('.tutorial_info .created_since abbr').attr('title'));
    //alert(tutorial.created_at);
    $(target).find('.tutorial_info .created_since abbr').attr('title',tutorial.created_at);

    $("abbr.timeago").timeago();
    
    
    
    var video_id = tutorial.content_id;	
    var load_url = tutorial.tutorial_path;	
    var flash ="SHPlayer139.swf"; 

    var flashvars = {
        artwork_id:video_id,
        load_url:load_url

            };
    var params = {
            menu: "false",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            autoplay: "true",
            wmode:"transparent",
            bgcolor: "#FFFFFF"
    };
    var attributes = {
                  id:"flash_video_player",
                  name:"flash_video_player"
          };

    swfobject.embedSWF(flash, 'altContent', "675", "452", "10.0.0", "expressInstall.swf", flashvars, params, attributes);
    
    //$('')
};


TemplateGenerator.prototype.displayPainter = function(params)
{
    var rest_caller = new RestCaller();
    
    var video_id = 0;
    //var save_url = "http://www.sketchheroes.com/video/create/user/80742"; 	
    //var save_url = rest_caller.domain + "/tutorial/upload";	
    var save_url;
    /*
    alert(params['competition_id'] + ", typeof: "
            + typeof params['competition_id']
            +", lenght: "+params['competition_id'].length
            +", === 0: "+(params['competition_id'].length === 0)
            +", == 0: "+(params['competition_id'].length == 0));
    */
    
    if( params['competition_id'].length === 0 )
        save_url = "tutorial_upload.php?user_data="+params['user_id']+"_"+params['user_token'];
    else
        save_url = "tutorial_upload.php?user_data="+params['user_id']+"_"+params['user_token']+"_"+params['competition_id'];
    //alert(save_url);
    var flash ="painter_img_upload.swf"; 

    var flashvars = {
        artwork_id:video_id,
        save_url:save_url
    };
    
    var params = {
        menu: "false",
        scale: "noScale",
        allowFullscreen: "true",
        allowScriptAccess: "always",
        wmode:"transparent",
        bgcolor: "#FFFFFF"
    };
    var attributes = {
        id:"flash_video_player",
        name:"flash_video_player"
    };
    
    swfobject.embedSWF(flash, "altContent", "770", "600", "10.0.0", "expressInstall.swf", flashvars, params, attributes);
    //$('')
};

TemplateGenerator.prototype.displayTutorialGallery = function(target, tutorials)
{
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
                
                //$(this).find('img.pic').remove();
                $(this).find('.avatar').css("background-image", "none");  
                
                $(this).find("div.author_name a").remove(); 
                
                $(this).find(".follow_button").remove();
                
                $(this).find(".vote_button").remove();
                $(this).find(".place_img").remove();
                
                // if there is data adding new data to gallery
                if(tutorials[i] !== undefined) 
                { 
                    // adding tutorial_title
                    
                    var link = $('<a href="player.html?tutorial_id='+tutorials[i].content_id+'">'+tutorials[i].title+'</a>');
                    $(this).find("div.tutorial_title").append(link); 

                    // adding tutorial thumbnail
                    //alert($(this).find("div.thumbnail img").attr('src'));
                    var link = $('<a href="player.html?tutorial_id='+tutorials[i].content_id+'"></a>');
                    var thumbnail = $('<img class="thumbnail" alt="tutorial_thumbnail" src="'+tutorials[i].thumbnail_path+'" >');
                    link.append(thumbnail);
                    
                    $(this).find("div.thumbnail").append(link);

                    // adding related data
                    $(this).find('div.likes').text(tutorials[i].likes.likes_skhr);
                    $(this).find('div.views').text(tutorials[i].views.views_skhr);
                    $(this).find('div.comments').text(tutorials[i].comments.comments_skhr);

                    if(tutorials[i].author.avatar_path !== null) 
                    {
                        //var avatar = $('<img alt="avatar" class="pic" src="'+tutorials[i].author.avatar_path+'" >');
                        //$(this).find('.avatar').append(avatar);
                        $(this).find('.avatar').css("background-image", "url("+tutorials[i].author.avatar_path+")");  
                    }

                    // adding author_name 
                    var link = $('<a href="profile.html?user_id='+tutorials[i].author_skhr_id+'">'+tutorials[i].author.username+'</a>');      
                    $(this).find("div.author_name").append(link);

                    var button = $('<input type="button" class="follow_button follow" value="Follow" id="'+tutorials[i].author_skhr_id+'"/>');
                    
                    $(this).find('.info_panel').append(button);
                    //$(this).find('.follow_button').attr('id',tutorials[i].author_skhr_id);
                }
        
                i++;
            });
            
    var account = new Account();          
    if( account.isLoggedIn() )
    {
        var service = new Service();
        service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
    }
}; 


TemplateGenerator.prototype.displayTutorialChooseGallery = function(target, tutorials)
{
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
                
                //$(this).find('img.pic').remove();
                $(this).find('.avatar').css("background-image", "none");  
                
                $(this).find("div.author_name a").remove(); 
                
                $(this).find(".follow_button").remove();
                
                $(this).find(".vote_button").remove();
                $(this).find(".place_img").remove();
                
                // if there is data adding new data to gallery
                if(tutorials[i] !== undefined) 
                { 
                    // adding tutorial_title
                    
                    var link = $('<a href="player.html?tutorial_id='+tutorials[i].content_id+'">'+tutorials[i].title+'</a>');
                    $(this).find("div.tutorial_title").append(link); 

                    // adding tutorial thumbnail
                    //alert($(this).find("div.thumbnail img").attr('src'));
                    var thumbnail = $('<img class="thumbnail submission" id="submission'+tutorials[i].content_id+'" alt="tutorial_thumbnail" src="'+tutorials[i].thumbnail_path+'" >');      
                    $(this).find("div.thumbnail").append(thumbnail);

                    // adding related data
                    $(this).find('div.likes').text(tutorials[i].likes.likes_skhr);
                    $(this).find('div.views').text(tutorials[i].views.views_skhr);
                    $(this).find('div.comments').text(tutorials[i].comments.comments_skhr);

                    if(tutorials[i].author.avatar_path !== null) 
                    {
                        //var avatar = $('<img alt="avatar" class="pic" src="'+tutorials[i].author.avatar_path+'" >');
                        //$(this).find('.avatar').append(avatar);
                        $(this).find('.avatar').css("background-image", "url("+tutorials[i].author.avatar_path+")");  
                    }

                    // adding author_name 
                    var link = $('<a href="profile.html?user_id='+tutorials[i].author_skhr_id+'">'+tutorials[i].author.username+'</a>');      
                    $(this).find("div.author_name").append(link);

                    var button = $('<input type="button" class="follow_button follow" value="Follow" id="'+tutorials[i].author_skhr_id+'"/>');
                    
                    $(this).find('.info_panel').append(button);
                    //$(this).find('.follow_button').attr('id',tutorials[i].author_skhr_id);
                }
        
                i++;
            });
            
    var account = new Account();          
    if( account.isLoggedIn() )
    {
        var service = new Service();
        service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
    }
}; 


TemplateGenerator.prototype.displaySubmissionsGalleryFeatures = function(target, tutorials)
{
    var show_place = false;
    if( $(target).hasClass('submissions_gallery') 
                    &&
        parseInt(localStorage.competition_status) === 3  )
    {
        show_place = true;
    }    
    
    var show_vote_buttons = false;
    if( $(target).hasClass('submissions_gallery') 
            && 
        parseInt(localStorage.competition_status) === 2  )
    {
        show_vote_buttons = true;
    }
    
    var i = 0;
    $(target+' > ul.gallery > li').each(
            function()
            {
                $(this).find(".vote_button").remove();
                $(this).find(".place_img").remove();
                
                // if there is data adding new data to gallery
                if(tutorials[i] !== undefined) 
                { 
                    
                    // add voting button in case this is a submition gallery
                    if(show_place && i<3)
                    {
                        //alert('inside submission gallery');
                        var img = $('<img class="place_img" alt="Winner Place'+(i+1)+'" src="images/place'+(i+1)+'.png"/>');
                        $(this).find('.place').append(img);
                    }
                    
                    // add voting button in case this is a submition gallery
                    if( show_vote_buttons )
                    {
                        //alert(!tutorials[i].has_voted);
                        
                        var vote_button = $('<input type="button" class="vote_button vote" value="Vote" id="'+tutorials[i].competition_tutorial_id+'"/>');

                        if(tutorials[i].has_voted)
                            vote_button.removeClass('vote').addClass('voted').attr('value','Voted');
                        
                        $(this).find('.vote_frame').append(vote_button);
                    }
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
                
                $(this).find('img.pic').remove();
                $(this).find(".follow_button").remove();
                
                //$(this).find("div.author_name a").remove(); 
                $(this).find('.avatar').css("background-image", "none");  
                
                // if there is data adding new data to gallery
                if(tutorials[i] !== undefined) 
                { 
                    // adding tutorial_title
                    var link = $('<a href="player.html?tutorial_id='+tutorials[i].content_id+'">'+tutorials[i].title+'</a>');
                    $(this).find("div.tutorial_title").append(link); 

                    // adding tutorial thumbnail
                    
                    var link = $('<a href="player.html?tutorial_id='+tutorials[i].content_id+'"></a>');
                    var thumbnail = $('<img class="thumbnail" alt="tutorial_thumbnail" src="'+tutorials[i].thumbnail_path+'" >');
                    link.append(thumbnail);
                    
                    $(this).find("div.thumbnail").append(link);

                    if(tutorials[i].author.avatar_path !== null) 
                    {
                        //var avatar = $('<img alt="avatar" class="pic" src="'+tutorials[i].author.avatar_path+'" >');
                        //$(this).find('.avatar').append(avatar);
                        $(this).find('.avatar').css("background-image", "url("+tutorials[i].author.avatar_path+")"); 
                    }


                    // adding author_name 
                    var link = $('<a href="profile.html?user_id='+tutorials[i].author_skhr_id+'">'+tutorials[i].author.username+'</a>');      
                    $(this).find("div.author_name").append(link);
                    
                    var follow_button = $('<input type="button" class="follow_button follow" value="Follow" id="'+tutorials[i].author_skhr_id+'"/>');
                    $(this).find('.info_panel').append(follow_button);
                }
                
                i++;
            });
    //alert(i);
    var account = new Account();          
    if( account.isLoggedIn() )
    {
        var service = new Service();
        service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
    }
};     


TemplateGenerator.prototype.displayTutorialGallerySimple = function(target,tutorials)
{
    //$('#data').html("Tutorials:<br /><br />");  
    //$('body').html("found:<br />");
    //alert(this.recent_tutorials[0].thumbnail_path);
    
    var i = 0;
    $(target+' > ul.simple_gallery > li').each(
            function()
            {
                //alert(tutorials[i]);
                //
                //clearing old data from gallery
                $(this).find("div.thumbnail a").remove();
                
                $(this).find("div.author_name a").remove(); 
                
                $(this).find("div.votes").html(""); 
                
                // if there is data adding new data to gallery
                if(tutorials[i] !== undefined) 
                { 
                    // adding tutorial thumbnail
                    var link = $('<a href="player.html?tutorial_id='+tutorials[i].content_id+'"></a>');
                    var thumbnail = $('<img class="thumbnail" alt="tutorial_thumbnail" src="'+tutorials[i].thumbnail_path+'" >');
                    link.append(thumbnail);
                    
                    $(this).find("div.thumbnail").append(link);

                    // adding author_name 
                    var link = $('<a href="profile.html?user_id='+tutorials[i].author_skhr_id+'">'+tutorials[i].author.username+'</a>');      
                    $(this).find("div.author_name").append(link);
                    
                    // adding number of votes
                    $(this).find("div.votes").html(tutorials[i].votes+" votes"); 
                }
                
                i++;
            });
    //alert(i);
};      


TemplateGenerator.prototype.addCompetition = function(target)
{
    var article = $('<article class="competition_info"></article>');
    
        var header_caption = $('<div class="header_caption"></div>');  
        article.append(header_caption);
    
        var competition_header = $('<img src="images/competition_header.png" alt="competition header" class="header" />'); 
        article.append(competition_header);
        
        var thumbnail = $('<div class="thumbnail"></div>');  
        article.append(thumbnail);
            
            var thumbnail_img = $('<img src="" alt="competition thumbnail" />');
            thumbnail.append(thumbnail_img);
        
        var details = $('<div class="details"></div>');  
        article.append(details);
        
            var description = $('<div class="description"></div>');  
            details.append(description);
        
            var prizes = $('<div class="prizes"></div>');  
            details.append(prizes);
        
                var place = $('<div class="place"></div>');  
                prizes.append(place);
        
                    var img = $('<img src="images/1st-place.png" alt="1st place" />');  
                    place.append(img);
        
                    var caption = $('<div class="caption" id="place1">1st place</div>');  
                    place.append(caption);
        
                place = $('<div class="place"></div>');  
                prizes.append(place);
        
                    var img = $('<img src="images/2nd-place.png" alt="2nd place" />');  
                    place.append(img);
        
                    var caption = $('<div class="caption" id="place2">2nd place</div>');  
                    place.append(caption);
        
                place = $('<div class="place"></div>');  
                prizes.append(place);
        
                    var img = $('<img src="images/3rd-place.png" alt="3rd place" />');  
                    place.append(img);
        
                    var caption = $('<div class="caption" id="place3">3rd place</div>');  
                    place.append(caption);
    
    var time_frame = $("<div class='competition_time_frame'></div>");
    
        var status = $('<div class="status"></div>');
        time_frame.append(status);
        
        var countdown = $("<div class='countdown'></div>");
        time_frame.append(countdown);
                
    $(target).append(article);           
    $(target).append(time_frame);

};           
  
TemplateGenerator.prototype.addCompetitions = function(target, size)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class = "competitions_list"></ul>');
    
    for(var i=0; i<size; i++)
    {
        var item = $("<li id='competition"+i+"'></li");
        list.append(item);
        
            var article = $('<article class="competition_info"></article>');
            item.append(article);

                var header_caption = $('<div class="header_caption"></div>');  
                article.append(header_caption);

                var competition_header = $('<img src="images/competition_header.png" alt="competition header" class="header" />'); 
                article.append(competition_header);

                var thumbnail = $('<div class="thumbnail"></div>');  
                article.append(thumbnail);

                    var thumbnail_img = $('<img src="" alt="competition thumbnail" />');
                    thumbnail.append(thumbnail_img);

                var details = $('<div class="details"></div>');  
                article.append(details);

                    var description = $('<div class="description"></div>');  
                    details.append(description);

                    var prizes = $('<div class="prizes"></div>');  
                    details.append(prizes);

                        var place = $('<div class="place"></div>');  
                        prizes.append(place);

                            var img = $('<img src="images/1st-place.png" alt="1st place" />');  
                            place.append(img);

                            var caption = $('<div class="caption" id="place1">1st place</div>');  
                            place.append(caption);

                        place = $('<div class="place"></div>');  
                        prizes.append(place);

                            var img = $('<img src="images/2nd-place.png" alt="2nd place" />');  
                            place.append(img);

                            var caption = $('<div class="caption" id="place2">2nd place</div>');  
                            place.append(caption);

                        place = $('<div class="place"></div>');  
                        prizes.append(place);

                            var img = $('<img src="images/3rd-place.png" alt="3rd place" />');  
                            place.append(img);

                            var caption = $('<div class="caption" id="place3">3rd place</div>');  
                            place.append(caption);
            
            var time_frame = $("<div class='competition_time_frame'></div>");
    
                var status = $('<div class="status"></div>');
                time_frame.append(status);

                var countdown = $("<div class='countdown'></div>");
                time_frame.append(countdown);
            
            $(item).append(time_frame);
    }
    
    $(target).append(list);

};           


TemplateGenerator.prototype.displayCompetition = function(target,competition)
{
    $(target+" .competition_info .thumbnail img").remove(); 
    var thumbnail_img = $('<img src="'+competition.logo_path+'" alt="competition thumbnail" class="header" />');
    $(target+" .competition_info .thumbnail").append(thumbnail_img);
    
    $(target+" .competition_info .header_caption").text(competition.title); 
    $(target+" .competition_info .details .description").text(competition.description);   
    
    $(target+" .competition_info .details .compete").remove();
    if( parseInt(competition.status) === 1 )
    {
        var complete_button;    
        
        if( competition.is_participating === true )
        {
            //console.log('is true');
            complete_button = $('<input class="competing" type="button" value="COMPETING"/>');
        }
        else
        {
            //console.log('is false');
            //console.log("is_participating (typeof:"+typeof competition.is_participating+" ):  "+competition.is_participating+" = false: "+(competition.is_participating === false));
            complete_button = $('<input class="compete" type="button" value="COMPETE"/>');
        }
            
        $(target+" .competition_info .details").append(complete_button);  
    }

    this.displayCountDownPerStatus(".competition",competition);
    

}; 

TemplateGenerator.prototype.displayCompetitions = function(target,competitions)
{
    var i = 0;
    var template_generator = this;
    
    $(target+' > ul > li').each(
            function()
            { 
                $(this).find(".competition_info .thumbnail img").remove(); 
                var thumbnail_img = $('<img src="'+competitions[i].logo_path+'" alt="competition thumbnail" class="header" />');
                $(this).find(".competition_info .thumbnail").append(thumbnail_img);

                $(this).find(".competition_info .header_caption").html('<a href="competition.html?competition_id='+competitions[i].competition_id+'">'+competitions[i].title+'</a>'); 
                $(this).find(".competition_info .details .description").text(competitions[i].description);   
                
                $(this).find(".competition_info .details .enter_link").remove();
                var link = $('<a class="enter_link" href="competition.html?competition_id='+competitions[i].competition_id+'"></a>');
                    var enter_button = $('<input class="enter" type="button" value="ENTER"/>');
                    link.append(enter_button);
                $(this).find(".competition_info .details").append(link);

                template_generator.displayCountDownPerStatus("#"+this.id,competitions[i]);   
                
                i++;
            });
    
};      


TemplateGenerator.prototype.displayAchievementsGallery = function(target, achievements)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class="achievements_gallery"></ul>');
    
    $.each(achievements, function( index, achievement )
    {
        var single_record = $('<li></li>');
        
            var badge = $('<img class="badge" src="'+achievement.badge_path+'" alt="'+achievement.title+'" />');
            single_record.append(badge);
            //alert('appending');
        
        list.append(single_record);
    });

    
    $('.achievements_window').append(list);
    
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
                
                $(this).find(".user_place").remove();
                $(this).find(".user_name").remove();
                $(this).find(".follow_button").remove();
                
                if(users[i] !== undefined) 
                {
                    
                    //alert(JSON.stringify(top_users[i]));
                    
                    var user_place = $('<div class="user_place">'+i+'</div>');
                    $(this).append(user_place); 

                    var user_name = $('<div class="user_name"></div>');
                    var link = $('<a href="profile.html?user_id='+users[i].skhr_id+'">'+users[i].username+'</a>');  
                    user_name.append(link);
                    $(this).append(user_name);

                    var follow_button = $('<input type="button" class="follow_button follow" value="Follow" id="'+users[i].skhr_id+'">');
                    $(this).append(follow_button);
                    
                    //$(this).find('.follow_button').attr('id',users[i].skhr_id);
                }
        
                i++;
            });
    //alert(i);
    var account = new Account();          
    if( account.isLoggedIn() )
    {
        var service = new Service();
        service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
    }
};   


TemplateGenerator.prototype.displayCommentsList= function(target, comments)
{
    //alert(top_users[0].username);
    
    //alert(JSON.stringify(comments));
    
    var list = $('<ul class="comments_list"></ul>');
    
    var i=0;

    $.each(comments, function( index, comment )
    {
        i++;
        var single_record = $('<li class="clearfix"></li>');
            
            var avatar = $('<div class="avatar"></div');
            single_record.append(avatar);
        
                var img = $('<img src="'+comment.author.avatar_path+'" title="'+comment.author.username+'" alt="Commenter avatar" />');
                avatar.append(img);
            
            var comment_box = $('<div class="comment_box"></div');
            single_record.append(comment_box);
                
                var comment_username = $('<p class="comment_username">'+comment.author.username+'</p>');
                comment_box.append(comment_username);
                
                var comment_comment = $('<p class="comment_comment">'+comment.comment+'</p>');
                comment_box.append(comment_comment);
                
            var comment_timeago = $('<p class="comment_timeago"></p>');
            single_record.append(comment_timeago);

                var timeago = $('<abbr class="timeago_comment" title="'+comment.created_at+'"></abbr>');
                comment_timeago.append(timeago);
        
        list.append(single_record);
    });
    
    //alert(i);
    
    $('.comments_placeholder').append(list);
    
    $("abbr.timeago_comment").timeago();
};   


TemplateGenerator.prototype.displayLatestCompetition= function(target, competition)
{

    //alert(competitions[0].logo_path);
    var link = $('<a href="competition.html?competition_id='+competition.competition_id+'"></a>');
    var thumbnail = $('<img alt="competition_thumbnail" src="'+competition.logo_path+'" >');
    link.append(thumbnail);

    $(target+' .competition_thumbnail').append(link);

    $(target+' .competition_caption').html('('+competition.submission_start+') <a href="competition.html?competition_id='+competition.competition_id+'">'+competition.title+'</a>');
}; 


TemplateGenerator.prototype.displayUser= function(target, user)
{
    //alert(top_users[0].username);
    //var avatar = $('<img alt="avatar" class="pic" src="'+user.avatar_path+'" >');
    
    //$(target).find(".avatar").append(avatar);
    $(target).find('.avatar').css("background-image", "url("+user.avatar_path+")"); 
    
    
    $(target).find(".statistics .user_name").text(user.username);
    $(target).find(".statistics .xp").text(user.xp);
    $(target).find(".statistics .level_title").text(user.level_title);
    $(target).find(".statistics .progress .level_percent").text(parseInt(user.level_progress)+'%');
    $(target).find(".statistics .progress progress").val(user.level_progress);
    $(target).find(".statistics .progress progress .progress-bar span").attr('width',user.level_progress+'%');
    $(target).find(".statistics .progress progress .progress-bar span").text('Progress: '+user.level_progress+'%');
    
    //alert(user.skhr_id);
    $(target).find(".statistics3 .follow_button").attr('id',user.skhr_id); 
    $(target).find(".statistics3 .following").val( 'Following('+user.follows.follows_skhr+')'); 
    $(target).find(".statistics3 .fans").val( 'Fans('+user.followed.followed_skhr+')'); 
    
    $(target).find(".statistics2 .stat .user_tutorials").text(user.tutorials.tutorials_skhr);
    $(target).find(".statistics2 .stat .user_likes").text(user.likes.likes_skhr);
    $(target).find(".statistics2 .stat .user_views").text(user.views.views_skhr);
    
    var account = new Account();
    // if the user is viewing his own profile displaying invite button
    if( account.isLoggedIn() && parseInt(localStorage.caller_skhr_id) === parseInt(user.skhr_id) )
    {
        //alert('adding invite friends button - PROFILE');
        this.displayInviteFriendsButton(target);
    }
    

    
};   
TemplateGenerator.prototype.displayInviteFriendsButton= function(target)
{
    //alert('adding invite friends button');
    var invite_friends = $('<input class="invite_friends" type="button" value="Invite frieds"/>)');
    $(target).find(".statistics2 .invite_friends").remove();
    $(target).find(".statistics2").append(invite_friends);
}


TemplateGenerator.prototype.displayTwoPartGallery= function(part_one_target, part_two_target, tutorials_per_part, page)
{
    
    this.removeGallery(part_one_target);
    this.addGallery(part_one_target, tutorials_per_part);
    this.displayTutorialGallery(part_one_target, this.category_tutorials.slice(page*tutorials_per_part*2,page*tutorials_per_part*2+tutorials_per_part));

    this.removeGallery(part_two_target);
    this.addGallery(part_two_target, tutorials_per_part);
    this.displayTutorialGallery(part_two_target, this.category_tutorials.slice(page*tutorials_per_part*2+tutorials_per_part,page*tutorials_per_part*2+tutorials_per_part*2));

    /*
    var account = new Account();          
    if( account.isLoggedIn() )
    {
        var service = new Service();
        service.updateFollowButtons({"caller_skhr_id":localStorage.caller_skhr_id});
    }
    */
};   

// setters

TemplateGenerator.prototype.setRecords = function(records)
{
    this.records = records;
};

TemplateGenerator.prototype.displayCountDownPerStatus = function(target,competition)
{
    // display countdown          
    switch(parseInt(competition.status))
    {
        case 0:
            $(target).find('.competition_time_frame .status').text('Competition starts in: ');
            this.displayCountDown(target+' .countdown', competition.submission_start);
            break;
        case 1:
            $(target).find('.competition_time_frame .status').text('Submission time left: ');
            this.displayCountDown(target+' .countdown', competition.voting_start);
            break;
        case 2:
            $(target).find('.competition_time_frame .status').text('Voting time left: ');
            this.displayCountDown(target+' .countdown', competition.competition_stop);
            break;
        case 3:
            $(target).find('.competition_time_frame .status').text('Finished since: ');
            this.displayCountDown(target+' .countdown', competition.competition_stop);
            break;
        default:

    }
};

TemplateGenerator.prototype.getDateFromTimeStampDate = function(timestamp_string)
{
    var t = timestamp_string.split(/[- :]/);
    return new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]); 
};

TemplateGenerator.prototype.getDateOnly = function(timestamp_string)
{
    var date = this.getDateFromTimeStampDate(timestamp_string);
    
    //alert(typeof date);
    
    return date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
};

TemplateGenerator.prototype.displayCountDown = function(target,timestamp_string)
{
    //var t = timestamp_string.split(/[- :]/);
    //var target_date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]).getTime();
    
    var target_date = this.getDateFromTimeStampDate(timestamp_string).getTime();
    
    //var target_date = new Date("Aug 15, 2019").getTime();
 
    // variables for time units
    var days, hours, minutes, seconds;

    // get tag element
    var countdown = $(target);
    
    setInterval(function () {

        // find the amount of "seconds" between now and target
        var current_date = new Date().getTime();
        var seconds_left;
        
        if(target_date >= current_date)
            seconds_left = (target_date - current_date) / 1000;
        else
            seconds_left = (current_date - target_date) / 1000;

        // do some time calculations
        days = parseInt(seconds_left / 86400);
        if(days < 10) 
          days = "0" + days;
        
        
        seconds_left = seconds_left % 86400;
        hours = parseInt(seconds_left / 3600);
        if(hours < 10) 
          hours = "0" + hours;
      
        seconds_left = seconds_left % 3600;
        minutes = parseInt(seconds_left / 60);
        if(minutes < 10) 
          minutes = "0" + minutes;
        
        seconds = parseInt(seconds_left % 60);
        if(seconds < 10) 
          seconds = "0" + seconds; 

        // format countdown string + set tag value
        countdown.text(" "+days + " days : " + hours + " hours : " + minutes + " minutes : " + seconds + " seconds");
        //countdown.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;

        
        //alert( days + ":" + hours + ":" + minutes + ":" + seconds );

    }, 1000);
};

//---------------- Account Caller class -------------------------------------------

function Account()
{
       
    
    this.reg_email       = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    this.reg_username    = /^[A-Za-z0-9_.-]{3,50}$/;
    this.reg_password    = /^[A-Za-z0-9]+$/;
    
}   


Account.prototype.loginNativeUser = function(data, rest_caller, template_generator)
{
    
};

Account.prototype.isLoggedIn = function()
{
    if(localStorage.caller_skhr_id && localStorage.user_token)
    {
        //alert('logged IN');
        return true;
    }
    //alert('logged OUT')
    return false;
}

//---------------- Service class -------------------------------------------

function Service()
{
    
}   

Service.prototype.getParameterByName = function(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};


Service.prototype.updateFollowButtons = function(params)
{
    //var service = this;
    
    var rest_caller = new RestCaller();

    if(localStorage.caller_fans)
    {
        var caller_fans = JSON.parse(localStorage.caller_fans);
        
        $.each(caller_fans, function( index, fan ) 
        {
             $('.follow_button[id='+fan.skhr_id+']').attr('value','Unfollow').removeClass('follow').addClass('unfollow');
             //alert(JSON.stringify(fan));
             //alert($('.follow_button#'+fan.skhr_id).attr('value'));
        });
        
        //alert('LOCAL:'+localStorage.caller_fans);
    }
    else
    {
        
        var promise_user_follows = rest_caller.getUserFollows({"skhr_id":params['caller_skhr_id']});
        
        promise_user_follows.done(
            function(data)
            {         
               var caller_fans = data.user_follows; 
               //alert('REMOTE'+JSON.stringify(data.user_follows));
               localStorage.caller_fans = JSON.stringify(data.user_follows);
                //alert(template_generator.user_followed.length);
               //alert('caller_fans'+JSON.stringify(caller_fans))
               // make all follow_buttons with "unfollow" to "follow"
               $('.unfollow').attr('value','Follow').removeClass('unfollow').addClass('follow');
                
               $.each(caller_fans, function( index, fan ) 
               {
                    $('.follow_button[id='+fan.skhr_id+']').attr('value','Unfollow').removeClass('follow').addClass('unfollow');
                    //alert(JSON.stringify(fan));
                    //alert($('.follow_button#'+fan.skhr_id).attr('value'));
               });
               /*
               $('.follow_button').each(
                    function()
                    {
                        var user_id = $(this).attr('id');
                        // if button with "follow" 
                        if($(this).hasClass('follow'))
                        {
                            // and is followed by the caller
                            if(service.isUserInObjectArray(caller_fans,user_id))
                            {
                                $(this).attr('value','Unfollow');
                                $(this).removeClass('follow').addClass('unfollow');
                            }
                        }
                        // if button with "unfollow"
                        else
                        {
                            // and isn't followed by the caller
                            if(!service.isUserInObjectArray(caller_fans,user_id))
                            {
                                $(this).attr('value','Follow');
                                $(this).removeClass('unfollow').addClass('follow');

                            }

                        }
                        //if()
                    });
                    */
                    
            });
    }
        
};

Service.prototype.isUserInObjectArray = function(arr, value)
{
    for(var i=0; i < arr.length; i++ ) 
    {
        if (arr[i].skhr_id === value) {
            return true;
        }
    }
    return false;
};

