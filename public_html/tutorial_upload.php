<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    </head>
    <body>
            upload tutorial for web!
        <?php
            $data= file_get_contents("php://input");
            parse_str($data, $body_params);
            
            parse_str($_SERVER['QUERY_STRING'], $query_str_params);
            $url_params = explode("_", $query_str_params['user_data']);
            $credentials = array('user_skhr_id'=>$url_params[0],'user_token'=>$user_params[1]);
            
            //var_dump($all_params);
            /*
            //set POST variables
            $url = 'http://serverkizidev-env.elasticbeanstalk.com/tutorial_categories';
            $fields = array(
                                                            'lname' => urlencode($last_name),
                                                            'fname' => urlencode($first_name),
                                                            'title' => urlencode($title),
                                                            'company' => urlencode($institution),
                                                            'age' => urlencode($age),
                                                            'email' => urlencode($email),
                                                            'phone' => urlencode($phone)
                                            );

            //url-ify the data for the POST
            foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
            rtrim($fields_string, '&');

            //open connection
            $ch = curl_init();

            //set the url, number of POST vars, POST data
            curl_setopt($ch,CURLOPT_URL, $url);
            curl_setopt($ch,CURLOPT_POST, count($fields));
            curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

            //execute post
            $result = curl_exec($ch);

            //close connection
            curl_close($ch);
             * 
             */
            /*
            //The data to send to the API
            $postData = array(
                'kind' => 'blogger#post',
                'blog' => array('id' => $blogID),
                'title' => 'A new post',
                'content' => 'With <b>exciting</b> content...'
            );

            // Setup cURL
            $ch = curl_init('http://serverkizidev-env.elasticbeanstalk.com/tutorial/upload');
            curl_setopt_array($ch, array(
                CURLOPT_POST => TRUE,
                CURLOPT_RETURNTRANSFER => TRUE,
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: multipart/form-data',
                    'X-User-Token: '.$credentials['user_token'],
                    'X-Caller-SKHR-ID: '.$credentials['user_skhr_id'] 
                ),
                CURLOPT_POSTFIELDS => json_encode($postData)
            ));

            // Send the request
            $response = curl_exec($ch);

            // Check for errors
            if($response === FALSE){
                die(curl_error($ch));
            }

            // Decode the response
            $responseData = json_decode($response, TRUE);

            // Print the date from the response
            echo $response;
            */
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_VERBOSE, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
            curl_setopt($ch, CURLOPT_URL, _VIRUS_SCAN_URL);
            curl_setopt($ch, CURLOPT_POST, true);
            // same as <input type="file" name="file_box">
            $post = array(
                "file_box"=>"@/path/to/myfile.jpg",
            );
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post); 
            $response = curl_exec($ch);
        ?>
    </body>
</html>
