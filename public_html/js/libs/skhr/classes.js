/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//---------------- REST Caller class -------------------------------------------

function RestCaller()
{
    this.domain             = "http://serverkizidev-env.elasticbeanstalk.com";
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
    //this.error_handler      = function(data){$('body').html(JSON.stringify(data));};
    this.error_handler      = function(data){};
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
        
        //complete: this.complete_handler,
        //success: this.success_handler,
        error: this.error_handler,
    });
};

// request abstraction methods

RestCaller.prototype.getFeaturedTutorials = function()
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
    this.setRequestParam("start","0");
    this.setRequestParam("how_many","50");
    this.setRequestParam("featured","1");
    
    return this.ajax();
};



RestCaller.prototype.getTopTutorials = function(time_constraint)
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65");
    this.setCustomHeader("Accept","application/json");
    
    this.clearRequestParams();
    this.setRequestParam("start","0");
    this.setRequestParam("how_many","50");
    this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
    this.setRequestParam("tutorial_count",{"count_views":"DESC"});
    
    if(typeof time_constraint !== 'undefined')
        this.setRequestParam("time_constraint",{"timestamp_field":"created_at","operator":"younger_then","time_amount":"1","time_interval":""+time_constraint+""});
    
    return this.ajax();
};

RestCaller.prototype.getRecentTutorials = function()
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65");
    this.setCustomHeader("Accept","application/json"); 
    
    this.clearRequestParams();
    this.setRequestParam("start","0");
    this.setRequestParam("how_many","50");
    this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
    
    return this.ajax();
};

RestCaller.prototype.getTopUsers = function(time_constraint)
{
    this.setResource("/users/top");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.clearCustomHeaders();
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    this.setCustomHeader("X-App-Token","db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65"); 
    
    this.clearRequestParams();
    this.setRequestParam("start","0");
    this.setRequestParam("how_many","5");
    this.setRequestParam("top_user_content","tutorials");
    this.setRequestParam("top_user_count",{"count_views":"DESC"});
    
    if(typeof time_constraint !== 'undefined')
        this.setRequestParam("time_constraint",{"timestamp_field":"created_at","operator":"younger_then","time_amount":"1","time_interval":""+time_constraint+""});
    
    return this.ajax();
};

//-------------------- Template class ------------------------------------------

function TemplateGenerator()
{
    //this.records = {};
    //this.placeholder_id = null;
} 

TemplateGenerator.prototype.displayFeaturedTutorials = function(data,target)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul class = "inline_block_extented gallery"></ul>');
    
    $.each(data.tutorials, function( index, value ) 
    {
        var single_record = $('<li></li>');
        
            var div = $('<div></div>');
            single_record.append(div);
        
                var link = $('<a href="'+value.tutorial_path+'"></a>');
                div.append(link);
        
                    var image = $('<img src="'+value.thumbnail_path+'">');
                    link.append(image);
        
                var h4 = $('<h4></h4>');
                div.append(h4);
        
                    var link = $('<a href="'+value.tutorial_path+'">'+value.title+'</a>');
                    h4.append(link);
        
        list.append(single_record);
    });

    
    $(target).append(list);
    
}; 

TemplateGenerator.prototype.displayFeaturedTutorialsOLD = function(data,target)
{
    //$('#data').html("Tutorials:<br /><br />");  
   
    var list = $('<ul></ul>');
    
    $.each(data.tutorials, function( index, value ) 
    {
        var single_record = $('<li class="singlevideo item"></li>');
        
        var div = $('<div class="pic"></div>');
        single_record.append(div);
        
        var link = $('<a href="'+value.tutorial_path+'"></a>');
        div.append(link);
        
        var image = $('<img src="'+value.thumbnail_path+'" class="replacethumb">');
        link.append(image);
        
        var h4 = $('<h4></h4>');
        div.append(h4);
        
        var link = $('<a href="'+value.tutorial_path+'">'+value.title+'</a>');
        h4.append(link);
        
        list.append(single_record);
    });

    
    $(target).append(list);
    
};

TemplateGenerator.prototype.displayTopTutorials = function(data,target)
{
    var list = $('<div></div>');
    
    $.each(data.tutorials, function( index, value ) 
    {
        var single_record = $('<div class="singlevideo item"></div>');
        
        var h4 = $('<h4></h4>');
        single_record.append(h4);
        
        var link = $('<a href="'+value.tutorial_path+'">'+value.title+'</a>');
        h4.append(link);
        
        var div = $('<div class="pic"></div>');
        single_record.append(div);
        
        var link = $('<a href="'+value.tutorial_path+'"></a>');
        div.append(link);
        
        var image = $('<img src="'+value.thumbnail_path+'" class="replacethumb">');
        link.append(image);
        /*
        var div = $('<div class="info"></div>');
        single_record.append(div);
        
        var link = $('<a class="avatar" href="'+value.tutorial_path+'"></a>');
        div.append(link);
        
        var image = $('<img src="'+value.thumbnail_path+'" class="userthumb">');
        link.append(image);
        
        var span = $('<span likes="1" class="replacethumb"></span>');
        div.append(image);
        
        var span = $('<span views="2" class="replacethumb"></span>');
        div.append(image);
        
        var span = $('<span admin="" class="replacethumb"></span>');
        div.append(image);
        */
        
        list.append(single_record);
    });

    
    $(target).append(list);
    
};

TemplateGenerator.prototype.displayRecentTutorials = function(data,target)
{
    var list = $('<div></div>');
    
    $.each(data.tutorials, function( index, value ) 
    {
        var single_record = $('<div class="singlevideo item"></div>');
        
        var h4 = $('<h4></h4>');
        single_record.append(h4);
        
        var link = $('<a href="'+value.tutorial_path+'">'+value.title+'</a>');
        h4.append(link);
        
        var div = $('<div class="pic"></div>');
        single_record.append(div);
        
        var link = $('<a href="'+value.tutorial_path+'"></a>');
        div.append(link);
        
        var image = $('<img src="'+value.thumbnail_path+'" class="replacethumb">');
        link.append(image);
        /*
        var div = $('<div class="info"></div>');
        single_record.append(div);
        
        var link = $('<a class="avatar" href="'+value.tutorial_path+'"></a>');
        div.append(link);
        
        var image = $('<img src="'+value.thumbnail_path+'" class="userthumb">');
        link.append(image);
        
        var span = $('<span likes="1" class="replacethumb"></span>');
        div.append(image);
        
        var span = $('<span views="2" class="replacethumb"></span>');
        div.append(image);
        
        var span = $('<span admin="" class="replacethumb"></span>');
        div.append(image);
        */
        
        list.append(single_record);
    });

    
    $(target).append(list);
    
};

TemplateGenerator.prototype.displayTopUsers= function(data,target)
{
    var list = $('<div></div>');
    
    var count = 1;
    
    $.each(data.users, function( index, value ) 
    {
        var single_record = $('<div class="item singletop">');
        
        var p = $('<p></p>');
        single_record.append(p);
        
        var span = $('<span class="number">'+count+'</span>');
        p.append(span);
        
        var link = $('<a href="#">'+value.username+'</a>');
        p.append(link);
        
        var link = $('<a href="#" class="award"></a>');
        p.append(link);
        
        var image = $('<img src="images/award.png" alt="award" alt="sketchadmin" title="sketchadmin">');
        link.append(image);
        
        list.append(single_record);
     
        count++;
    });

    
    $(target).append(list);
    
};

// setters

TemplateGenerator.prototype.setRecords = function(records)
{
    this.records = records;
};
