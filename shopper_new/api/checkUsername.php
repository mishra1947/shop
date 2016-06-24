<?php

/* during registration */
include 'config.php';
$check = new DB_CONN();
$data = json_decode(file_get_contents('php://input'));
$username = $data->username;
$result = $check->checkUser($username);
if ($result && mysql_num_rows($result) > 0) {
    echo json_encode(array('data' => 'failure', 'msg' => 'This username is already exist.'));
} else {
    echo json_encode(array('data' => 'success'));
}