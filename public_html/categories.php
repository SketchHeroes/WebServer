<?php
    header('HTTP/1.1 200 OK');
    
    $qry_str = "?is_premium=0";
    $ch = curl_init();

    // Set query data here with the URL
    curl_setopt($ch, CURLOPT_URL, 'http://serverkizidev-env.elasticbeanstalk.com/tutorial_categories' . $qry_str); 

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    //curl_setopt($ch, CURLOPT_TIMEOUT, '3');
    curl_setopt($ch,CURLOPT_HTTPHEADER,array('X-App-Token: db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65'));
    $content_json = trim(curl_exec($ch));
    curl_close($ch);
    //print $content_json;
    
    $content = json_decode($content_json);
    
    echo "<categories>".PHP_EOL;
    if(isset($content->categories))
    {
        foreach($content->categories as $category)
        {
            echo "<category name='".$category->title."'/>".PHP_EOL;
        }
    }
    else 
    {
        echo "<category name='Other'/>".PHP_EOL;
    }

    echo "</categories>".PHP_EOL;
?>