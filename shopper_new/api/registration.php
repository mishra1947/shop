<?php
include_once 'config.php';
 
$insert = new DB_CONN();
$checkUser = new DB_CONN();

$data = json_decode(file_get_contents('php://input'));
$uname = $data->username;
$email = $data->email;
$pass = $data->Password;

$userValidation = $checkUser->checkUser($uname);
if ($userValidation && mysql_num_rows($userValidation) > 0){
    echo json_encode(array('data'=>'failure','msg'=>'Registration failed ! This username is already exist. Please use other username.'));
}else{
   $insert->insertUser($uname, $email, $pass);
   if($insert){
       echo json_encode(array('data'=>'success','msg'=>'Registered successfully.'));
   }else{
       echo json_encode(array('data'=>'failure','msg'=>'Registration failed please try again.'));
   }
}


