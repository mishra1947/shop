<?php
/* during checkout */
include 'config.php';
$check = new DB_CONN();
$data = json_decode(file_get_contents('php://input'));
$username = $data->username;
$result = $check->checkAddress($username);
if ($result && mysql_num_rows($result) > 0) {
   echo json_encode(array('data'=>'exist'));
} else {
   echo json_encode(array('data'=>'not_exist'));
}
    
