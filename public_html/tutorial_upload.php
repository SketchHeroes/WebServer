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
            //var_dump($body_params);
            //var_dump($_REQUEST);
            
            parse_str($_SERVER['QUERY_STRING'], $query_str_params);
            $url_params = explode("_", $query_str_params['user_data']);
            $credentials = array('user_skhr_id'=>$url_params[0],'user_token'=>$url_params[1]);
            /*
            $servg = "tmp/" ;
            //chmod($servg,0777);
            if (!is_dir($servg)){
                    mkdir($servg);
                    chmod($servg,0777);
            } 
             * 
             */
            //file_put_contents("tutorial.txt", $body_params["paintdata"]);
            
            $tmp_tutorial  = uniqid()."tutorial.txt"; 
            $h=fopen($tmp_tutorial,"wb");
            if($h){
                    fwrite($h,$body_params["paintdata"]);
                    fclose($h);
                    //$file=$tmp_tutorial;
                    chmod($tmp_tutorial,0777);

            }
            // save Thumb 
            $tmp_screenshot = uniqid()."screenshot.jpg";
            $fp = fopen($tmp_screenshot,'wb');
            if($fp){
                    fwrite($fp, base64_decode($body_params['thumbnail']));
                    fclose($fp);
                    chmod($tmp_screenshot,0777);					
            }else{

            }
            
            $post = array(
                "tutorial"=>"@".$tmp_tutorial,
                "screenshot"=>"@".$tmp_screenshot
            );
            
            $ch = curl_init();
            curl_setopt_array($ch, array(
                CURLOPT_POST => TRUE,
                CURLOPT_RETURNTRANSFER => TRUE,
                CURLOPT_HTTPHEADER => array(
                    'Accept: application/json',
                    'Content-Type: multipart/form-data',
                    'X-User-Token: '.$credentials['user_token'],
                    'X-Caller-SKHR-ID: '.$credentials['user_skhr_id'] 
                ),
                CURLOPT_POSTFIELDS => $post
            ));
            //curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_VERBOSE, 0);
            //curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            //curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
            curl_setopt($ch, CURLOPT_URL, 'http://serverkizidev-env.elasticbeanstalk.com/tutorial/upload');
            //curl_setopt($ch, CURLOPT_POST, true);
            // same as <input type="file" name="file_box">
            
            //curl_setopt($ch, CURLOPT_POSTFIELDS, $post); 
            $response = curl_exec($ch);
            $response_array = json_decode($response,TRUE);
            //var_dump($response_array);
            
            
            // adding tutorial to server db
            
            $post = array(
                "tutorial_category_id" => 8,
                "format_id" => 2,
                "title" => $body_params['name'],
                "description" => $body_params['description'],
                "tutorial_path" => $response_array['tutorial_file']['tutorial_path'],
                "screenshot_path" => $response_array['tutorial_file']['screenshot_path'],
                "thumbnail_path" => $response_array['tutorial_file']['thumbnail_path'],
                "featured" => FALSE
            );                                                               
            $data_string = json_encode($post);                                                                                   

            $ch = curl_init('http://serverkizidev-env.elasticbeanstalk.com/tutorial');                                                                      
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Accept: application/json',                                                                          
                'Content-Type: application/json',                                                                                
                'Content-Length: ' . strlen($data_string),
                'X-User-Token: '.$credentials['user_token'],
                'X-Caller-SKHR-ID: '.$credentials['user_skhr_id']                                                                       
            ));                                                                                                                   

            $response = curl_exec($ch);
            //echo($response);
            curl_close($ch);
        ?>
    </body>
</html>