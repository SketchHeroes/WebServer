/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function ajax_rest_call(domain, request, verb, custom_headers, request_data)
{
    if(typeof(custom_headers)==='undefined') custom_headers = {};
    if(typeof(request_data)==='undefined') request_data = {};
    
    $.ajax({
        cache: false,
        type: verb,
        url: domain+request,
        dataType: 'json',
        headers: custom_headers,
        crossDomain:true, 
        data: request_data,
        
        complete: function(data) 
        {
            //alert("loaded!");
            $('#data').html("Data:<br /> "+JSON.stringify(data));  
            return data;
        },
        /*
        success: function(data){
            //alert("success");
            $('#data').html(JSON.stringify(data));   
            return data;

        },
        error: function(data){
            //alert("response_data"); 
            $('#data').html(JSON.stringify(data));            
            return data;
         },
         */
    });
}


