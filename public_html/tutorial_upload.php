<?php
            // getting body data
            $data= file_get_contents("php://input");
            parse_str($data, $body_params);
            //var_dump($body_params);
            //var_dump($_REQUEST);
            
            // getting query data = credential
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
            
            // ----- creating temp files-----
            
            // tutorial tmp file
            $tmp_tutorial  = uniqid().".txt"; 
            $h=fopen($tmp_tutorial,"wb");
            if($h){
                    fwrite($h,$body_params["paintdata"]);
                    fclose($h);
                    //$file=$tmp_tutorial;
                    chmod($tmp_tutorial,0777);

            }
            
            // screenshot tmp file
            $tmp_screenshot = uniqid().".jpg";
            $fp = fopen($tmp_screenshot,'wb');
            if($fp){
                    fwrite($fp, base64_decode($body_params['thumbnail']));
                    fclose($fp);
                    chmod($tmp_screenshot,0777);					
            }else{

            }
            
            //echo "realpath: ".realpath('test.txt').PHP_EOL;
            //echo "realpath: ".realpath($tmp_tutorial).PHP_EOL;
            
            // post parameters for files upload
            $post = array(
                "tutorial"=>"@".realpath($tmp_tutorial),
                "screenshot"=>"@".realpath($tmp_screenshot)
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
            var_dump($response_array);
            echo "response on files upload: ".$response.PHP_EOL;
            
            // Check if any error occurred
            if(!curl_errno($ch))
            {
                $info = curl_getinfo($ch);

                echo 'Took ' . $info['total_time'] . ' seconds to send a request to ' . $info['url'];
            }
            else 
            {
                echo 'Curl error: ' . curl_error($ch);
            }
            
            curl_close($ch);
            
            // deleting tmp files
            unlink($tmp_tutorial);
            unlink($tmp_screenshot);
            
            //========================================
            // getting category info by category title
            
            $qry_str = "?title=".urlencode($body_params['category']);
            //echo "qry_str: ".$qry_str.PHP_EOL;
            $ch = curl_init();

            // Set query data here with the URL
            curl_setopt($ch, CURLOPT_URL, 'http://serverkizidev-env.elasticbeanstalk.com/tutorial_category/title' . $qry_str); 

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_TIMEOUT, '3');
            curl_setopt($ch, CURLOPT_HTTPHEADER,array('X-App-Token: db9f444834f79dbe8042345f9d4e5d92e3f9dca4524e7c29c84da59549ad7d28b9be523d5db81fdbcbf207e4c0e0ce65'));
            $content_json = trim(curl_exec($ch));
            curl_close($ch);
            echo "getting category id response: ".$content_json.PHP_EOL;

            $content = json_decode($content_json, TRUE);
            //echo "content_json: ".$content_json.PHP_EOL;
            
            //==================================================================
            // adding tutorial to server db
            
            // post parameters
            $post = array(
                "tutorial_category_id" => $content["category"]["tutorial_category_id"],
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
            echo "registring tutorials in the db response:".$response;
            //echo($response);
            curl_close($ch);
             
?>