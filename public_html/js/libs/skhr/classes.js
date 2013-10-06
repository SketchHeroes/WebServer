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
    this.custom_headers     = {"X-App-Token":"db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65"};
    this.complete_handler   = function(data){};
    this.success_handler    = function(data){};
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
        
        complete: this.complete_handler,
        success: this.success_handler,
        error: this.error_handler,
    });
};

// request abstraction methods

RestCaller.prototype.getUsers = function()
{
    this.setResource("/users");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.setRequestParam("start","0");
    this.setRequestParam("how_many","50");
    
    return this.ajax();
};

RestCaller.prototype.getFeaturedTutorials = function()
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    
    this.setRequestParam("start","0");
    this.setRequestParam("how_many","50");
    this.setRequestParam("featured","1");
    
    return this.ajax();
};



RestCaller.prototype.getTopTutorials = function()
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.setRequestParam("start","0");
    this.setRequestParam("how_many","50");
    this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
    this.setRequestParam("tutorial_order_by_count",{"order_by_count_views":"DESC"});
    
    return this.ajax();
};

RestCaller.prototype.getRecentTutorials = function()
{
    this.setResource("/tutorials");
    this.setVerb("GET");
    //this.clearCustomHeaders();
    
    this.setCustomHeader("Content-Type","application/json"+"; charset=utf-8");
    this.setCustomHeader("Accept","application/json"); 
    //this.setCustomHeader("X-User-Token","d09ab3f92fd5433eafe7a6753d6ab038cf7eea7f4ad53d37d0f1f3e41308fe6b75310ce4cf7a1819495fc347e613ed3d");
    //this.setCustomHeader("X-Caller-SKHR-ID","3");  
    
    this.setRequestParam("start","0");
    this.setRequestParam("how_many","50");
    this.setRequestParam("tutorial_order_by",{"order_by_content_id":"DESC"});
    
    return this.ajax();
};

//-------------------- Template class ------------------------------------------

function TemplateGenerator()
{
    //this.records = {};
    //this.placeholder_id = null;
} 

TemplateGenerator.prototype.displayFeaturedTutorials = function(data)
{
    //alert(data.tutorials);
    
    $('#data').html("Tutorials:<br /><br />");  
    /*
    $.each(data.tutorials, function( index, value ) 
    {
        $('#data').append("<br />"+index+". "+value.title+"<br /><br />");
        //$('#data').append('<b>'+index+'.'+value+'</b>');
    });
    */
   
    var list = $('<ul></ul>');
    
    $.each(data.tutorials, function( index, value ) 
    {
        var single_record   = $('<li class="singlevideo item"></li>');
        
        var div = $('<div class="pic"></div>');
        single_record.append(div);
        
        var link = $('<a href="'+value.tutorial_path+'"></a>');
        div.append(link);
        
        var image = $('<img src="'+value.thumbnail_path+'" class="replacethumb">');
        link.append(image);
        
        var h4 = $('<h4></h4>');
        single_record.append(h4);
        
        var link = $('<a href="'+value.tutorial_path+'">'+value.title+'</a>');
        h4.append(link);
        
        list.append(single_record);
    });

    
    $("#featured_tutorials").append(list);
    
};

// setters

TemplateGenerator.prototype.setRecords = function(records)
{
    this.records = records;
};
/*
'               <li class='singlevideo item'> 
                    <div class="pic">
                            <a href='http://www.sketchheroes.com/account/otakulover0228/how_to_draw/rapunzel-'> 
                                    <img src="http://www.sketchheroes.com/media/tutorials/by_date/2013.02.11/nr76xnd5f7.jpg" class='replacethumb' >
                            </a>
                    </div>	
                    <h4>
                        <a href='http://www.sketchheroes.com/account/otakulover0228/how_to_draw/rapunzel-'>rapunzel-
                        </a>
                    </h4>
                </li>'
                */