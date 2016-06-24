<?php
include_once 'config.php';
session_start();
$select = new DB_CONN();
$cart = new DB_CONN();
$data = json_decode(file_get_contents('php://input'));
$in_username = $data->username;
$in_password = $data->Password;
$response = $select->selectUser($in_username, $in_password);
if($response && mysql_num_rows($response)>0){
    $selectdata = mysql_fetch_assoc($response);
    $_SESSION['username']=$selectdata['username'];
    $cartProduct = $cart->selectCart($in_username);
    if($cartProduct && mysql_num_rows($cartProduct)>0){
        $numberOfProduct = mysql_num_rows($cartProduct);
    }else{
        $numberOfProduct = 0;
    }
    echo json_encode(array('signin'=>'success','username'=>$_SESSION['username'],'numberOfProduct'=>$numberOfProduct));
}else{
    echo json_encode(array('signin'=>'failure'));
}

