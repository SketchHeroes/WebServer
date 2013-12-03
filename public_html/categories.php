<categories>
<?php
    /*
    $r = new HttpRequest('http://serverkizidev-env.elasticbeanstalk.com/tutorial_categories', HttpRequest::METH_GET);
    //$r->setOptions(array('lastmodified' => filemtime('local.rss')));
    //$r->addQueryData(array('category' => 3));

    try {
        $r->send();
        if ($r->getResponseCode() == 200) {
            var_dump( $r->getResponseBody());
            //file_put_contents('local.rss', $r->getResponseBody());
        }
    } catch (HttpException $ex) {
        echo $ex;
    }
     * 
     */
    //$response = http_get("http://serverkizidev-env.elasticbeanstalk.com/tutorial_categories", array("timeout"=>1), $info);
    //print_r($info);
    //var_dump( $response );
    
    //$body = file_get_contents("http://serverkizidev-env.elasticbeanstalk.com/tutorial_categories");
    //echo $body;

    $qry_str = "?";
    $ch = curl_init();

    // Set query data here with the URL
    curl_setopt($ch, CURLOPT_URL, 'http://serverkizidev-env.elasticbeanstalk.com/tutorial_categories' . $qry_str); 

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, '3');
    curl_setopt($ch,CURLOPT_HTTPHEADER,array('X-App-Token: db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65'));
    $content_json = trim(curl_exec($ch));
    curl_close($ch);
    //print $content_json;
    
    $content = json_decode($content_json);
    
    foreach($content->categories as $category)
    {
        echo "<category name='".$category->title."'/>".PHP_EOL;
    }

    
?>       
</categories>